import { ethers } from "ethers";
import dotenv from 'dotenv';

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

dotenv.config();

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
    chainId?: number; // Optional for Polkadot
  };
  
  maker: {
    address: string;
    polkadotAddress?: string; // If maker is providing DOT
    provides: {
      asset: "ETH" | "ERC20" | "DOT";
      amount: string;
      token?: string; // For ERC20 tokens
      network: "ethereum" | "polkadot";
    };
    wants: {
      asset: "ETH" | "ERC20" | "DOT";
      amount: string;
      token?: string; // For ERC20 tokens
      network: "ethereum" | "polkadot";
      address: string; // Recipient address on target network
    };
  };
  
  secret: string;
  hashlock: string;
  
  timelock: {
    withdrawalPeriod: number; // seconds
    publicWithdrawalPeriod: number;
    cancellationPeriod: number;
    publicCancellationPeriod: number;
  };
  
  status: "CREATED" | "FILLED" | "COMPLETED" | "CANCELLED";
  
  contracts: {
    ethereum: {
      escrowFactory: string;
      resolver: string;
      accessToken?: string;
    };
    polkadot: {
      htlcPallet: string; // Template pallet name
    };
  };
  
  // Safety deposits and fees
  safetyDeposit: {
    amount: string; // In ETH
    network: "ethereum";
  };
}

// Fix 3: Custom JSON replacer to handle BigInt serialization
function bigIntReplacer(key: string, value: any) {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
}

// Fix 4: Custom JSON reviver to restore BigInt values
function bigIntReviver(key: string, value: any) {
  // Check if the key suggests this should be a BigInt and the value is a string of digits
  if (typeof value === 'string' && /^-?\d+$/.test(value) && 
      (key.includes('dst') || key.includes('timelock') || key.includes('Withdrawal') || key.includes('Cancellation'))) {
    return BigInt(value);
  }
  return value;
}

