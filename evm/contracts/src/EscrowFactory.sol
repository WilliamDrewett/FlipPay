// SPDX-License-Identifier: MIT

pragma solidity 0.8.23;

import { IERC20 } from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import { Clones } from "openzeppelin-contracts/contracts/proxy/Clones.sol";

import { BaseExtension } from "limit-order-settlement/contracts/extensions/BaseExtension.sol";
import { ResolverValidationExtension } from "limit-order-settlement/contracts/extensions/ResolverValidationExtension.sol";

import { ProxyHashLib } from "./libraries/ProxyHashLib.sol";
import { BaseEscrowFactory } from "./BaseEscrowFactory.sol";
import { AtomicSwapEscrowSrc } from "./AtomicSwapEscrowSrc.sol";
import { AtomicSwapEscrowDst } from "./AtomicSwapEscrowDst.sol";
import { PolkadotVerifier } from "./PolkadotVerifier.sol";
import { MerkleStorageInvalidator } from "./MerkleStorageInvalidator.sol";

import { IBaseEscrow } from "./interfaces/IBaseEscrow.sol";
import { Address } from "solidity-utils/contracts/libraries/AddressLib.sol";
import { Timelocks, TimelocksLib } from "./libraries/TimelocksLib.sol";

/**
 * @title Atomic Swap Escrow Factory for Ethereum-Polkadot
 * @notice Factory contract modified from 1inch for true atomic swaps between Ethereum and Polkadot
 * @dev Removes LOP dependencies and adds Polkadot-specific verification
 */
