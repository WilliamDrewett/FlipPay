import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { decodeAddress } from "@polkadot/util-crypto";

dotenv.config();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const RPC_URL = process.env.RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

const ABI = [
    {
      inputs: [
        {
          components: [
            { internalType: "bytes32", name: "orderHash", type: "bytes32" },
            { internalType: "bytes32", name: "hashlock", type: "bytes32" },
            { internalType: "address", name: "maker", type: "address" },      // Changed back to address
            { internalType: "address", name: "taker", type: "address" },      // Changed back to address
            { internalType: "address", name: "token", type: "address" },      // Changed back to address
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "safetyDeposit", type: "uint256" },
            { internalType: "uint256", name: "timelocks", type: "uint256" },
          ],
          internalType: "struct IBaseEscrow.Immutables",
          name: "dstImmutables",
          type: "tuple",
        },
        {
          internalType: "uint256",
          name: "srcCancellationTimestamp",
          type: "uint256",
        },
      ],
      name: "createDstEscrow",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          components: [
            { internalType: "bytes32", name: "orderHash", type: "bytes32" },
            { internalType: "bytes32", name: "hashlock", type: "bytes32" },
            { internalType: "address", name: "maker", type: "address" },      // Changed back to address
            { internalType: "address", name: "taker", type: "address" },      // Changed back to address
            { internalType: "address", name: "token", type: "address" },      // Changed back to address
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "safetyDeposit", type: "uint256" },
            { internalType: "uint256", name: "timelocks", type: "uint256" }
          ],
          internalType: "struct IBaseEscrow.Immutables",
          name: "immutables",
          type: "tuple"
        }
      ],
      name: "addressOfEscrowDst",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    },
    {
      inputs: [],
      name: "ESCROW_DST_IMPLEMENTATION",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function"
    }
];

// Helper function to create a simple timelocks value
function createSimpleTimelocks(currentTimestamp: number): bigint {
  // Pack deployment timestamp at high bits (224-255)
  const deployedAt = BigInt(currentTimestamp) << 224n;
  
  // Use much simpler timelock values (in seconds from deployment)
  // Each stage gets 32 bits (0-31, 32-63, etc.)
  const timeouts = [
    3600n,   // Stage 0: SrcWithdrawal (1 hour)
    7200n,   // Stage 1: SrcPublicWithdrawal (2 hours)  
    10800n,  // Stage 2: SrcCancellation (3 hours)
    14400n,  // Stage 3: SrcPublicCancellation (4 hours)
    1800n,   // Stage 4: DstWithdrawal (30 minutes)
    3600n,   // Stage 5: DstPublicWithdrawal (1 hour)
    7200n    // Stage 6: DstCancellation (2 hours)
  ];
  
  let packed = deployedAt;
  for (let i = 0; i < timeouts.length; i++) {
    packed |= timeouts[i] << BigInt(i * 32);
  }
  
  return packed;
}

async function testAddressComputation(contract: ethers.Contract, baseImmutables: any) {
  const testCases = [
    { name: "Zero timelocks", timelocks: 0n },
    { name: "Simple timestamp", timelocks: BigInt(Math.floor(Date.now() / 1000)) },
    { name: "Packed timelocks", timelocks: createSimpleTimelocks(Math.floor(Date.now() / 1000)) }
  ];
  
  for (const testCase of testCases) {
    try {
      const testImmutables = {
        ...baseImmutables,
        timelocks: testCase.timelocks
      };
      
      console.log(`🧪 Testing ${testCase.name}...`);
      const address = await contract.addressOfEscrowDst(testImmutables);
      console.log(`✅ Success! Address: ${address}`);
      return { immutables: testImmutables, address };
    } catch (err: any) {
      console.log(`❌ ${testCase.name} failed: ${err.message?.slice(0, 100)}...`);
    }
  }
  
  return null;
}

