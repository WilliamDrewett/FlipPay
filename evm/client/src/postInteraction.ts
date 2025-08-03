import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const RPC_URL = process.env.RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

// 1inch Order structure and PostInteraction ABI
const ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "uint256", name: "maker", type: "uint256" },
          { internalType: "uint256", name: "receiver", type: "uint256" },
          { internalType: "uint256", name: "makerAsset", type: "uint256" },
          { internalType: "uint256", name: "takerAsset", type: "uint256" },
          { internalType: "uint256", name: "makingAmount", type: "uint256" },
          { internalType: "uint256", name: "takingAmount", type: "uint256" },
          { internalType: "uint256", name: "makerTraits", type: "uint256" },
          { internalType: "bytes", name: "extension", type: "bytes" }
        ],
        internalType: "struct Order",
        name: "order",
        type: "tuple"
      },
      { internalType: "bytes32", name: "orderHash", type: "bytes32" },
      { internalType: "address", name: "taker", type: "address" },
      { internalType: "uint256", name: "makingAmount", type: "uint256" },
      { internalType: "uint256", name: "takingAmount", type: "uint256" },
      { internalType: "uint256", name: "remainingMakingAmount", type: "uint256" },
      { internalType: "bytes", name: "extraData", type: "bytes" }
    ],
    name: "postInteraction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  // Helper functions for testing
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "salt", type: "uint256" },
          { internalType: "uint256", name: "maker", type: "uint256" },
          { internalType: "uint256", name: "receiver", type: "uint256" },
          { internalType: "uint256", name: "makerAsset", type: "uint256" },
          { internalType: "uint256", name: "takerAsset", type: "uint256" },
          { internalType: "uint256", name: "makingAmount", type: "uint256" },
          { internalType: "uint256", name: "takingAmount", type: "uint256" },
          { internalType: "uint256", name: "makerTraits", type: "uint256" },
          { internalType: "bytes", name: "extension", type: "bytes" }
        ],
        internalType: "struct Order",
        name: "order",
        type: "tuple"
      }
    ],
    name: "hashOrder",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function"
  }
];

// Order interface for TypeScript
interface Order {
  salt: bigint;
  maker: bigint;
  receiver: bigint;
  makerAsset: bigint;
  takerAsset: bigint;
  makingAmount: bigint;
  takingAmount: bigint;
  makerTraits: bigint;
  extension: string;
}

// PostInteraction parameters interface
interface PostInteractionParams {
  order: Order;
  orderHash: string;
  taker: string;
  makingAmount: bigint;
  takingAmount: bigint;
  remainingMakingAmount: bigint;
  extraData: string;
}

// Helper function to convert address to uint256
function addressToUint256(address: string): bigint {
  return BigInt(address);
}

// Helper function to format uint256 as address for display
function uint256ToAddress(value: bigint): string {
  return ethers.getAddress(`0x${value.toString(16).padStart(40, '0')}`);
}

// Generate sample order data
function generateSampleOrder(maker: string, receiver: string): Order {
  const timestamp = Math.floor(Date.now() / 1000);
  
  return {
    salt: BigInt(timestamp) * 1000000n + BigInt(Math.floor(Math.random() * 1000000)),
    maker: addressToUint256(maker),
    receiver: addressToUint256(receiver),
    makerAsset: addressToUint256(ethers.ZeroAddress), // Native ETH
    takerAsset: addressToUint256(ethers.ZeroAddress), // Native ETH for simplicity
    makingAmount: ethers.parseEther("1.0"), // 1 ETH
    takingAmount: ethers.parseEther("0.95"), // 0.95 ETH (with some slippage)
    makerTraits: 0n, // Simple traits, no special flags
    extension: "0x" // Empty extension
  };
}

// Generate order hash (simplified version)
function generateOrderHash(order: Order): string {
  // In a real implementation, this should match the contract's hash function
  // For demo purposes, we'll create a hash from order parameters
  const encoded = ethers.AbiCoder.defaultAbiCoder().encode(
    ["uint256", "uint256", "uint256", "uint256", "uint256", "uint256", "uint256", "uint256", "bytes"],
    [
      order.salt,
      order.maker,
      order.receiver,
      order.makerAsset,
      order.takerAsset,
      order.makingAmount,
      order.takingAmount,
      order.makerTraits,
      order.extension
    ]
  );
  return ethers.keccak256(encoded);
}