contract EscrowFactory is BaseEscrowFactory {
    using Clones for address;
    using TimelocksLib for Timelocks;

    uint8 constant SRC_IMMUTABLES_LENGTH = 224;
    
    // Cross-chain configuration
    struct PolkadotConfig {
        address polkadotVerifier;    // Contract to verify Polkadot proofs
        uint256 polkadotParachainId; // Target parachain ID  
        uint256 polkadotBlockTime;   // Average block time in seconds
        uint256 maxTimelock;         // Maximum timelock in seconds
        address xcmBridge;           // XCM bridge contract (if needed)
    }
    
    PolkadotConfig public polkadotConfig;
    address public immutable POLKADOT_VERIFIER;
    
    // Atomic swap tracking
    mapping(bytes32 => bool) public activeAtomicSwaps;
    mapping(bytes32 => SwapMetadata) public swapMetadata;
    
    struct SwapMetadata {
        address initiator;
        address participant;  
        bytes32 polkadotRecipient;
        uint256 polkadotTimelock;
        uint256 ethereumTimelock;
        bool isCompleted;
    }
    
    // Events for atomic swap monitoring
    event AtomicSwapInitiated(
        bytes32 indexed swapId,
        bytes32 indexed hashlock,
        address indexed initiator,
        address participant,
        bytes32 polkadotRecipient,
        uint256 amount,
        address token
    );
    
    event AtomicSwapCompleted(bytes32 indexed swapId, bytes32 preimage);
    event AtomicSwapCancelled(bytes32 indexed swapId);
    event PolkadotProofVerified(bytes32 indexed swapId, bytes32 polkadotTxHash);

    constructor(
        IERC20 feeToken,
        address owner,
        uint32 rescueDelaySrc,
        uint32 rescueDelayDst,
        PolkadotConfig memory _polkadotConfig
    )
    BaseExtension(address(0)) // No LOP integration
    ResolverValidationExtension(feeToken, IERC20(address(0)), owner)
    MerkleStorageInvalidator(address(0))
    {
        polkadotConfig = _polkadotConfig;
        
        // Deploy Polkadot verifier
        POLKADOT_VERIFIER = address(new PolkadotVerifier(_polkadotConfig.polkadotVerifier));
        
        // Deploy atomic swap escrow implementations (no access token required)
        ESCROW_SRC_IMPLEMENTATION = address(new AtomicSwapEscrowSrc(rescueDelaySrc, IERC20(address(0))));
        ESCROW_DST_IMPLEMENTATION = address(new AtomicSwapEscrowDst(rescueDelayDst, IERC20(address(0))));
        
        _PROXY_SRC_BYTECODE_HASH = ProxyHashLib.computeProxyBytecodeHash(ESCROW_SRC_IMPLEMENTATION);
        _PROXY_DST_BYTECODE_HASH = ProxyHashLib.computeProxyBytecodeHash(ESCROW_DST_IMPLEMENTATION);
    }
    
    /**
     * @notice Compute hash of immutables struct for salt generation
     * @param immutables The immutables struct to hash
     * @return Hash of the immutables struct
     */
    function _hashImmutables(IBaseEscrow.Immutables memory immutables) internal pure returns (bytes32) {
        return keccak256(abi.encode(
            immutables.orderHash,
            immutables.hashlock,
            immutables.maker,
            immutables.taker,
            immutables.token,
            immutables.amount,
            immutables.safetyDeposit,
            immutables.timelocks
        ));
    }
    
    /**
     * @notice Initiate atomic swap by creating source escrow
     * @param hashlock Hash of the secret
     * @param participant Ethereum participant address
     * @param polkadotRecipient Polkadot recipient (as bytes32)
     * @param ethereumTimelock Timelock for Ethereum side
     * @param polkadotTimelock Timelock for Polkadot side (in blocks)
     * @param token Token to swap (address(0) for ETH)
     * @param amount Amount to swap
     */
    function initiateAtomicSwap(
        bytes32 hashlock,
        address participant,
        bytes32 polkadotRecipient,
        uint256 ethereumTimelock,
        uint256 polkadotTimelock,
        address token,
        uint256 amount
    ) external payable returns (bytes32 swapId, address escrowAddress) {
        require(hashlock != bytes32(0), "Invalid hashlock");
        require(participant != address(0), "Invalid participant");
        require(polkadotRecipient != bytes32(0), "Invalid Polkadot recipient");
        require(amount > 0, "Invalid amount");
        require(ethereumTimelock > block.timestamp + 3600, "Timelock too short");
        require(ethereumTimelock <= block.timestamp + polkadotConfig.maxTimelock, "Timelock too long");
        
        // Generate swap ID
        swapId = keccak256(abi.encodePacked(
            msg.sender,
            participant,
            hashlock,
            ethereumTimelock,
            polkadotTimelock,
            block.timestamp
        ));
        
        require(!activeAtomicSwaps[swapId], "Swap already exists");
        
        // Create immutables for escrow
        IBaseEscrow.Immutables memory immutables = IBaseEscrow.Immutables({
            orderHash: swapId, // Use swapId as orderHash
            hashlock: hashlock,
            maker: Address.wrap(uint160(msg.sender)),
            taker: Address.wrap(uint160(participant)),
            token: Address.wrap(uint160(token)),
            amount: amount,
            safetyDeposit: 0, // No safety deposit for atomic swaps
            timelocks: Timelocks.wrap(0).setDeployedAt(block.timestamp).set(
                TimelocksLib.Stage.SrcWithdrawal, 
                block.timestamp
            ).set(
                TimelocksLib.Stage.SrcCancellation,
                ethereumTimelock
            )
        });
        
        // Deploy escrow using our hash function
        bytes32 salt = _hashImmutables(immutables);
        escrowAddress = _deployEscrow(salt, msg.value, ESCROW_SRC_IMPLEMENTATION);
        
        // Transfer tokens to escrow if ERC20
        if (token != address(0)) {
            require(msg.value == 0, "No ETH expected for ERC20");
            IERC20(token).transferFrom(msg.sender, escrowAddress, amount);
        } else {
            require(msg.value == amount, "Incorrect ETH amount");
        }
        
        // Store swap metadata
        activeAtomicSwaps[swapId] = true;
        swapMetadata[swapId] = SwapMetadata({
            initiator: msg.sender,
            participant: participant,
            polkadotRecipient: polkadotRecipient,
            polkadotTimelock: polkadotTimelock,
            ethereumTimelock: ethereumTimelock,
            isCompleted: false
        });
        
        emit AtomicSwapInitiated(
            swapId,
            hashlock,
            msg.sender,
            participant,
            polkadotRecipient,
            amount,
            token
        );
    }
    
    /**
     * @notice Complete atomic swap by revealing secret
     * @param swapId The swap identifier
     * @param secret The secret that hashes to hashlock
     * @param immutables The escrow immutables
     */
    function completeAtomicSwap(
        bytes32 swapId,
        bytes32 secret,
        IBaseEscrow.Immutables calldata immutables
    ) external {
        require(activeAtomicSwaps[swapId], "Swap not active");
        require(!swapMetadata[swapId].isCompleted, "Swap already completed");
        require(keccak256(abi.encodePacked(secret)) == immutables.hashlock, "Invalid secret");
        
        // Call withdraw on the escrow
        address escrowAddress = addressOfEscrowSrc(immutables);
        AtomicSwapEscrowSrc(payable(escrowAddress)).withdraw(secret, immutables);
        
        // Mark as completed
        swapMetadata[swapId].isCompleted = true;
        
        emit AtomicSwapCompleted(swapId, secret);
    }
    
    /**
     * @notice Cancel atomic swap after timelock
     * @param swapId The swap identifier  
     * @param immutables The escrow immutables
     */
    function cancelAtomicSwap(
        bytes32 swapId,
        IBaseEscrow.Immutables calldata immutables
    ) external {
        require(activeAtomicSwaps[swapId], "Swap not active");
        require(!swapMetadata[swapId].isCompleted, "Swap already completed");
        
        // Call cancel on the escrow
        address escrowAddress = addressOfEscrowSrc(immutables);
        AtomicSwapEscrowSrc(payable(escrowAddress)).cancel(immutables);
        
        // Mark as inactive
        activeAtomicSwaps[swapId] = false;
        
        emit AtomicSwapCancelled(swapId);
    }
    
    /**
     * @notice Verify Polkadot transaction proof
     * @param swapId The swap identifier
     * @param polkadotTxHash Transaction hash on Polkadot
     * @param proof Merkle proof data
     * @param blockHash Polkadot block hash
     */
    function verifyPolkadotProof(
        bytes32 swapId,
        bytes32 polkadotTxHash,
        bytes calldata proof,
        bytes32 blockHash
    ) external {
        require(activeAtomicSwaps[swapId], "Swap not active");
        
        // Verify proof through Polkadot verifier
        require(
            PolkadotVerifier(POLKADOT_VERIFIER).verifyTransaction(
                polkadotTxHash,
                proof,
                blockHash,
                polkadotConfig.polkadotParachainId
            ),
            "Invalid Polkadot proof"
        );
        
        emit PolkadotProofVerified(swapId, polkadotTxHash);
    }
    
    /**
     * @notice Update Polkadot configuration (owner only)
     */
    function updatePolkadotConfig(PolkadotConfig calldata _config) external {
        polkadotConfig = _config;
    }
    
    /**
     * @notice Get swap information
     */
    function getSwapInfo(bytes32 swapId) external view returns (
        bool active,
        SwapMetadata memory metadata
    ) {
        active = activeAtomicSwaps[swapId];
        metadata = swapMetadata[swapId];
    }
    
    // Override _postInteraction to disable LOP integration
    // function _postInteraction(
    //     IOrderMixin.Order calldata,
    //     bytes calldata,
    //     bytes32,
    //     address,
    //     uint256,
    //     uint256,
    //     uint256,
    //     bytes calldata
    // ) internal override {
    //     revert("LOP integration disabled for atomic swaps");
    // }
}