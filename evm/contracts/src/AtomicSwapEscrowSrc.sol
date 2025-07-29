// SPDX-License-Identifier: MIT

pragma solidity 0.8.23;

import { IERC20 } from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "solidity-utils/contracts/libraries/SafeERC20.sol";
import { AddressLib, Address } from "solidity-utils/contracts/libraries/AddressLib.sol";

import { Timelocks, TimelocksLib } from "./libraries/TimelocksLib.sol";
import { ImmutablesLib } from "./libraries/ImmutablesLib.sol";

import { IEscrowSrc } from "./interfaces/IEscrowSrc.sol";
import { BaseEscrow } from "./BaseEscrow.sol";
import { Escrow } from "./Escrow.sol";

/**
 * @title Atomic Swap Source Escrow for Ethereum-Polkadot
 * @notice Modified from 1inch EscrowSrc for true atomic swaps
 * @dev Removes LOP-specific functionality and adds Polkadot integration
 */
contract AtomicSwapEscrowSrc is Escrow, IEscrowSrc {
    using AddressLib for Address;
    using ImmutablesLib for Immutables;
    using SafeERC20 for IERC20;
    using TimelocksLib for Timelocks;

    // Additional events for atomic swap monitoring
    event PolkadotSwapInitiated(
        bytes32 indexed hashlock,
        bytes32 polkadotRecipient,
        uint256 polkadotTimelock
    );
    
    event AtomicSwapCompleted(
        bytes32 indexed hashlock,
        bytes32 preimage,
        address recipient
    );

    constructor(uint32 rescueDelay, IERC20 accessToken) BaseEscrow(rescueDelay, accessToken) {}

    /**
     * @notice Withdraw funds by revealing the secret (atomic swap completion)
     * @dev Modified to work without timelock restrictions for atomic swaps
     * @param secret The secret that hashes to hashlock
     * @param immutables The escrow immutables
     */
    function withdraw(bytes32 secret, Immutables calldata immutables)
        external
        override
        onlyTaker(immutables)
        onlyValidImmutables(immutables)
        onlyValidSecret(secret, immutables)
    {
        // For atomic swaps, allow withdrawal as soon as secret is revealed
        // No timelock restrictions since this is the "claim" phase
        IERC20(immutables.token.get()).safeTransfer(msg.sender, immutables.amount);
        
        // Transfer any safety deposit to the taker
        if (immutables.safetyDeposit > 0) {
            _ethTransfer(msg.sender, immutables.safetyDeposit);
        }
        
        emit EscrowWithdrawal(secret);
        emit AtomicSwapCompleted(immutables.hashlock, secret, msg.sender);
    }

    /**
     * @notice Withdraw funds to a specific address
     * @param secret The secret that hashes to hashlock
     * @param target The address to send funds to
     * @param immutables The escrow immutables
     */
    function withdrawTo(bytes32 secret, address target, Immutables calldata immutables)
        external
        override
        onlyTaker(immutables)
        onlyValidImmutables(immutables)
        onlyValidSecret(secret, immutables)
    {
        require(target != address(0), "Invalid target address");
        
        IERC20(immutables.token.get()).safeTransfer(target, immutables.amount);
        
        // Safety deposit goes to caller (taker)
        if (immutables.safetyDeposit > 0) {
            _ethTransfer(msg.sender, immutables.safetyDeposit);
        }
        
        emit EscrowWithdrawal(secret);
        emit AtomicSwapCompleted(immutables.hashlock, secret, target);
    }

    /**
     * @notice Public withdraw (disabled for atomic swaps)
     * @dev Atomic swaps don't use access tokens
     */
    function publicWithdraw(bytes32, Immutables calldata) external pure override {
        revert("Public withdraw disabled for atomic swaps");
    }

    /**
     * @notice Cancel the escrow and return funds to maker
     * @dev Only allowed after timelock expires
     * @param immutables The escrow immutables
     */
    function cancel(Immutables calldata immutables)
        external
        override
        onlyValidImmutables(immutables)
        onlyAfter(immutables.timelocks.get(TimelocksLib.Stage.SrcCancellation))
    {
        // Allow both maker and taker to cancel (for atomic swap flexibility)
        require(
            msg.sender == immutables.maker.get() || msg.sender == immutables.taker.get(),
            "Only maker or taker can cancel"
        );
        
        // Return funds to maker
        IERC20(immutables.token.get()).safeTransfer(immutables.maker.get(), immutables.amount);
        
        // Return safety deposit to caller
        if (immutables.safetyDeposit > 0) {
            _ethTransfer(msg.sender, immutables.safetyDeposit);
        }
        
        emit EscrowCancelled();
    }

    /**
     * @notice Public cancel (disabled for atomic swaps)
     */
    function publicCancel(Immutables calldata) external pure override {
        revert("Public cancel disabled for atomic swaps");
    }
    
    /**
     * @notice Initialize Polkadot swap parameters
     * @dev Called during escrow creation to set Polkadot-specific data
     * @param polkadotRecipient The recipient address on Polkadot
     * @param polkadotTimelock The timelock on Polkadot side
     * @param immutables The escrow immutables
     */
    function initializePolkadotSwap(
        bytes32 polkadotRecipient,
        uint256 polkadotTimelock,
        Immutables calldata immutables
    ) external onlyValidImmutables(immutables) {
        require(msg.sender == FACTORY, "Only factory can initialize");
        require(polkadotRecipient != bytes32(0), "Invalid Polkadot recipient");
        
        emit PolkadotSwapInitiated(
            immutables.hashlock,
            polkadotRecipient,
            polkadotTimelock
        );
    }
    
    /**
     * @notice Check if the escrow can be withdrawn with given secret
     * @param secret The secret to test
     * @param immutables The escrow immutables
     * @return canWithdraw Whether withdrawal is possible
     */
    function canWithdrawWith(bytes32 secret, Immutables calldata immutables) 
        external 
        view 
        returns (bool canWithdraw) 
    {
        return _keccakBytes32(secret) == immutables.hashlock;
    }
    
    /**
     * @notice Check if the escrow can be cancelled
     * @param immutables The escrow immutables
     * @return canCancel Whether cancellation is possible
     */
    function canCancelEscrow(Immutables calldata immutables) 
        external 
        view 
        returns (bool canCancel) 
    {
        return block.timestamp >= immutables.timelocks.get(TimelocksLib.Stage.SrcCancellation);
    }
    
    /**
     * @notice Get escrow state information
     * @param immutables The escrow immutables
     * @return maker The maker address
     * @return taker The taker address  
     * @return token The token address
     * @return amount The escrow amount
     * @return hashlock The hashlock
     * @return timelock The cancellation timelock
     */
    function getEscrowInfo(Immutables calldata immutables) 
        external 
        view 
        onlyValidImmutables(immutables)
        returns (
            address maker,
            address taker,
            address token,
            uint256 amount,
            bytes32 hashlock,
            uint256 timelock
        ) 
    {
        maker = immutables.maker.get();
        taker = immutables.taker.get();
        token = immutables.token.get();
        amount = immutables.amount;
        hashlock = immutables.hashlock;
        timelock = immutables.timelocks.get(TimelocksLib.Stage.SrcCancellation);
    }
    
    /**
     * @dev Override to use keccak256 instead of the internal _keccakBytes32
     * @param secret The secret to hash
     * @return The hash of the secret
     */
    function _keccakBytes32(bytes32 secret) internal pure override returns (bytes32) {
        return keccak256(abi.encodePacked(secret));
    }
    
    /**
     * @notice Receive ETH for safety deposits or ETH swaps
     */
    receive() external payable {
        // Allow receiving ETH for escrow funding
    }
}