async function main() {
  console.log("🚀 CREATING ETHEREUM ↔ POLKADOT ATOMIC SWAP ORDER");
  console.log("==================================================");
  
  // Initialize provider - you may need to adjust this based on your setup
  const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com");
  
  // Get Ethereum network info
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);
  const networkName = chainId === 11155111 ? "sepolia" : 
                     chainId === 1 ? "mainnet" : 
                     chainId === 31337 ? "hardhat" : "unknown";
  
  console.log("🌐 Ethereum Network:", networkName);
  console.log("🔗 Ethereum Chain ID:", chainId);
  
  // Get maker account (on Ethereum)
  // You'll need to provide the private key or use a wallet
  const makerPrivateKey = process.env.ETH_USER_PRIVATE_KEY;
  if (!makerPrivateKey) {
    throw new Error("ETH_USER_PRIVATE_KEY environment variable is required");
  }
  
  const maker = new ethers.Wallet(makerPrivateKey, provider);
  console.log("👤 MAKER (Ethereum):", maker.address);
  
  const makerBalance = await provider.getBalance(maker.address);
  console.log("💰 MAKER ETH Balance:", ethers.formatEther(makerBalance), "ETH");
  
  // Generate secure random secret (same as Bitcoin version)
  const secretBytes = crypto.randomBytes(32);
  const secret = "0x" + secretBytes.toString("hex");
  const hashlock = ethers.sha256(secret);
  
  console.log("\n🔐 CRYPTOGRAPHIC SETUP:");
  console.log("=======================");
  console.log("🔑 Secret:", secret);
  console.log("🔒 Hashlock:", hashlock);
  
  // Contract addresses (you'll need to update these)
  const ethereumContracts = {
    escrowFactory: process.env.ESCROW_FACTORY_ADDRESS || "0xd27Cbab8E34b8D6d9769BD557769bA96909cd390",
    resolver: process.env.RESOLVER_ADDRESS || "0xF6b928896E57955727C29d33a3B716C25E10A4e4",
  };
  
  console.log("\n📋 ETHEREUM CONTRACTS:");
  console.log("======================");
  console.log("🏭 Escrow Factory:", ethereumContracts.escrowFactory);
  console.log("🔧 Resolver:", ethereumContracts.resolver);
  
  // Create order ID and timestamp
  const orderId = `eth_dot_order_${Date.now()}`;
  const timestamp = Date.now();
  
  // Example: Maker provides 100 USDC on Ethereum, wants 10 DOT on Polkadot
  const order: AtomicSwapOrder = {
    orderId,
    timestamp,
    
    ethereum: {
      network: networkName,
      chainId,
      rpcUrl: process.env.ETHEREUM_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com"
    },
    
    polkadot: {
      network: "development", // or "polkadot", "kusama", etc.
      wsUrl: process.env.POLKADOT_WS_URL || "ws://localhost:9933"
    },
    
    maker: {
      address: maker.address, // Ethereum address
      polkadotAddress: process.env.POLKADOT_MAKER_ADDRESS || "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY", // Alice's address
      provides: {
        asset: "ERC20",
        amount: ethers.parseUnits("100", 6).toString(), // 100 USDC (6 decimals)
        token: process.env.USDC_ADDRESS || "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        network: "ethereum"
      },
      wants: {
        asset: "DOT",
        amount: ethers.parseUnits("10", 12).toString(), // 10 DOT (12 decimals)
        network: "polkadot",
        address: process.env.POLKADOT_USER_ADDRESS || "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty" // Bob's address
      }
    },
    
    secret,
    hashlock,
    
    timelock: {
      withdrawalPeriod: 0,        // Immediate withdrawal for demo
      publicWithdrawalPeriod: 1800,   // 30 minutes
      cancellationPeriod: 7200,       // 2 hours
      publicCancellationPeriod: 10800  // 3 hours
    },
    
    status: "CREATED",
    
    contracts: {
      ethereum: ethereumContracts,
      polkadot: {
        htlcPallet: "template" // Your HTLC pallet name
      }
    },
    
    safetyDeposit: {
      amount: ethers.parseEther("0.1").toString(), // 0.1 ETH safety deposit
      network: "ethereum"
    }
  };
  
  console.log("\n📋 ORDER DETAILS:");
  console.log("=================");
  console.log("📄 Order ID:", orderId);
  console.log("👤 MAKER (Ethereum):", order.maker.address);
  console.log("👤 MAKER (Polkadot):", order.maker.polkadotAddress);
  console.log("💰 MAKER provides:", ethers.formatUnits(order.maker.provides.amount, 6), "USDC on Ethereum");
  console.log("💰 MAKER wants:", ethers.formatUnits(order.maker.wants.amount, 12), "DOT on Polkadot");
  console.log("🏠 DOT recipient address:", order.maker.wants.address);
  console.log("🛡️ Safety deposit:", ethers.formatEther(order.safetyDeposit.amount), "ETH");
  console.log("⏰ Withdrawal period:", order.timelock.withdrawalPeriod, "seconds (IMMEDIATE!)");
  console.log("⏰ Cancellation period:", order.timelock.cancellationPeriod, "seconds");
  
  // Save order to file
  const ordersDir = path.join(__dirname, "../../orders");
  if (!fs.existsSync(ordersDir)) {
    fs.mkdirSync(ordersDir, { recursive: true });
  }
  
  const orderPath = path.join(ordersDir, `${orderId}.json`);
  fs.writeFileSync(orderPath, JSON.stringify(order, null, 2));
  
  console.log("\n✅ ETHEREUM ↔ POLKADOT ORDER CREATED!");
  console.log("=====================================");
  console.log("📄 Order ID:", orderId);
  console.log("🔑 Secret:", secret);
  console.log("🔒 Hashlock:", hashlock);
  console.log("💾 Order saved to:", orderPath);
  
  // NEW: Auto-fill the order after creation
  console.log("\n🔄 AUTO-FILLING ORDER...");
  console.log("========================");
  
  // Update order status to FILLED
  order.status = "FILLED";
  order.timestamp = Date.now(); // Update timestamp for fill
  
  // Add comprehensive taker and Polkadot HTLC information
  const takerInfo = {
    taker: {
      address: process.env.POLKADOT_TAKER_ADDRESS || "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty", // Bob's address
      ethereumAddress: process.env.ETH_TAKER_ADDRESS || maker.address, // For demo, using same address
      filledAt: Date.now()
    },
    polkadotHTLC: {
      // Simulated Polkadot HTLC creation details
      htlcId: `polkadot_htlc_${Date.now()}`,
      blockHash: "0x" + crypto.randomBytes(32).toString("hex"),
      blockNumber: 1000 + Math.floor(Math.random() * 1000),
      extrinsicHash: "0x" + crypto.randomBytes(32).toString("hex"),
      extrinsicIndex: Math.floor(Math.random() * 10),
      createdAt: Date.now(),
      amount: order.maker.wants.amount,
      asset: order.maker.wants.asset,
      recipient: order.maker.wants.address,
      sender: process.env.POLKADOT_TAKER_ADDRESS || "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
      hashlock: hashlock,
      secret: null, // Will be revealed during swap
      timelock: {
        withdrawalBlock: 1000 + Math.floor(Math.random() * 1000) + 100,
        cancellationBlock: 1000 + Math.floor(Math.random() * 1000) + 300
      },
      status: "CREATED"
    },
    // Add network-specific transaction details
    transactions: {
      polkadot: {
        htlcCreation: {
          hash: "0x" + crypto.randomBytes(32).toString("hex"),
          blockNumber: 1000 + Math.floor(Math.random() * 1000),
          timestamp: Date.now()
        }
      }
    }
  };
  
  // Merge taker info into order
  Object.assign(order, takerInfo);
  
  // Save updated order
  fs.writeFileSync(orderPath, JSON.stringify(order, null, 2));
  
  console.log("✅ ORDER AUTO-FILLED!");
  console.log("====================");
  console.log("📄 Order Status:", order.status);
  console.log("👤 Taker (Polkadot):", takerInfo.taker.address);
  console.log("👤 Taker (Ethereum):", takerInfo.taker.ethereumAddress);
  console.log("🔗 Polkadot HTLC ID:", takerInfo.polkadotHTLC.htlcId);
  console.log("📦 Polkadot Block:", takerInfo.polkadotHTLC.blockNumber);
  console.log("💰 HTLC Amount:", ethers.formatUnits(takerInfo.polkadotHTLC.amount, 12), "DOT");
  console.log("🔒 HTLC Hashlock:", takerInfo.polkadotHTLC.hashlock);
  console.log("⏰ Filled at:", new Date(takerInfo.taker.filledAt).toISOString());
  
  console.log("\n🎯 NEXT STEPS:");
  console.log("==============");
  console.log("1. 🔵 TAKER accepts order and creates Polkadot HTLC:");
  console.log("   ORDER_ID=" + orderId + " npm run taker:create-dot-htlc");
  console.log("2. 🔵 MAKER creates Ethereum escrow (READY TO RUN!):");
  console.log("   ORDER_ID=" + orderId + " npm run create:escrow");
  console.log("3. 💰 Cross-chain atomic swap execution:");
  console.log("   ORDER_ID=" + orderId + " npm run execute:atomic-swap");
  console.log("4. 🔄 Alternative: Use integrated swap manager:");
  console.log("   ORDER_ID=" + orderId + " npm run swap:execute");
  
  console.log("\n🎉 CROSS-CHAIN ATOMIC SWAP READY!");
  console.log("=================================");
  console.log("🔸 Trade:", ethers.formatUnits(order.maker.provides.amount, 6), "USDC ↔", ethers.formatUnits(order.maker.wants.amount, 12), "DOT");
  console.log("🔸 Networks: Ethereum ↔ Polkadot");
  console.log("🔸 Status: FILLED (Ready for escrow creation)");
  console.log("🔸 Withdrawal: IMMEDIATE (0 seconds)");
  console.log("🔸 Safety: 2-hour cancellation period");
  console.log("🔸 Perfect for cross-chain DeFi!");
  
  // Fix 5: Create swap config without BigInt - use regular numbers that can be converted to BigInt later
  const swapConfig = {
    ethAmount: ethers.formatUnits(order.maker.provides.amount, 6), // "100"
    polkadotAmount: ethers.formatUnits(order.maker.wants.amount, 12), // "10"
    safetyDeposit: ethers.formatEther(order.safetyDeposit.amount), // "0.1"
    secret,
    hashlock,
    timelock: {
      // Store as strings that can be converted to BigInt when needed
      dstWithdrawal: order.timelock.withdrawalPeriod.toString(),
      dstPublicWithdrawal: order.timelock.publicWithdrawalPeriod.toString(),
      dstCancellation: order.timelock.cancellationPeriod.toString(),
      dstPublicCancellation: order.timelock.publicCancellationPeriod.toString()
    }
  };
  
  const configPath = path.join(ordersDir, `${orderId}_swap_config.json`);
  // Fix 6: Use the custom replacer for BigInt serialization (though not needed here anymore)
  fs.writeFileSync(configPath, JSON.stringify(swapConfig, bigIntReplacer, 2));
  console.log("⚙️ Swap config saved to:", configPath);
  
  return order;
}

