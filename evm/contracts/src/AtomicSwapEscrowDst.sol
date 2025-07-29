// SPDX-License-Identifier: MIT

pragma solidity 0.8.23;

import { IERC20 } from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "solidity-utils/contracts/libraries/SafeERC20.sol";
import { AddressLib, Address } from "solidity-utils/contracts/libraries/AddressLib.sol";

import { Timelocks, TimelocksLib } from "./libraries/TimelocksLib.sol";

import { IEscrowDst } from "./interfaces/IEscrowDst.sol";
import { BaseEscrow } from "./BaseEscrow.sol";
import { Escrow } from "./Escrow.sol";

/**
 * @title Atomic Swap Destination Escrow for Ethereum-Polkadot
 * @notice Modified from 1inch EscrowDst for atomic swaps as destination chain
 * @dev Handles receiving funds from Polkadot and releasing them with secret reveal
 */
contract AtomicSwapEscrowDst is Escrow, IEscrowDst {
    using SafeERC20 for IERC20;
    using AddressLib for Address;
    using TimelocksLib for Timelocks;

    // Events for cross-chain coordination
    event EthereumSwapInitiated(
        bytes32 indexed hashlock,
        address indexed maker,
        address indexed taker,
        uint256 amount,
        address token
    );
    
    event CrossChainSwapCompleted(
        bytes32 indexed hashlock,
        bytes32 preimage,
        address recipient
    );

    constructor(uint32 rescueDelay, IERC20 accessToken) BaseEscrow(rescueDelay, accessToken) {}

    /**
     * @notice Withdraw funds by revealing secret (completing the atomic swap)
     * @dev Modified for atomic swap - maker gets funds when secret is revealed
     * @param secret The secret that hashes to hashlock
     * @param immutables The escrow immutables
     */
    function withdraw(bytes32 secret, Immutables calldata immutables)
        external
        override
        onlyValidImmutables(immutables)
        onlyValidSecret(secret, immutables)
        onlyBefore(immutables.timelocks.get(TimelocksLib.Stage.DstCancellation))
    {
        // In atomic swap, the maker (from Polkadot) gets the funds
        // This is the counterpart to the Polkadot HTLC
        _withdrawTo(immutables.maker.get(), secret, immutables);
    }

    /**
     * @notice Public withdraw (disabled for atomic swaps)
     */
    function publicWithdraw(bytes32, Immutables calldata) external pure override {
        revert("Public withdraw disabled for atomic swaps");
    }

    /**
     * @notice Cancel escrow and return funds to taker
     * @dev Only after timelock expires
     * @param immutables The escrow immutables
     */
    function cancel(Immutables calldata immutables)
        external
        override
        onlyValidImmutables(immutables)
        onlyAfter(immutables.timelocks.get(TimelocksLib.Stage.DstCancellation))
    {
        // Allow both maker and taker to cancel
        require(
            msg.sender == immutables.maker.get() || msg.sender == immutables.taker.get(),
            "Only maker or taker can cancel"
        );
        
        // Return funds to taker (who funded this escrow)
        _uniTransfer(immutables.token.get(), immutables.taker.get(), immutables.amount);
        
        // Return safety deposit to caller
        if (immutables.safetyDeposit > 0) {
            _ethTransfer(msg.sender, immutables.safetyDeposit);
        }
        
        emit EscrowCancelled();
    }
    
    /**
     * @notice Initialize the destination escrow with cross-chain parameters
     * @dev Called when creating the escrow for cross-chain coordination
     * @param immutables The escrow immutables
     */
    function initializeDestinationEscrow(Immutables calldata immutables)
        external
        onlyValidImmutables(immutables)
    {
        require(msg.sender == FACTORY, "Only factory can initialize");
        
        emit EthereumSwapInitiated(
            immutables.hashlock,
            immutables.maker.get(),
            immutables.taker.get(),
            immutables.amount,
            immutables.token.get()
        );
    }
    
    /**
     * @notice Check if escrow can be withdrawn with given secret
     * @param secret The secret to test
     * @param immutables The escrow immutables
     * @return canWithdraw Whether withdrawal is possible
     */
    function canPerformWithdrawal(bytes32 secret, Immutables calldata immutables)
        external
        view
        returns (bool canWithdraw)
    {
        return _keccakBytes32(secret) == immutables.hashlock &&
               block.timestamp < immutables.timelocks.get(TimelocksLib.Stage.DstCancellation);
    }
    
    /**
     * @notice Check if escrow can be cancelled
     * @param immutables The escrow immutables  
     * @return canCancel Whether cancellation is possible
     */
    function canPerformCancellation(Immutables calldata immutables)
        external
        view
        returns (bool canCancel)
    {
        return block.timestamp >= immutables.timelocks.get(TimelocksLib.Stage.DstCancellation);
    }
    
    /**
     * @notice Get remaining time until cancellation is possible
     * @param immutables The escrow immutables
     * @return timeRemaining Seconds until cancellation (0 if can cancel now)
     */
    function getTimeUntilCancellation(Immutables calldata immutables)
        external
        view
        returns (uint256 timeRemaining)
    {
        uint256 cancellationTime = immutables.timelocks.get(TimelocksLib.Stage.DstCancellation);
        if (block.timestamp >= cancellationTime) {
            return 0;
        }
        return cancellationTime - block.timestamp;
    }
    
    /**
     * @notice Get escrow status and information
     * @param immutables The escrow immutables
     * @return info Struct containing escrow details
     */
    function getEscrowStatus(Immutables calldata immutables)
        external
        view
        onlyValidImmutables(immutables)
        returns (EscrowInfo memory info)
    {
        info.maker = immutables.maker.get();
        info.taker = immutables.taker.get();
        info.token = immutables.token.get();
        info.amount = immutables.amount;
        info.hashlock = immutables.hashlock;
        info.cancellationTime = immutables.timelocks.get(TimelocksLib.Stage.DstCancellation);
        info.canCancel = block.timestamp >= info.cancellationTime;
        info.balance = _getBalance(immutables.token.get());
    }
    
    struct EscrowInfo {
        address maker;
        address taker;
        address token;
        uint256 amount;
        bytes32 hashlock;
        uint256 cancellationTime;
        bool canCancel;
        uint256 balance;
    }

    /**
     * @dev Internal function to handle withdrawal to specific address
     * @param recipient The address to receive funds
     * @param secret The revealed secret
     * @param immutables The escrow immutables
     */
    function _withdrawTo(address recipient, bytes32 secret, Immutables calldata immutables) internal {
        // Transfer tokens/ETH to recipient (the maker from Polkadot)
        _uniTransfer(immutables.token.get(), recipient, immutables.amount);
        
        // Send safety deposit to the caller (who revealed the secret)
        if (immutables.safetyDeposit > 0) {
            _ethTransfer(msg.sender, immutables.safetyDeposit);
        }
        
        emit EscrowWithdrawal(secret);
        emit CrossChainSwapCompleted(immutables.hashlock, secret, recipient);
    }
    
    /**
     * @dev Get current balance of the escrow
     * @param token Token address (address(0) for ETH)
     * @return balance Current balance
     */
    function _getBalance(address token) internal view returns (uint256 balance) {
        if (token == address(0)) {
            balance = address(this).balance;
        } else {
            balance = IERC20(token).balanceOf(address(this));
        }
    }
    
    /**
     * @dev Override to use keccak256 for secret verification
     * @param secret The secret to hash
     * @return The hash of the secret
     */
    function _keccakBytes32(bytes32 secret) internal pure override returns (bytes32) {
        return keccak256(abi.encodePacked(secret));
    }
    
    /**
     * @notice Receive ETH for escrow funding
     */
    receive() external payable {
        // Allow receiving ETH for escrow operations
    }
}