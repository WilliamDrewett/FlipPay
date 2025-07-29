// SPDX-License-Identifier: MIT

pragma solidity 0.8.23;

import { Ownable } from "openzeppelin-contracts/contracts/access/Ownable.sol";
import { MerkleProof } from "openzeppelin-contracts/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title PolkadotVerifier
 * @notice Verifies transaction inclusion proofs from Polkadot for atomic swaps
 * @dev Handles verification of HTLC transactions on Polkadot parachains
 */
contract PolkadotVerifier is Ownable {
    using MerkleProof for bytes32[];

    struct PolkadotBlockHeader {
        bytes32 parentHash;
        bytes32 stateRoot;
        bytes32 extrinsicsRoot;
        uint256 blockNumber;
        bytes32 blockHash;
        bool finalized;
        uint256 timestamp;
        bytes32 parachainBlockHash; // For parachain blocks
    }

    struct TransactionProof {
        bytes32 txHash;
        bytes32[] merkleProof;
        uint256 txIndex;
        bytes32 blockHash;
        uint256 blockNumber;
        bytes extrinsicData; // Raw extrinsic data for verification
    }

    struct HTLCTransaction {
        bytes32 hashlock;
        bytes32 preimage;
        address ethereumRecipient;
        uint256 amount;
        bytes32 polkadotSender;
        bool isWithdrawal; // true for withdrawal, false for creation
    }

    // Trusted relayer/oracle addresses
    mapping(address => bool) public trustedRelayers;
    
    // Finalized block headers from Polkadot
    mapping(bytes32 => PolkadotBlockHeader) public finalizedHeaders;
    mapping(uint256 => bytes32) public blockNumberToHash;
    
    // Verified HTLC transactions
    mapping(bytes32 => HTLCTransaction) public verifiedHTLCs;
    mapping(bytes32 => bool) public processedTransactions;

    // Configuration
    uint256 public constant FINALITY_DELAY = 1; // Polkadot has fast finality
    uint256 public maxBlockAge = 14400; // 24 hours (assuming 6s block time)
    uint256 public targetParachainId;

    // Events
    event RelayerUpdated(address indexed relayer, bool trusted);
    event BlockHeaderSubmitted(
        bytes32 indexed blockHash,
        uint256 blockNumber,
        bytes32 stateRoot,
        uint256 timestamp
    );
    event HTLCTransactionVerified(
        bytes32 indexed txHash,
        bytes32 indexed hashlock,
        bytes32 preimage,
        bool isWithdrawal
    );
    event PolkadotSwapCreated(
        bytes32 indexed hashlock,
        bytes32 polkadotSender,
        address ethereumRecipient,
        uint256 amount
    );
    event PolkadotSwapCompleted(
        bytes32 indexed hashlock,
        bytes32 preimage,
        bytes32 polkadotRecipient
    );

    modifier onlyTrustedRelayer() {
        require(trustedRelayers[msg.sender], "Not a trusted relayer");
        _;
    }

    constructor(address initialRelayer) Ownable(msg.sender) {
        require(initialRelayer != address(0), "Invalid relayer");
        trustedRelayers[initialRelayer] = true;
        targetParachainId = 1000; // Default to Asset Hub
    }

    /**
     * @notice Add or remove trusted relayer
     * @param relayer The relayer address
     * @param trusted Whether the relayer is trusted
     */
    function setTrustedRelayer(address relayer, bool trusted) external onlyOwner {
        require(relayer != address(0), "Invalid relayer");
        trustedRelayers[relayer] = trusted;
        emit RelayerUpdated(relayer, trusted);
    }

    /**
     * @notice Submit finalized Polkadot block header
     * @param header The block header from Polkadot
     * @dev Only trusted relayers can submit headers
     */
    function submitBlockHeader(PolkadotBlockHeader calldata header) 
        external 
        onlyTrustedRelayer 
    {
        require(header.blockHash != bytes32(0), "Invalid block hash");
        require(header.finalized, "Block not finalized");
        require(header.blockNumber > 0, "Invalid block number");
        
        // Prevent duplicate submissions
        require(
            finalizedHeaders[header.blockHash].blockHash == bytes32(0),
            "Header already exists"
        );

        // Verify block age
        require(
            block.timestamp <= header.timestamp + maxBlockAge,
            "Block too old"
        );

        // Store header
        finalizedHeaders[header.blockHash] = header;
        blockNumberToHash[header.blockNumber] = header.blockHash;

        emit BlockHeaderSubmitted(
            header.blockHash,
            header.blockNumber,
            header.stateRoot,
            header.timestamp
        );
    }

    function verifyTransaction(
        bytes32 txHash,
        bytes calldata proofData,
        bytes32 blockHash,
        uint256 parachainId
    ) public view returns (bool success) {
        // Verify parachain ID matches
        require(parachainId == targetParachainId, "Wrong parachain");
        
        // Check block header exists and is finalized
        PolkadotBlockHeader memory header = finalizedHeaders[blockHash];
        require(header.blockHash != bytes32(0), "Block header not found");
        require(header.finalized, "Block not finalized");

        // Verify block age
        require(
            block.timestamp <= header.timestamp + maxBlockAge,
            "Block too old"
        );

        // Parse proof data
        TransactionProof memory proof = _parseTransactionProof(proofData);
        require(proof.txHash == txHash, "Transaction hash mismatch");
        require(proof.blockHash == blockHash, "Block hash mismatch");

        // Verify merkle proof of transaction inclusion
        bytes32 leaf = keccak256(abi.encodePacked(proof.txHash, proof.txIndex));
        success = MerkleProof.verify(
            proof.merkleProof,
            header.extrinsicsRoot,
            leaf
        );

        return success;
    }

    /**
     * @notice Submit and verify HTLC transaction from Polkadot
     * @param proof Transaction proof data
     * @param htlcData The HTLC transaction details
     */
    function submitHTLCTransaction(
        bytes calldata proof,
        HTLCTransaction calldata htlcData
    ) external onlyTrustedRelayer {
        // Parse proof
        TransactionProof memory txProof = _parseTransactionProof(proof);
        
        // Prevent replay attacks
        require(!processedTransactions[txProof.txHash], "Transaction already processed");
        
        // Verify transaction inclusion
        require(
            verifyTransaction(
                txProof.txHash,
                proof,
                txProof.blockHash,
                targetParachainId
            ),
            "Invalid transaction proof"
        );

        // Verify HTLC data matches transaction
        require(_verifyHTLCData(txProof.extrinsicData, htlcData), "Invalid HTLC data");

        // Store verified transaction
        verifiedHTLCs[htlcData.hashlock] = htlcData;
        processedTransactions[txProof.txHash] = true;

        emit HTLCTransactionVerified(
            txProof.txHash,
            htlcData.hashlock,
            htlcData.preimage,
            htlcData.isWithdrawal
        );

        // Emit specific events based on transaction type
        if (htlcData.isWithdrawal) {
            emit PolkadotSwapCompleted(
                htlcData.hashlock,
                htlcData.preimage,
                htlcData.polkadotSender
            );
        } else {
            emit PolkadotSwapCreated(
                htlcData.hashlock,
                htlcData.polkadotSender,
                htlcData.ethereumRecipient,
                htlcData.amount
            );
        }
    }

    /**
     * @notice Get verified HTLC transaction data
     * @param hashlock The HTLC hashlock
     * @return htlc The HTLC transaction data
     */
    function getVerifiedHTLC(bytes32 hashlock) 
        external 
        view 
        returns (HTLCTransaction memory htlc) 
    {
        return verifiedHTLCs[hashlock];
    }

    /**
     * @notice Check if transaction has been processed
     * @param txHash The transaction hash
     * @return processed Whether the transaction was processed
     */
    function isTransactionProcessed(bytes32 txHash) 
        external 
        view 
        returns (bool processed) 
    {
        return processedTransactions[txHash];
    }

    /**
     * @notice Get block header by hash
     * @param blockHash The block hash
     * @return header The block header
     */
    function getBlockHeader(bytes32 blockHash) 
        external 
        view 
        returns (PolkadotBlockHeader memory header) 
    {
        return finalizedHeaders[blockHash];
    }

    /**
     * @notice Get block hash by number
     * @param blockNumber The block number
     * @return blockHash The block hash
     */
    function getBlockHashByNumber(uint256 blockNumber) 
        external 
        view 
        returns (bytes32 blockHash) 
    {
        return blockNumberToHash[blockNumber];
    }

    /**
     * @notice Update target parachain ID
     * @param parachainId The new parachain ID
     */
    function setTargetParachainId(uint256 parachainId) external onlyOwner {
        require(parachainId > 0, "Invalid parachain ID");
        targetParachainId = parachainId;
    }

    /**
     * @notice Update maximum block age
     * @param _maxBlockAge New maximum block age in seconds
     */
    function setMaxBlockAge(uint256 _maxBlockAge) external onlyOwner {
        require(_maxBlockAge > 3600, "Age too short"); // At least 1 hour
        maxBlockAge = _maxBlockAge;
    }

    /**
     * @dev Parse transaction proof from bytes
     * @param proofData The encoded proof data
     * @return proof The parsed transaction proof
     */
    function _parseTransactionProof(bytes calldata proofData) 
        internal 
        pure 
        returns (TransactionProof memory proof) 
    {
        require(proofData.length >= 160, "Invalid proof data length"); // Minimum expected size
        
        // Decode proof data (simplified - actual implementation would use SCALE codec)
        uint256 offset = 0;
        
        // Transaction hash (32 bytes)
        proof.txHash = bytes32(proofData[offset:offset+32]);
        offset += 32;
        
        // Block hash (32 bytes)
        proof.blockHash = bytes32(proofData[offset:offset+32]);
        offset += 32;
        
        // Block number (32 bytes, but stored as uint256)
        proof.blockNumber = uint256(bytes32(proofData[offset:offset+32]));
        offset += 32;
        
        // Transaction index (32 bytes, but stored as uint256)
        proof.txIndex = uint256(bytes32(proofData[offset:offset+32]));
        offset += 32;
        
        // Merkle proof length (32 bytes)
        uint256 proofLength = uint256(bytes32(proofData[offset:offset+32]));
        offset += 32;
        
        // Merkle proof
        proof.merkleProof = new bytes32[](proofLength);
        for (uint256 i = 0; i < proofLength; i++) {
            proof.merkleProof[i] = bytes32(proofData[offset:offset+32]);
            offset += 32;
        }
        
        // Remaining data is extrinsic data
        proof.extrinsicData = proofData[offset:];
    }

    /**
     * @dev Verify HTLC data matches the extrinsic
     * @param extrinsicData The raw extrinsic data
     * @param htlcData The claimed HTLC data
     * @return valid Whether the data is valid
     */
    function _verifyHTLCData(
        bytes memory extrinsicData,
        HTLCTransaction calldata htlcData
    ) internal pure returns (bool valid) {
        // Simplified verification - in practice would decode SCALE-encoded extrinsic
        // and verify call data matches HTLC parameters
        
        // For now, basic length and hashlock verification
        require(extrinsicData.length > 64, "Extrinsic too short");
        
        // Look for hashlock in extrinsic data (simplified)
        bytes32 foundHashlock;
        assembly {
            foundHashlock := mload(add(extrinsicData, 64)) // Simplified extraction
        }
        
        return foundHashlock == htlcData.hashlock;
    }
}