// Additional helper functions for integration

export function loadOrder(orderId: string): AtomicSwapOrder {
  const ordersDir = path.join(__dirname, "../../orders");
  const orderPath = path.join(ordersDir, `${orderId}.json`);
  
  if (!fs.existsSync(orderPath)) {
    throw new Error(`Order ${orderId} not found`);
  }
  
  return JSON.parse(fs.readFileSync(orderPath, 'utf8'));
}

export function loadSwapConfig(orderId: string) {
  const ordersDir = path.join(__dirname, "../../orders");
  const configPath = path.join(ordersDir, `${orderId}_swap_config.json`);
  
  if (!fs.existsSync(configPath)) {
    throw new Error(`Swap config for ${orderId} not found`);
  }
  
  // Fix 7: Use custom reviver to restore BigInt values where needed
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'), bigIntReviver);
  
  // Fix 8: Convert timelock strings back to BigInt for your swap manager
  if (config.timelock) {
    config.timelock.dstWithdrawal = BigInt(config.timelock.dstWithdrawal);
    config.timelock.dstPublicWithdrawal = BigInt(config.timelock.dstPublicWithdrawal);
    config.timelock.dstCancellation = BigInt(config.timelock.dstCancellation);
    config.timelock.dstPublicCancellation = BigInt(config.timelock.dstPublicCancellation);
  }
  
  return config;
}

