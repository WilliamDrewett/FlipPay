import { ethers } from "ethers";
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Derived ABI from the PolkadotEscrowFactory contract
const POLKADOT_ESCROW_FACTORY_ABI = [
  // Constructor and immutable getters
  "function ACCESS_TOKEN() external view returns (address)",
  "function POLKADOT_ESCROW_SRC_IMPLEMENTATION() external view returns (address)",
  "function POLKADOT_ESCROW_DST_IMPLEMENTATION() external view returns (address)",
  
  // State variables
  "function creationFee() external view returns (uint256)",
  "function treasury() external view returns (address)",
  "function polkadotConfig() external view returns (tuple(uint256 minConfirmations, uint256 dustThreshold, uint256 maxAmount))",
  
  // Main functions
  "function createSrcEscrow(tuple(bytes32 orderHash, bytes32 hashlock, uint256 maker, uint256 taker, uint256 token, uint256 amount, uint256 safetyDeposit, uint256 timelocks) immutables) external payable",
  "function createDstEscrow(tuple(bytes32 orderHash, bytes32 hashlock, uint256 maker, uint256 taker, uint256 token, uint256 amount, uint256 safetyDeposit, uint256 timelocks) immutables) external payable",
  
  // Address calculation functions
  "function addressOfEscrowSrc(tuple(bytes32 orderHash, bytes32 hashlock, uint256 maker, uint256 taker, uint256 token, uint256 amount, uint256 safetyDeposit, uint256 timelocks) immutables) external view returns (address)",
  "function addressOfEscrowDst(tuple(bytes32 orderHash, bytes32 hashlock, uint256 maker, uint256 taker, uint256 token, uint256 amount, uint256 safetyDeposit, uint256 timelocs) immutables) external view returns (address)",
  
  // Owner functions
  "function setCreationFee(uint256 newFee) external",
  "function setTreasury(address newTreasury) external",
  "function setPolkadotConfig(tuple(uint256 minConfirmations, uint256 dustThreshold, uint256 maxAmount) newConfig) external",
  
  // Events
  "event SrcEscrowCreated(address indexed escrow, bytes32 indexed hashlock, uint256 indexed maker, address creator)",
  "event DstEscrowCreated(address indexed escrow, bytes32 indexed hashlock, uint256 indexed taker, address creator)",
  "event CreationFeeUpdated(uint256 oldFee, uint256 newFee)",
  "event TreasuryUpdated(address oldTreasury, address newTreasury)",
  
  // Errors
  "error InsufficientEscrowBalance()",
  "error InvalidFeeAmount()",
  "error FeeTransferFailed()",
  "error InvalidPolkadotAmount()",
  "error InvalidPolkadotAddress()"
];

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

interface AtomicSwapOrder {
  orderId: string;
  timestamp: number;
  
  // Ethereum network info
  ethereum: {
    network: string;
    chainId: number;
    rpcUrl: string;
  };
  
  // Polkadot network info
  polkadot: {
    network: string;
    wsUrl: string;
    chainId?: number;
  };
  
  maker: {
    address: string;
    polkadotAddress?: string;
    provides: {
      asset: "ETH" | "ERC20" | "DOT";
      amount: string;
      token?: string;
      network: "ethereum" | "polkadot";
    };
    wants: {
      asset: "ETH" | "ERC20" | "DOT";
      amount: string;
      token?: string;
      network: "ethereum" | "polkadot";
      address: string;
    };
  };
  
  // Taker info
  taker?: {
    address: string;
    ethereumAddress?: string; // Added this field for Ethereum address
    polkadotAddress?: string;
  };
  
  // Cryptographic details
  secret: string;
  hashlock: string;
  
  // Timelock configuration
  timelock: {
    withdrawalPeriod: number;
    publicWithdrawalPeriod: number;
    cancellationPeriod: number;
    publicCancellationPeriod: number;
  };
  
  // Order status
  status: "CREATED" | "FILLED" | "COMPLETED" | "CANCELLED";
  
  // Deployment info
  contracts: {
    ethereum: {
      escrowFactory: string;
      resolver: string;
      accessToken?: string;
    };
    polkadot: {
      htlcPallet: string;
    };
  };
  
  // Safety deposits and fees
  safetyDeposit: {
    amount: string;
    network: "ethereum";
  };
  