// Main function
async function main() {
  try {
    console.log("🚀 Starting 1inch PostInteraction Script");
    console.log("=" .repeat(50));

    // Setup provider and wallet
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    console.log("🔑 Wallet address:", wallet.address);
    console.log("📝 Contract address:", CONTRACT_ADDRESS);
    console.log("🌐 Network RPC:", RPC_URL);

    // Verify contract exists
    const contractCode = await provider.getCode(CONTRACT_ADDRESS);
    if (contractCode === "0x") {
      console.error("❌ No contract found at the specified address!");
      return;
    }
    console.log("✅ Contract deployed at address");

    // Check wallet balance
    const balance = await provider.getBalance(wallet.address);
    console.log("💰 Wallet balance:", ethers.formatEther(balance), "ETH");

    // Generate sample order data
    const maker = wallet.address;
    const receiver = wallet.address; // For simplicity, maker is also receiver
    
    // Use a well-known address with proper checksum, or generate a random one
    let taker: string;
    try {
      // Try using a well-known address (Uniswap V2 Router)
      taker = ethers.getAddress("0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    } catch (err) {
      // Fallback: use wallet address as taker for testing
      console.log("⚠️  Using wallet address as taker for testing");
      taker = wallet.address;
    }

    console.log("\n📋 Generating sample order...");
    const order = generateSampleOrder(maker, receiver);
    
    // Display order details
    console.log("📊 Order Details:");
    console.log("   Salt:", order.salt.toString());
    console.log("   Maker:", uint256ToAddress(order.maker));
    console.log("   Receiver:", uint256ToAddress(order.receiver));
    console.log("   Maker Asset:", uint256ToAddress(order.makerAsset));
    console.log("   Taker Asset:", uint256ToAddress(order.takerAsset));
    console.log("   Making Amount:", ethers.formatEther(order.makingAmount), "ETH");
    console.log("   Taking Amount:", ethers.formatEther(order.takingAmount), "ETH");
    console.log("   Maker Traits:", order.makerTraits.toString());
    console.log("   Extension:", order.extension);

    // Generate order hash
    let orderHash: string;
    try {
      // Try to use contract's hash function if available
      orderHash = await contract.hashOrder(order);
      console.log("✅ Order hash from contract:", orderHash);
    } catch (err) {
      // Fallback to our own hash generation
      orderHash = generateOrderHash(order);
      console.log("📝 Generated order hash:", orderHash);
      console.log("⚠️  Note: Using fallback hash generation (contract method not available)");
    }

    // Prepare post-interaction parameters
    const postInteractionParams: PostInteractionParams = {
      order: order,
      orderHash: orderHash,
      taker: taker,
      makingAmount: order.makingAmount, // Full amount
      takingAmount: order.takingAmount, // Full amount
      remainingMakingAmount: 0n, // Fully filled
      extraData: "0x" // Empty extra data
    };

    console.log("\n🎯 Post-Interaction Parameters:");
    console.log("   Order Hash:", postInteractionParams.orderHash);
    console.log("   Taker:", postInteractionParams.taker);
    console.log("   Making Amount:", ethers.formatEther(postInteractionParams.makingAmount), "ETH");
    console.log("   Taking Amount:", ethers.formatEther(postInteractionParams.takingAmount), "ETH");
    console.log("   Remaining Making Amount:", ethers.formatEther(postInteractionParams.remainingMakingAmount), "ETH");
    console.log("   Extra Data:", postInteractionParams.extraData);

    // Estimate gas
    console.log("\n⛽ Estimating gas...");
    try {
      const gasEstimate = await contract.postInteraction.estimateGas(
        postInteractionParams.order,
        postInteractionParams.orderHash,
        postInteractionParams.taker,
        postInteractionParams.makingAmount,
        postInteractionParams.takingAmount,
        postInteractionParams.remainingMakingAmount,
        postInteractionParams.extraData
      );
      
      const gasLimit = gasEstimate * 120n / 100n; // Add 20% buffer
      console.log("📊 Estimated gas:", gasEstimate.toString());
      console.log("📊 Gas limit (with buffer):", gasLimit.toString());

      // Execute the post-interaction
      console.log("\n🚀 Executing postInteraction...");
      const tx = await contract.postInteraction(
        postInteractionParams.order,
        postInteractionParams.orderHash,
        postInteractionParams.taker,
        postInteractionParams.makingAmount,
        postInteractionParams.takingAmount,
        postInteractionParams.remainingMakingAmount,
        postInteractionParams.extraData,
        {
          gasLimit: gasLimit
        }
      );

      console.log("📤 Transaction sent:", tx.hash);
      console.log("⏳ Waiting for confirmation...");

      const receipt = await tx.wait();

      if (receipt && receipt.status === 1) {
        console.log("✅ Transaction successful!");
        console.log("📦 Block number:", receipt.blockNumber);
        console.log("⛽ Gas used:", receipt.gasUsed.toString());
        
        // Display transaction logs
        if (receipt.logs && receipt.logs.length > 0) {
          console.log("\n📋 Transaction Logs:");
          receipt.logs.forEach((log: { address: any; topics: any; data: any; }, index: any) => {
            console.log(`   Log ${index}:`, {
              address: log.address,
              topics: log.topics,
              data: log.data
            });
          });
        }
      } else {
        console.log("❌ Transaction failed with status:", receipt?.status);
      }

    } catch (gasErr: any) {
      console.error("❌ Gas estimation failed:", gasErr.message);
      
      if (gasErr.data) {
        console.log("📊 Error data:", gasErr.data);
      }
      
      // Common error analysis
      if (gasErr.message.includes("execution reverted")) {
        console.log("\n💡 Common PostInteraction failure reasons:");
        console.log("   - Order already processed");
        console.log("   - Invalid order signature");
        console.log("   - Insufficient allowances");
        console.log("   - Order expired");
        console.log("   - Invalid taker address");
        console.log("   - Amounts don't match order parameters");
        console.log("   - Contract doesn't implement postInteraction");
      }
      
      if (gasErr.message.includes("bad address checksum")) {
        console.log("\n💡 Address checksum error:");
        console.log("   - One of the addresses has invalid checksum");
        console.log("   - Try using ethers.getAddress() to fix checksums");
      }
      
      // Try with a different taker address
      console.log("\n🔄 Trying with wallet address as taker...");
      try {
        const fallbackParams = {
          ...postInteractionParams,
          taker: wallet.address
        };
        
        const fallbackGasEstimate = await contract.postInteraction.estimateGas(
          fallbackParams.order,
          fallbackParams.orderHash,
          fallbackParams.taker,
          fallbackParams.makingAmount,
          fallbackParams.takingAmount,
          fallbackParams.remainingMakingAmount,
          fallbackParams.extraData
        );
        
        console.log("✅ Fallback gas estimation successful:", fallbackGasEstimate.toString());
        console.log("💡 The issue might be with the specific taker address");
        
      } catch (fallbackErr: any) {
        console.log("❌ Fallback also failed:", fallbackErr.message);
      }
    }

  } catch (err: any) {
    console.error("🛑 Script failed:", err.message);
    console.error("🔍 Stack trace:", err.stack);
  }
}

// Utility function to create custom order
export function createCustomOrder(params: {
  salt?: bigint;
  maker: string;
  receiver: string;
  makerAsset: string;
  takerAsset: string;
  makingAmount: bigint;
  takingAmount: bigint;
  makerTraits?: bigint;
  extension?: string;
}): Order {
  return {
    salt: params.salt ?? BigInt(Date.now()) * 1000000n + BigInt(Math.floor(Math.random() * 1000000)),
    maker: addressToUint256(params.maker),
    receiver: addressToUint256(params.receiver),
    makerAsset: addressToUint256(params.makerAsset),
    takerAsset: addressToUint256(params.takerAsset),
    makingAmount: params.makingAmount,
    takingAmount: params.takingAmount,
    makerTraits: params.makerTraits ?? 0n,
    extension: params.extension ?? "0x"
  };
}

// Utility function for partial fills
export function createPartialFillParams(
  order: Order,
  orderHash: string,
  taker: string,
  fillPercentage: number, // 0-100
  extraData: string = "0x"
): PostInteractionParams {
  const fillAmount = order.makingAmount * BigInt(fillPercentage) / 100n;
  const takingAmount = order.takingAmount * BigInt(fillPercentage) / 100n;
  
  return {
    order,
    orderHash,
    taker,
    makingAmount: fillAmount,
    takingAmount: takingAmount,
    remainingMakingAmount: order.makingAmount - fillAmount,
    extraData
  };
}

// Export types and utilities
export { Order, PostInteractionParams, addressToUint256, uint256ToAddress };

main().catch(console.error);