export function updateOrderStatus(orderId: string, status: AtomicSwapOrder['status'], additionalData?: any) {
  const order = loadOrder(orderId);
  order.status = status;
  order.timestamp = Date.now(); // Update timestamp
  
  if (additionalData) {
    Object.assign(order, additionalData);
  }
  
  const ordersDir = path.join(__dirname, "../../orders");
  const orderPath = path.join(ordersDir, `${orderId}.json`);
  fs.writeFileSync(orderPath, JSON.stringify(order, bigIntReplacer, 2));
  
  console.log(`📄 Order ${orderId} status updated to: ${status}`);
}

// Integration function to execute swap using your existing CrossChainSwapManager
export async function executeOrderWithSwapManager(orderId: string) {
  const { CrossChainSwapManager } = await import('./swap');
  
  const order = loadOrder(orderId);
  const swapConfig = loadSwapConfig(orderId);
  
  // Configure networks based on order
  const ethConfig = {
    rpcUrl: order.ethereum.rpcUrl,
    chainId: order.ethereum.chainId,
    escrowFactory: order.contracts.ethereum.escrowFactory,
    resolver: order.contracts.ethereum.resolver,
    userPrivateKey: process.env.ETH_USER_PRIVATE_KEY!,
    resolverPrivateKey: process.env.ETH_RESOLVER_PRIVATE_KEY!,
    tokens: {
      USDC: {
        address: order.maker.provides.token!,
        decimals: 6
      }
    }
  };
  
  const polkadotConfig = {
    wsUrl: order.polkadot.wsUrl,
    userSeed: process.env.POLKADOT_USER_SEED || '//Alice',
    resolverSeed: process.env.POLKADOT_RESOLVER_SEED || '//Bob',
    tokens: {
      DOT: {
        decimals: 12
      }
    }
  };
  
  // FIX: Pass the orderId as the third argument to CrossChainSwapManager constructor
  const swapManager = new CrossChainSwapManager(ethConfig, polkadotConfig, orderId);
  
  try {
    updateOrderStatus(orderId, "FILLED");
    
    await swapManager.initialize();
    
    // Convert swapConfig to the expected SwapParameters format
    const swapParameters = {
      ethAmount: swapConfig.ethAmount,
      ethToken: 'USDC', // Default token
      polkadotAmount: swapConfig.polkadotAmount,
      polkadotToken: 'DOT', // Default token
      safetyDeposit: swapConfig.safetyDeposit,
      timelock: {
        dstWithdrawal: swapConfig.timelock.dstWithdrawal,
        dstPublicWithdrawal: swapConfig.timelock.dstPublicWithdrawal,
        dstCancellation: swapConfig.timelock.dstCancellation,
        dstPublicCancellation: swapConfig.timelock.dstPublicCancellation
      }
    };
    
    await swapManager.executeSwap(swapParameters);
    
    updateOrderStatus(orderId, "COMPLETED");
    console.log(`✅ Order ${orderId} completed successfully!`);
    
  } catch (error) {
    // Fix 2: Proper error handling with type assertion
    const errorMessage = error instanceof Error ? error.message : String(error);
    updateOrderStatus(orderId, "CANCELLED", { error: errorMessage });
    console.error(`❌ Order ${orderId} failed:`, error);
    throw error;
  } finally {
    await swapManager.cleanup();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export default main;