async function main() {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

    const maker = wallet.address;
    console.log("🔑 Maker address:", maker);

    const takerSs58 = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
    console.log("🎯 Taker (Polkadot SS58) address:", takerSs58);

    // Method 1: Try direct conversion
    let taker: string;
    try {
      const decoded = decodeAddress(takerSs58);
      const truncated = decoded.slice(0, 20);
      taker = ethers.getAddress(ethers.hexlify(truncated));
      console.log("🏷️ Taker as Ethereum address:", taker);
    } catch (err) {
      console.error("❌ Error decoding taker address, using maker as fallback:", err);
      taker = maker; // Use maker as both for testing
    }

    // Generate unique identifiers
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const secret = `secret_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log("🆔 Order ID:", orderId);
    console.log("🔐 Secret:", secret);

    // Create immutables with standard address types
    const baseImmutables = {
      orderHash: ethers.keccak256(ethers.toUtf8Bytes(orderId)),
      hashlock: ethers.keccak256(ethers.toUtf8Bytes(secret)),
      maker: maker,                               // Keep as address string
      taker: taker,                               // Keep as address string
      token: ethers.ZeroAddress,                  // Use proper zero address
      amount: ethers.parseEther("0.01"),
      safetyDeposit: ethers.parseEther("0.01"),
    };

    console.log("📜 Base immutables:", {
      ...baseImmutables,
      amount: ethers.formatEther(baseImmutables.amount) + " ETH",
      safetyDeposit: ethers.formatEther(baseImmutables.safetyDeposit) + " ETH",
    });

    // Check implementation
    try {
      const implementation = await contract.ESCROW_DST_IMPLEMENTATION();
      console.log("🏗️ DST Implementation address:", implementation);
      
      const implCode = await provider.getCode(implementation);
      if (implCode === "0x") {
        console.error("❌ DST Implementation contract not deployed!");
        return;
      }
      console.log("✅ DST Implementation contract exists");
    } catch (err: any) {
      console.log("⚠️ Could not fetch implementation address:", err.message);
    }

    // Test address computation
    console.log("🔍 Testing addressOfEscrowDst...");
    const result = await testAddressComputation(contract, baseImmutables);
    
    if (!result) {
      console.error("❌ Could not compute escrow address with any timelock variation");
      console.log("💡 This suggests the contract might have different requirements or the ABI might be incorrect");
      
      // Try to inspect the actual contract
      try {
        console.log("🔍 Attempting to get contract bytecode...");
        const contractCode = await provider.getCode(CONTRACT_ADDRESS);
        console.log("📊 Contract bytecode length:", contractCode.length);
        if (contractCode === "0x") {
          console.error("❌ Contract not deployed at the specified address!");
          return;
        }
      } catch (err) {
        console.error("❌ Could not fetch contract bytecode");
      }
      
      return;
    }

    const { immutables: dstImmutables, address: expectedEscrowAddress } = result;
    
    // Check if escrow already exists
    const code = await provider.getCode(expectedEscrowAddress);
    if (code !== "0x") {
      console.log("🚨 Escrow already deployed at:", expectedEscrowAddress);
      console.log("💡 You might want to use a different order ID");
      return;
    }

    console.log("📍 Expected escrow address:", expectedEscrowAddress);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const srcCancellationTimestamp = currentTimestamp + 7200; // 2 hours from now
    console.log("⏰ Current timestamp:", currentTimestamp);
    console.log("⏰ srcCancellationTimestamp:", srcCancellationTimestamp);

    const nativeAmount = dstImmutables.amount + dstImmutables.safetyDeposit;
    console.log("💰 Native amount required:", ethers.formatEther(nativeAmount), "ETH");

    // Check wallet balance
    const balance = await provider.getBalance(wallet.address);
    console.log("💳 Wallet balance:", ethers.formatEther(balance), "ETH");
    
    if (balance < nativeAmount) {
      console.error("❌ Insufficient balance! Required:", ethers.formatEther(nativeAmount), "ETH");
      return;
    }

    // Try gas estimation with better error handling
    let gasLimit = 500000n;
    try {
      const gasEstimate = await contract.createDstEscrow.estimateGas(
        dstImmutables, 
        srcCancellationTimestamp, 
        { value: nativeAmount }
      );
      gasLimit = gasEstimate * 120n / 100n; // Add 20% buffer
      console.log("⛽ Estimated gas:", gasEstimate.toString());
      console.log("⛽ Gas limit (with buffer):", gasLimit.toString());
    } catch (gasErr: any) {
      console.error("❌ Gas estimation failed:", gasErr.message);
      
      // Try to get the revert reason
      if (gasErr.data) {
        console.log("📊 Error data:", gasErr.data);
      }
      
      // Check if it's a specific revert reason
      if (gasErr.message.includes("execution reverted")) {
        console.log("💡 The transaction would revert. Common causes:");
        console.log("   - Incorrect timelocks format");
        console.log("   - Contract state issues");
        console.log("   - Insufficient funds");
        console.log("   - Invalid addresses");
      }
      
      console.log("🔄 Proceeding with default gas limit anyway...");
    }

    console.log("\n🚀 Final attempt with createDstEscrow...");
    console.log("📝 Parameters:");
    console.log("   dstImmutables:", JSON.stringify(dstImmutables, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value, 2));
    console.log("   srcCancellationTimestamp:", srcCancellationTimestamp);
    console.log("   value:", ethers.formatEther(nativeAmount), "ETH");

    try {
      const tx = await contract.createDstEscrow(
        dstImmutables, 
        srcCancellationTimestamp, 
        {
          value: nativeAmount,
          gasLimit: gasLimit,
        }
      );

      console.log("📤 Transaction sent:", tx.hash);
      console.log("⏳ Waiting for confirmation...");
      
      const receipt = await tx.wait();
      
      if (receipt && receipt.status === 1) {
        console.log("✅ Transaction successful!");
        console.log("📦 Block number:", receipt.blockNumber);
        console.log("⛽ Gas used:", receipt.gasUsed.toString());
        console.log("📍 Escrow should be deployed at:", expectedEscrowAddress);
        
        // Verify the escrow was actually deployed
        const newCode = await provider.getCode(expectedEscrowAddress);
        if (newCode !== "0x") {
          console.log("🎉 Escrow contract successfully deployed!");
        } else {
          console.log("⚠️ Transaction succeeded but escrow not found at expected address");
        }
      } else {
        console.log("❌ Transaction failed with status:", receipt?.status);
      }

    } catch (txErr: any) {
      console.error("🛑 Transaction failed:", txErr.message);
      
      if (txErr.receipt) {
        console.log("📊 Transaction was mined but failed");
        console.log("⛽ Gas used:", txErr.receipt.gasUsed?.toString());
      }
      
      if (txErr.data) {
        console.log("📊 Error data:", txErr.data);
      }
    }

  } catch (err: any) {
    console.error("🛑 Script failed:", err.message);
    console.error("🔍 Stack trace:", err.stack);
  }
}

// Add some helper debugging functions
async function debugContract() {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    
    console.log("🔍 Contract debugging info:");
    console.log("   Address:", CONTRACT_ADDRESS);
    
    const code = await provider.getCode(CONTRACT_ADDRESS);
    console.log("   Bytecode length:", code.length);
    console.log("   Is deployed:", code !== "0x");
    
    try {
      const impl = await contract.ESCROW_DST_IMPLEMENTATION();
      console.log("   Implementation:", impl);
    } catch (e) {
      console.log("   Implementation: Could not fetch");
    }
  } catch (err) {
    console.error("Debug failed:", err);
  }
}

// Export for debugging
export { debugContract };

main().catch(console.error);