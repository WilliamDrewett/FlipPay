// SPDX-License-Identifier: MIT

pragma solidity 0.8.23;

import { Script } from "forge-std/Script.sol";
import { ICreate3Deployer } from "solidity-utils/contracts/interfaces/ICreate3Deployer.sol";
import { IERC20 } from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import { console } from "forge-std/console.sol";

import { EscrowFactory } from "src/EscrowFactory.sol";
import { PolkadotVerifier } from "src/PolkadotVerifier.sol";

contract DeployEscrowFactory is Script {
    // Deployment configuration
    uint32 public constant ETHEREUM_RESCUE_DELAY = 691200; // 8 days
    uint32 public constant POLKADOT_RESCUE_DELAY = 115200; // ~8 days in 6s blocks
    bytes32 public constant CROSSCHAIN_SALT = keccak256("Ethereum-Polkadot-AtomicSwap");
    
    // Network constants
    ICreate3Deployer public constant CREATE3_DEPLOYER = ICreate3Deployer(0x65B3Db8bAeF0215A1F9B14c506D2a3078b2C84AE);
    
    // Chains that support CREATE3 deployer
    mapping(uint256 => bool) public SUPPORTS_CREATE3;
    
    // Fee token configuration per chain
    mapping(uint256 => address) public FEE_TOKEN;
    
    // Polkadot configuration
    struct DeploymentConfig {
        address polkadotRelayer;     // Trusted relayer for Polkadot proofs
        uint256 polkadotParachainId; // Target parachain (1000 for Asset Hub)  
        uint256 polkadotBlockTime;   // Block time in seconds
        uint256 maxTimelock;         // Maximum timelock duration
        address feeRecipient;        // Fee recipient address
    }

    function run() external {
        // Configure fee tokens and CREATE3 support for different chains
        _configureFeeTokens();
        _configureCreate3Support();
        
        // Get deployment configuration
        DeploymentConfig memory config = _getDeploymentConfig();
        
        // Validate configuration
        _validateConfig(config);
        
        // Get current chain's fee token
        address feeToken = FEE_TOKEN[block.chainid];
        require(feeToken != address(0), "Fee token not configured for this chain");
        
        console.log("Deploying Ethereum-Polkadot Atomic Swap Factory...");
        console.log("Chain ID:", block.chainid);
        console.log("Fee Token:", feeToken);
        console.log("Polkadot Parachain ID:", config.polkadotParachainId);
        console.log("Polkadot Relayer:", config.polkadotRelayer);
        console.log("Supports CREATE3:", SUPPORTS_CREATE3[block.chainid]);

        vm.startBroadcast();
        
        // Deploy Polkadot Verifier first
        address polkadotVerifier = _deployPolkadotVerifier(config.polkadotRelayer);
        console.log("Polkadot Verifier deployed at:", polkadotVerifier);
        
        // Create Polkadot configuration
        EscrowFactory.PolkadotConfig memory polkadotConfig = EscrowFactory.PolkadotConfig({
            polkadotVerifier: polkadotVerifier,
            polkadotParachainId: config.polkadotParachainId,
            polkadotBlockTime: config.polkadotBlockTime,
            maxTimelock: config.maxTimelock,
            xcmBridge: address(0) // Will be set later if needed
        });
        
        // Deploy main factory using appropriate method
        address escrowFactory = _deployEscrowFactory(feeToken, config, polkadotConfig);
        
        vm.stopBroadcast();

        console.log("=== Deployment Summary ===");
        console.log("Atomic Swap Factory:", escrowFactory);
        console.log("Polkadot Verifier:", polkadotVerifier);
        console.log("Fee Token:", feeToken);
        console.log("Fee Recipient:", config.feeRecipient);
        console.log("Ethereum Rescue Delay:", ETHEREUM_RESCUE_DELAY, "seconds");
        console.log("Polkadot Rescue Delay:", POLKADOT_RESCUE_DELAY, "blocks");
        console.log("Max Timelock:", config.maxTimelock, "seconds");
        
        // Log important addresses for verification
        _logVerificationInfo(escrowFactory, polkadotVerifier, config);
    }
    
    function _deployPolkadotVerifier(address relayer) internal returns (address) {
        if (SUPPORTS_CREATE3[block.chainid]) {
            // Use CREATE3 for deterministic addresses on supported chains
            bytes32 verifierSalt = keccak256(abi.encodePacked(CROSSCHAIN_SALT, "PolkadotVerifier"));
            return CREATE3_DEPLOYER.deploy(
                verifierSalt,
                abi.encodePacked(
                    type(PolkadotVerifier).creationCode,
                    abi.encode(relayer)
                )
            );
        } else {
            // Use regular deployment for unsupported chains (like testnets)
            return address(new PolkadotVerifier(relayer));
        }
    }
    
    function _deployEscrowFactory(
        address feeToken,
        DeploymentConfig memory config,
        EscrowFactory.PolkadotConfig memory polkadotConfig
    ) internal returns (address) {
        if (SUPPORTS_CREATE3[block.chainid]) {
            // Use CREATE3 for deterministic addresses on supported chains
            return CREATE3_DEPLOYER.deploy(
                CROSSCHAIN_SALT,
                abi.encodePacked(
                    type(EscrowFactory).creationCode,
                    abi.encode(
                        IERC20(feeToken),
                        config.feeRecipient,
                        ETHEREUM_RESCUE_DELAY,
                        POLKADOT_RESCUE_DELAY,
                        polkadotConfig
                    )
                )
            );
        } else {
            // Use regular deployment for unsupported chains (like testnets)
            return address(new EscrowFactory(
                IERC20(feeToken),
                config.feeRecipient,
                ETHEREUM_RESCUE_DELAY,
                POLKADOT_RESCUE_DELAY,
                polkadotConfig
            ));
        }
    }
    
    function _configureCreate3Support() internal {
        // Mainnet chains that support CREATE3 deployer
        SUPPORTS_CREATE3[1] = true;      // Ethereum Mainnet
        SUPPORTS_CREATE3[42161] = true;  // Arbitrum One
        SUPPORTS_CREATE3[10] = true;     // Optimism
        SUPPORTS_CREATE3[137] = true;    // Polygon
        SUPPORTS_CREATE3[8453] = true;   // Base
        SUPPORTS_CREATE3[56] = true;     // BSC
        SUPPORTS_CREATE3[43114] = true;  // Avalanche
        
        // Testnets typically don't support CREATE3 deployer
        SUPPORTS_CREATE3[11155111] = false; // Sepolia
        SUPPORTS_CREATE3[5] = false;        // Goerli (deprecated)
        SUPPORTS_CREATE3[80001] = false;    // Mumbai (Polygon testnet)
        SUPPORTS_CREATE3[421613] = false;   // Arbitrum Goerli
        SUPPORTS_CREATE3[420] = false;      // Optimism Goerli
        
        // Local development
        SUPPORTS_CREATE3[31337] = false; // Hardhat/Anvil local
    }
    
    function _configureFeeTokens() internal {
        // Ethereum Mainnet
        FEE_TOKEN[1] = 0x6B175474E89094C44Da98b954EedeAC495271d0F; // DAI
        
        // Arbitrum One  
        FEE_TOKEN[42161] = 0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1; // DAI
        
        // Optimism
        FEE_TOKEN[10] = 0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1; // DAI
        
        // Polygon
        FEE_TOKEN[137] = 0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063; // DAI
        
        // Base
        FEE_TOKEN[8453] = 0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb; // DAI
        
        // BSC
        FEE_TOKEN[56] = 0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3; // DAI
        
        // Avalanche
        FEE_TOKEN[43114] = 0xd586E7F844cEa2F87f50152665BCbc2C279D8d70; // DAI
        
        // Sepolia (testnet) - Deploy a mock DAI or use existing testnet token
        FEE_TOKEN[11155111] = 0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b; // DAI (testnet)
        
        // Local development
        FEE_TOKEN[31337] = address(0); // No fee token for local testing
    }
    
    function _getDeploymentConfig() internal view returns (DeploymentConfig memory config) {
        // Try to get from environment variables first
        try vm.envAddress("POLKADOT_RELAYER") returns (address relayer) {
            config.polkadotRelayer = relayer;
        } catch {
            // Use deployer as default relayer if not specified
            config.polkadotRelayer = vm.envAddress("DEPLOYER_ADDRESS");
        }
        
        try vm.envUint("POLKADOT_PARACHAIN_ID") returns (uint256 parachainId) {
            config.polkadotParachainId = parachainId;
        } catch {
            config.polkadotParachainId = 1000; // Asset Hub default
        }
        
        try vm.envUint("POLKADOT_BLOCK_TIME") returns (uint256 blockTime) {
            config.polkadotBlockTime = blockTime;
        } catch {
            config.polkadotBlockTime = 6; // 6 seconds default
        }
        
        try vm.envUint("MAX_TIMELOCK") returns (uint256 maxTimelock) {
            config.maxTimelock = maxTimelock;
        } catch {
            config.maxTimelock = 2592000; // 30 days default
        }
        
        try vm.envAddress("FEE_RECIPIENT") returns (address feeRecipient) {
            config.feeRecipient = feeRecipient;
        } catch {
            config.feeRecipient = vm.envAddress("DEPLOYER_ADDRESS");
        }
    }
    
    function _validateConfig(DeploymentConfig memory config) internal pure {
        require(config.polkadotRelayer != address(0), "Invalid Polkadot relayer");
        require(config.polkadotParachainId > 0, "Invalid parachain ID");
        require(config.polkadotBlockTime > 0, "Invalid block time");
        require(config.maxTimelock >= 3600, "Max timelock too short"); // At least 1 hour
        require(config.maxTimelock <= 7776000, "Max timelock too long"); // Max 90 days
        require(config.feeRecipient != address(0), "Invalid fee recipient");
    }
    
    function _logVerificationInfo(
        address factory,
        address verifier,
        DeploymentConfig memory config
    ) internal view {
        console.log("\n=== Verification Information ===");
        console.log("To verify the deployment:");
        console.log("1. Verify EscrowFactory contract");
        console.log("2. Verify PolkadotVerifier contract");
        console.log("3. Check trusted relayer is set correctly");
        console.log("4. Verify parachain ID matches target chain");
        
        if (!SUPPORTS_CREATE3[block.chainid]) {
            console.log("\n=== Important Note ===");
            console.log("This chain doesn't support CREATE3 deployer.");
            console.log("Contracts deployed with regular CREATE - addresses will differ across chains.");
            console.log("For production cross-chain compatibility, consider:");
            console.log("1. Using a different CREATE3 deployer service");
            console.log("2. Deploying your own CREATE3 factory");
            console.log("3. Using CREATE2 with consistent salt and constructor args");
        }
        
        console.log("\n=== Next Steps ===");
        console.log("1. Set up Polkadot relayer service");
        console.log("2. Deploy corresponding HTLC pallet on Polkadot");
        console.log("3. Configure cross-chain message passing");
        console.log("4. Test atomic swap flow");
        
        console.log("\n=== Environment Variables Used ===");
        console.log("POLKADOT_RELAYER:", config.polkadotRelayer);
        console.log("POLKADOT_PARACHAIN_ID:", config.polkadotParachainId);
        console.log("POLKADOT_BLOCK_TIME:", config.polkadotBlockTime);
        console.log("MAX_TIMELOCK:", config.maxTimelock);
        console.log("FEE_RECIPIENT:", config.feeRecipient);
    }
}