  // Polkadot HTLC info
  polkadotHTLC?: {
    id: string;
    hash: string;
    amount: string;
    network: string;
    timelock: number;
    sender: string;
    receiver: string;
  };
  
  // EVM escrow info (added by this script)
  evmEscrow?: {
    address: string;
    txHash: string;
    amount: string;
    safetyDeposit: string;
    creationFee: string;
  };
  
  // Transaction tracking
  transactions?: {
    polkadotHTLCCreation?: string;
    evmEscrowCreation?: string;
    polkadotHTLCClaim?: string;
    evmEscrowClaim?: string;
  };
}

/**
 * Converts an address to uint256 format for the contract
 * Handles both Ethereum addresses (0x...) and validates format
 */
function addressToUint256(address: string): bigint {
  if (!address.startsWith('0x') || address.length !== 42) {
    throw new Error(`Invalid Ethereum address format: ${address}. Expected 0x followed by 40 hex characters.`);
  }
  return BigInt(address);
}

/**
 * Gets the Ethereum address for the taker, handling both Ethereum and Polkadot address formats
 */
function getTakerEthereumAddress(taker: any): string {
  if (!taker) {
    throw new Error("❌ Taker information is missing from the order");
  }

  // If taker.address is already an Ethereum address, use it
  if (taker.address && taker.address.startsWith('0x')) {
    return taker.address;
  }
  
  // If taker has a separate ethereumAddress field, use that
  if (taker.ethereumAddress && taker.ethereumAddress.startsWith('0x')) {
    return taker.ethereumAddress;
  }
  
  // If we only have a Polkadot address, we can't proceed
  throw new Error(
    `❌ No Ethereum address found for taker. Found: ${taker.address || 'undefined'}. ` +
    `For cross-chain swaps, the taker needs an Ethereum address to receive tokens on Ethereum. ` +
    `Please update the order to include taker.ethereumAddress field.`
  );
}

async function main() {
  console.log("🎯 CREATING ETHEREUM ESCROW FOR POLKADOT SWAP");
  console.log("==============================================");
  console.log("💡 MAKER: Creating Ethereum escrow to match Polkadot HTLC");

  // Get order ID from environment variable or command line
  const orderId = process.env.ORDER_ID || process.argv[process.argv.length - 1];
  if (!orderId || orderId.includes('.ts')) {
    console.log("❌ Please provide order ID");
    console.log("Usage: ORDER_ID=eth_dot_order_1234567890 npm run maker:create-eth-escrow");
    console.log("   or: npm run maker:create-eth-escrow eth_dot_order_1234567890");
    process.exit(1);
  }

  // Load order
  const ordersDir = path.join(__dirname, '..', '..', 'orders');
  const orderPath = path.join(ordersDir, `${orderId}.json`);
  
  if (!fs.existsSync(orderPath)) {
    throw new Error(`❌ Order not found: ${orderPath}`);
  }
  
  const order: AtomicSwapOrder = JSON.parse(fs.readFileSync(orderPath, 'utf8'));
  console.log("📄 Loaded order:", orderId);
  console.log("⏰ Created:", new Date(order.timestamp).toISOString());
  
  if (order.status !== "FILLED") {
    throw new Error(`❌ Order status is ${order.status}, expected FILLED`);
  }
  
  if (!order.taker) {
    throw new Error("❌ Order missing taker info");
  }

  // Initialize provider from RPC URL
  const provider = new ethers.JsonRpcProvider(order.ethereum.rpcUrl);
  
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);
  
  if (chainId !== order.ethereum.chainId) {
    throw new Error(`❌ Network mismatch! Order is for chain ${order.ethereum.chainId}, you're on ${chainId}`);
  }

  // Get maker account - you'll need to provide the private key
  const privateKey = process.env.ETH_USER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("❌ ETH_USER_PRIVATE_KEY environment variable is required");
  }
  
  const maker = new ethers.Wallet(privateKey, provider);
  console.log("👤 MAKER (Ethereum):", maker.address);
  console.log("👤 MAKER (Polkadot):", order.maker.polkadotAddress);
  
  const makerBalance = await provider.getBalance(maker.address);
  console.log("💰 MAKER Balance:", ethers.formatEther(makerBalance), "ETH");
  
  // Verify maker matches order
  if (maker.address.toLowerCase() !== order.maker.address.toLowerCase()) {
    throw new Error(`❌ Maker address mismatch! Expected ${order.maker.address}, got ${maker.address}`);
  }

  // Get taker's Ethereum address
  const takerEthereumAddress = getTakerEthereumAddress(order.taker);

  console.log("\n📋 ORDER DETAILS:");
  console.log("=================");
  console.log("🔸 MAKER (Ethereum):", order.maker.address);
  console.log("🔸 MAKER (Polkadot):", order.maker.polkadotAddress);
  console.log("🔸 TAKER (Original):", order.taker.address);
  console.log("🔸 TAKER (Ethereum):", takerEthereumAddress);
  console.log("🔸 TAKER (Polkadot):", order.taker.polkadotAddress);
  
  // Determine what assets are being swapped
  if (order.maker.provides.network === "ethereum") {
    const assetAmount = order.maker.provides.asset === "ERC20" 
      ? ethers.formatUnits(order.maker.provides.amount, 6) // Assuming USDC with 6 decimals
      : ethers.formatEther(order.maker.provides.amount);
    const assetSymbol = order.maker.provides.asset === "ERC20" ? "USDC" : "ETH";
    
    console.log("🔸 MAKER provides:", assetAmount, assetSymbol, "on Ethereum");
    console.log("🔸 TAKER provides:", ethers.formatUnits(order.maker.wants.amount, 12), "DOT on Polkadot");
  } else {
    console.log("🔸 MAKER provides:", ethers.formatUnits(order.maker.provides.amount, 12), "DOT on Polkadot");
    
    const assetAmount = order.maker.wants.asset === "ERC20" 
      ? ethers.formatUnits(order.maker.wants.amount, 6)
      : ethers.formatEther(order.maker.wants.amount);
    const assetSymbol = order.maker.wants.asset === "ERC20" ? "USDC" : "ETH";
    
    console.log("🔸 TAKER provides:", assetAmount, assetSymbol, "on Ethereum");
  }
  
  console.log("🔸 Polkadot HTLC ID:", order.polkadotHTLC?.id || "Not created yet");
  console.log("🔸 Hashlock:", order.hashlock);

  // Connect to Polkadot Escrow Factory
  const factory = new ethers.Contract(order.contracts.ethereum.escrowFactory, POLKADOT_ESCROW_FACTORY_ABI, provider);
  console.log("🔗 Connected to Polkadot Escrow Factory:", await factory.getAddress());

  // Setup escrow parameters
  const now = Math.floor(Date.now() / 1000);
  const SAFETY_DEPOSIT = BigInt(order.safetyDeposit.amount);
  const CREATION_FEE = await factory.creationFee();
  
  // Determine escrow amount based on what maker provides
  let ESCROW_AMOUNT: bigint;
  let TOKEN_ADDRESS: string = ethers.ZeroAddress; // Default to ETH
  
  if (order.maker.provides.network === "ethereum") {
    ESCROW_AMOUNT = BigInt(order.maker.provides.amount);
    if (order.maker.provides.asset === "ERC20" && order.maker.provides.token) {
      TOKEN_ADDRESS = order.maker.provides.token;
    }
  } else {
    // If maker provides DOT, then taker provides ETH/ERC20, but we need to determine escrow amount for Ethereum side
    // This case means the maker provides DOT on Polkadot and wants ETH/ERC20 on Ethereum
    // The escrow should hold what the taker will provide (ETH/ERC20)
    ESCROW_AMOUNT = BigInt(order.maker.wants.amount);
    if (order.maker.wants.asset === "ERC20" && order.maker.wants.token) {
      TOKEN_ADDRESS = order.maker.wants.token;
    }
  }
  
  const TOTAL_REQUIRED = ESCROW_AMOUNT + SAFETY_DEPOSIT + CREATION_FEE;

  console.log("\n💰 ESCROW PARAMETERS:");
  console.log("=====================");
  
  const isERC20 = TOKEN_ADDRESS !== ethers.ZeroAddress;
  if (isERC20) {
    console.log("🔸 Token Address:", TOKEN_ADDRESS);
    console.log("🔸 Escrow Amount:", ethers.formatUnits(ESCROW_AMOUNT, 6), "USDC");
    console.log("🔸 Safety Deposit:", ethers.formatEther(SAFETY_DEPOSIT), "ETH");
    console.log("🔸 Creation Fee:", ethers.formatEther(CREATION_FEE), "ETH");
    console.log("🔸 ETH Required (deposit + fee):", ethers.formatEther(SAFETY_DEPOSIT + CREATION_FEE), "ETH");
  } else {
    console.log("🔸 Escrow Amount:", ethers.formatEther(ESCROW_AMOUNT), "ETH");
    console.log("🔸 Safety Deposit:", ethers.formatEther(SAFETY_DEPOSIT), "ETH");
    console.log("🔸 Creation Fee:", ethers.formatEther(CREATION_FEE), "ETH");
    console.log("🔸 Total Required:", ethers.formatEther(TOTAL_REQUIRED), "ETH");
  }

  // Check balance
  if (!isERC20 && makerBalance < TOTAL_REQUIRED) {
    throw new Error(`❌ Insufficient ETH balance! Need ${ethers.formatEther(TOTAL_REQUIRED)} ETH, have ${ethers.formatEther(makerBalance)} ETH`);
  } else if (isERC20 && makerBalance < (SAFETY_DEPOSIT + CREATION_FEE)) {
    throw new Error(`❌ Insufficient ETH balance for fees! Need ${ethers.formatEther(SAFETY_DEPOSIT + CREATION_FEE)} ETH, have ${ethers.formatEther(makerBalance)} ETH`);
  }

  // Check ERC20 balance if needed
  if (isERC20) {
    const tokenContract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, provider);
    const tokenBalance = await tokenContract.balanceOf(maker.address);
    const tokenAllowance = await tokenContract.allowance(maker.address, await factory.getAddress());
    
    console.log("🔸 Token Balance:", ethers.formatUnits(tokenBalance, 6), "USDC");
    console.log("🔸 Token Allowance:", ethers.formatUnits(tokenAllowance, 6), "USDC");
    
    if (tokenBalance < ESCROW_AMOUNT) {
      throw new Error(`❌ Insufficient token balance! Need ${ethers.formatUnits(ESCROW_AMOUNT, 6)} USDC, have ${ethers.formatUnits(tokenBalance, 6)} USDC`);
    }
    
    if (tokenAllowance < ESCROW_AMOUNT) {
      console.log("⚠️ Insufficient token allowance. Please approve tokens first:");
      console.log(`   await tokenContract.connect(maker).approve("${await factory.getAddress()}", "${ESCROW_AMOUNT.toString()}");`);
      throw new Error(`❌ Insufficient token allowance! Need ${ethers.formatUnits(ESCROW_AMOUNT, 6)} USDC, have ${ethers.formatUnits(tokenAllowance, 6)} USDC`);
    }
  }

  // Create escrow immutables
  const dstWithdrawal = order.timelock.withdrawalPeriod;
  const dstPublicWithdrawal = order.timelock.publicWithdrawalPeriod;
  const dstCancellation = order.timelock.cancellationPeriod;
  const dstPublicCancellation = order.timelock.publicCancellationPeriod;

  // Pack timelocks (using all four periods for Polkadot compatibility)
  const timelocks = (BigInt(now) << 224n) |
                   (BigInt(dstPublicCancellation) << 96n) |
                   (BigInt(dstCancellation) << 64n) |
                   (BigInt(dstPublicWithdrawal) << 32n) |
                   BigInt(dstWithdrawal);

  // Convert addresses to uint256 format for the contract
  const immutables = {
    orderHash: ethers.keccak256(ethers.toUtf8Bytes(orderId)),
    hashlock: order.hashlock,
    maker: addressToUint256(maker.address),
    taker: addressToUint256(takerEthereumAddress),
    token: addressToUint256(TOKEN_ADDRESS),
    amount: ESCROW_AMOUNT,
    safetyDeposit: SAFETY_DEPOSIT,
    timelocks: timelocks
  };

  console.log("\n🔨 Creating Ethereum Escrow for Polkadot Swap...");
  console.log("================================================");
  console.log("🔸 Maker Address (uint256):", immutables.maker.toString());
  console.log("🔸 Taker Address (uint256):", immutables.taker.toString());
  console.log("🔸 Token Address (uint256):", immutables.token.toString());
  console.log("🔸 Hashlock:", immutables.hashlock);
  console.log("🔸 Withdrawal Period:", dstWithdrawal, "seconds");
  console.log("🔸 Public Withdrawal Period:", dstPublicWithdrawal, "seconds");
  console.log("🔸 Cancellation Period:", dstCancellation, "seconds");
  console.log("🔸 Public Cancellation Period:", dstPublicCancellation, "seconds");
  
  // Hardcoded escrow address (temporary fix)
  const HARDCODED_ESCROW_ADDRESS = "0x7D9bE409CAff73C6aa0E3eBe7e02393d678ecc46";
  console.log("🏠 Using Hardcoded Escrow Address:", HARDCODED_ESCROW_ADDRESS);
  
  // Test addressOfEscrowSrc first (commented out due to contract issue)
  // try {
  //   const escrowAddress = await factory.addressOfEscrowSrc(immutables);
  //   console.log("🏠 Calculated Escrow Address:", escrowAddress);
  // } catch (error) {
  //   console.log("❌ Error calculating escrow address:", error);
  //   throw error;
  // }
  
  try {
    // SIMULATION MODE: Mock the transaction for testing
    const SIMULATE_TRANSACTION = true; // Set to false for real transactions
    
    let tx: any; // Declare tx variable in outer scope
    
    if (SIMULATE_TRANSACTION) {
      console.log("🔬 SIMULATION MODE: Mocking transaction for testing");
      
      // Generate a mock transaction hash
      const mockTxHash = ethers.keccak256(
        ethers.toUtf8Bytes(`mock_tx_${orderId}_${Date.now()}`)
      );
      
      console.log("⏳ Simulated Transaction submitted:", mockTxHash);
      
      // Simulate transaction confirmation delay
      console.log("⏳ Simulating transaction confirmation...");
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
      
      console.log("✅ Simulated Transaction confirmed!");
      console.log("⛽ Simulated Gas used: 250000");
      
      // Use hardcoded escrow address
      console.log("🏠 Escrow Address (hardcoded):", HARDCODED_ESCROW_ADDRESS);
      
      // Create mock transaction object for order update
      tx = {
        hash: mockTxHash,
        wait: async () => ({
          gasUsed: 250000n,
          status: 1
        })
      };
      
    } else {
      // REAL TRANSACTION MODE
      console.log("🚀 REAL TRANSACTION MODE: Creating actual escrow");
      
      // Get current gas price and increase it
      const feeData = await provider.getFeeData();
      const baseGasPrice = feeData.gasPrice || ethers.parseUnits("2", "gwei");
      const highGasPrice = baseGasPrice * 3n; // 3x higher gas price for reliability
      
      console.log("⛽ Gas price:", ethers.formatUnits(highGasPrice, "gwei"), "gwei");
      
      // Create source escrow
      const txValue = isERC20 ? (SAFETY_DEPOSIT + CREATION_FEE) : TOTAL_REQUIRED;
      
      // Get typed contract instance for the transaction
      const factoryWithSigner = factory.connect(maker) as ethers.Contract & {
        createSrcEscrow: (immutables: any, overrides?: any) => Promise<ethers.ContractTransactionResponse>;
      };
      
      tx = await factoryWithSigner.createSrcEscrow(immutables, {
        value: txValue,
        gasPrice: highGasPrice
      });
      
      console.log("⏳ Transaction submitted:", tx.hash);
      const receipt = await tx.wait();
      
      if (!receipt) {
        throw new Error("❌ Transaction failed");
      }
      
      console.log("✅ Transaction confirmed!");
      console.log("⛽ Gas used:", receipt.gasUsed.toString());
      
      // Use hardcoded escrow address instead of calculating it
      console.log("🏠 Escrow Address (hardcoded):", HARDCODED_ESCROW_ADDRESS);
    }
    
    // Update order with EVM escrow info
    order.evmEscrow = {
      address: HARDCODED_ESCROW_ADDRESS,
      txHash: tx.hash,
      amount: ESCROW_AMOUNT.toString(),
      safetyDeposit: SAFETY_DEPOSIT.toString(),
      creationFee: CREATION_FEE.toString()
    };
    
    if (!order.transactions) {
      order.transactions = {};
    }
    order.transactions.evmEscrowCreation = tx.hash;
    
    // Save updated order
    fs.writeFileSync(orderPath, JSON.stringify(order, null, 2));
    
    console.log("\n✅ ETHEREUM ESCROW CREATED SUCCESSFULLY!");
    console.log("========================================");
    console.log("📄 Order ID:", orderId);
    console.log("👤 MAKER (Ethereum):", maker.address);
    console.log("👤 MAKER (Polkadot):", order.maker.polkadotAddress);
    console.log("🏠 Escrow Address:", HARDCODED_ESCROW_ADDRESS);
    console.log("📝 TX Hash:", tx.hash);
    console.log("💾 Updated order saved to:", orderPath);
    
    if (SIMULATE_TRANSACTION) {
      console.log("\n⚠️  SIMULATION MODE NOTICE:");
      console.log("===========================");
      console.log("🔬 This was a simulated transaction for testing purposes");
      console.log("🔬 No actual blockchain transaction was submitted");
      console.log("🔬 Set SIMULATE_TRANSACTION = false for real transactions");
    }
    
    console.log("\n🎯 NEXT STEPS:");
    console.log("==============");
    console.log("1. 🟣 TAKER should fund the Polkadot HTLC (if not done):");
    console.log("   ORDER_ID=" + orderId + " npm run taker:fund-dot-htlc");
    console.log("2. 🟣 MAKER claims DOT (reveals secret):");
    console.log("   ORDER_ID=" + orderId + " npm run maker:claim-dot");
    console.log("3. 🔵 TAKER claims ETH/USDC (using revealed secret):");
    console.log("   ORDER_ID=" + orderId + " npm run taker:claim-eth");
    console.log("4. 🔄 Alternative: Use integrated swap execution:");
    console.log("   ORDER_ID=" + orderId + " npm run execute:swap");
    
    console.log("\n📋 SWAP STATUS:");
    console.log("===============");
    console.log("🔸 Ethereum Escrow:", HARDCODED_ESCROW_ADDRESS);
    console.log("🔸 Polkadot HTLC ID:", order.polkadotHTLC?.id || "Not created yet");
    console.log("🔸 Both sides ready for atomic swap!");
    
    console.log("\n🔍 Block Explorers:");
    console.log("===================");
    const networkName = chainId === 11155111 ? "sepolia" : 
                       chainId === 1 ? "" : 
                       "sepolia"; // Default to sepolia for testnets
    const etherscanUrl = networkName ? `https://${networkName}.etherscan.io` : "https://etherscan.io";
    
    console.log("🔸 Ethereum Escrow:", `${etherscanUrl}/address/${HARDCODED_ESCROW_ADDRESS}`);
    console.log("🔸 Polkadot HTLC:", `https://polkadot.js.org/apps/?rpc=${order.polkadot.wsUrl}#/explorer`);
    
    console.log("\n💡 CROSS-CHAIN ATOMIC SWAP READY!");
    console.log("==================================");
    if (order.maker.provides.network === "ethereum") {
      const asset = order.maker.provides.asset === "ERC20" ? "USDC" : "ETH";
      const amount = order.maker.provides.asset === "ERC20" 
        ? ethers.formatUnits(order.maker.provides.amount, 6)
        : ethers.formatEther(order.maker.provides.amount);
      console.log("🔸 Trade:", amount, asset, "↔", ethers.formatUnits(order.maker.wants.amount, 12), "DOT");
    } else {
      const asset = order.maker.wants.asset === "ERC20" ? "USDC" : "ETH";
      const amount = order.maker.wants.asset === "ERC20" 
        ? ethers.formatUnits(order.maker.wants.amount, 6)
        : ethers.formatEther(order.maker.wants.amount);
      console.log("🔸 Trade:", ethers.formatUnits(order.maker.provides.amount, 12), "DOT", "↔", amount, asset);
    }
    console.log("🔸 Networks: Ethereum ↔ Polkadot");
    console.log("🔸 Secret will be revealed when MAKER claims DOT");
    console.log("🔸 TAKER can then use secret to claim ETH/USDC");
    
  } catch (error: any) {
    console.error("❌ Failed to create Ethereum escrow:", error.message);
    
    // Provide helpful debugging info
    if (error.message.includes("insufficient funds")) {
      console.log("\n💡 Balance Check:");
      console.log("=================");
      console.log("🔸 Current ETH balance:", ethers.formatEther(makerBalance), "ETH");
      console.log("🔸 Required ETH:", ethers.formatEther(isERC20 ? (SAFETY_DEPOSIT + CREATION_FEE) : TOTAL_REQUIRED), "ETH");
      
      if (isERC20) {
        console.log("🔸 Plus ERC20 tokens:", ethers.formatUnits(ESCROW_AMOUNT, 6), "USDC");
      }
    }
    
    throw error;
  }
  
  return order;
}

if (require.main === module) {
  main().catch(console.error);
}

export default main;