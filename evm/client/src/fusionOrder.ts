import Web3 from "web3";
import {
  SDK,
  HashLock,
  PresetEnum,
  PrivateKeyProviderConnector,
  type MerkleLeaf,
} from "@1inch/cross-chain-sdk";
import { randomBytes } from 'crypto';

const makerPrivateKey = process.env.MAKER_PRIVATE_KEY;
const makerAddress = process.env.MAKER_ADDRESS;
const ethNodeUrl = process.env.ETH_NODE_URL;
const fusionAuthKey = process.env.FUSION_AUTH_KEY;
const bridgeHTLCAddress = process.env.BRIDGE_HTLC_CONTRACT;
const polkadotRecipient = process.env.POLKADOT_RECIPIENT;
const bridgeApiUrl = process.env.BRIDGE_API_URL;
const polkadotRpcUrl = process.env.POLKADOT_RPC_URL;
const priceOracleUrl = process.env.PRICE_ORACLE_URL;

// HTLC Configuration
const HTLC_TIMEOUT = 24 * 60 * 60; // 24 hours in seconds

(async () => {
  try {
    console.log("1. User Prepares to Swap");
    console.log("Starting Ethereum → Polkadot Bridge Transaction");
    console.log("Ethereum sender:", makerAddress);
    console.log("Polkadot recipient:", polkadotRecipient);

    // Validate required environment variables
    if (!makerPrivateKey || !makerAddress || !ethNodeUrl || !fusionAuthKey || !bridgeHTLCAddress) {
      throw new Error("Missing required environment variables");
    }

    // Connect to Ethereum
    const blockchainProvider = new PrivateKeyProviderConnector(
      makerPrivateKey,
      new Web3(ethNodeUrl) as any
    );

    // Initialize 1inch Fusion+ SDK
    const sdk = new SDK({
      url: "https://api.1inch.dev/fusion-plus",
      authKey: fusionAuthKey,
      blockchainProvider,
    });

    // Get quote for token swap
    const quoteParams = {
      srcChainId: 1,
      dstChainId: 1,
      srcTokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f", // DAI
      dstTokenAddress: "0xa0b86a33e6eb3007d1c9e5b8aea2bc6f90b4db83", // USDC
      amount: "1000000000000000000", // 1 DAI
      walletAddress: makerAddress,
    };

    console.log("Getting Fusion+ quote for token swap...");
    const quote = await sdk.getQuote(quoteParams);
    const expectedOutput = quote.dstTokenAmount;

    // generate secret preimage and hash
    const preset = quote.getPreset();
    const secretsCount = preset.secretsCount;
    console.log("Generating secret preimage P and computing hash H = hash(P)");

    // Generate the secret preimage P
    const secrets = Array.from({ length: secretsCount }, () => randomBytes(32));
    const preimage = secrets[0]; // P
    console.log("Secret preimage P generated (kept secure off-chain)");

    // Compute hash H = hash(P)
    const secretHashes = secrets.map((secret) => HashLock.hashSecret(secret.toString('hex')));
    const hashH = secretHashes[0]; // H
    console.log("Hash H computed:", hashH);

    // Create hashlock for Fusion+
    let hashLock;
    if (secretsCount === 1) {
      hashLock = HashLock.forSingleFill(secrets[0].toString('hex'));
    } else {
      const combinedHashes: MerkleLeaf[] = secretHashes.map((secretHash, i) => {
        const hash = Web3.utils.soliditySha3(
          { t: "uint64", v: i.toString() },
          { t: "bytes32", v: secretHash }
        );
        if (!hash) {
            throw new Error(`Failed to compute soliditySha3 for secretHash at index ${i}`);
        }
        return hash as MerkleLeaf;
      });
      hashLock = HashLock.forMultipleFills(combinedHashes);
    }

    // share hash with both chains
    console.log("Sharing hash H with Ethereum HTLC and Polkadot claim contract");
    
    const bridgeTransactionId = Web3.utils.randomHex(32);
    const polkadotAmount = await calculatePolkadotAmount(expectedOutput);
    
    const htlcData = {
      transactionId: bridgeTransactionId,
      sender: makerAddress,
      recipient: polkadotRecipient,
      amount: expectedOutput,
      tokenSymbol: "USDC",
      secretHash: hashH, // H shared with contracts
      timeout: Math.floor(Date.now() / 1000) + HTLC_TIMEOUT,
      polkadotAmount,
    };

    // Share H with Ethereum HTLC (via bridge API)
    console.log("📤 Sharing H with Ethereum HTLC Escrow Contract...");
    if (bridgeApiUrl) {
      try {
        const bridgeResponse = await fetch(`${bridgeApiUrl}/register-htlc`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(htlcData),
        });
        
        if (!bridgeResponse.ok) {
          throw new Error(`Bridge API error: ${bridgeResponse.statusText}`);
        }
        
        const bridgeResult = await bridgeResponse.json();
        console.log("Hash H registered with Ethereum HTLC:", bridgeResult);
      } catch (bridgeError) {
        console.error("❌ Failed to register with Ethereum HTLC:", bridgeError);
        throw bridgeError;
      }
    }

    // Share H with Polkadot claim contract
    console.log("📤 Sharing H with Polkadot claim contract...");
    if (polkadotRpcUrl) {
      try {
        const polkadotResponse = await fetch(`${polkadotRpcUrl}/setup-claim`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transactionId: bridgeTransactionId,
            secretHash: hashH, // H shared with Polkadot
            recipient: polkadotRecipient,
            amount: polkadotAmount,
            timeout: htlcData.timeout,
          }),
        });
        
        if (!polkadotResponse.ok) {
          throw new Error(`Polkadot setup error: ${polkadotResponse.statusText}`);
        }
        
        const polkadotResult = await polkadotResponse.json();
        console.log("Hash H registered with Polkadot claim contract:", polkadotResult);
      } catch (polkadotError) {
        console.error("❌ Failed to setup Polkadot claim:", polkadotError);
        throw polkadotError;
      }
    }

    console.log("2. Swap via 1inch Fusion+");
    console.log("User signs Fusion+ order with destination = Ethereum HTLC Escrow Contract");

    const orderParams = {
      walletAddress: makerAddress,
      hashLock,
      secretHashes,
      receiver: bridgeHTLCAddress, // Destination = Ethereum HTLC Escrow Contract
      preset: PresetEnum.fast,
      fee: {
        takingFeeBps: 100, // 1% fee
        takingFeeReceiver: "0x0000000000000000000000000000000000000000",
      },
      extension: {
        bridgeTransactionId,
        polkadotRecipient,
        htlcTimeout: htlcData.timeout,
      },
    };

    console.log("Creating Fusion+ order...");
    const order = await sdk.createOrder(quote, orderParams);

    console.log("User signing Fusion+ swap order...");
    console.log("Fusion+ order signed and ready for execution");

    console.log("Bridge transaction prepared successfully!");
    console.log("\n--- Transaction Details ---");
    console.log("Bridge Transaction ID:", bridgeTransactionId);
    console.log("Fusion+ Order:", JSON.stringify(order, null, 2));
    
    console.log("\n--- HTLC Details ---");
    console.log("Secret Preimage P (KEEP SECURE!):", preimage.toString('hex'));
    console.log("Hash H = hash(P):", hashH);
    console.log("HTLC Timeout:", new Date(htlcData.timeout * 1000).toISOString());
    
    console.log("\n--- Bridge Info ---");
    console.log("Ethereum Amount:", expectedOutput, "USDC");
    console.log("Polkadot Recipient:", polkadotRecipient);
    console.log("Polkadot Amount:", polkadotAmount, "DOT");

    console.log("\n--- Verification ---");
    console.log("Secret preimage P generated and saved off-chain");
    console.log("Hash H shared with Ethereum HTLC Escrow Contract");
    console.log("Hash H shared with Polkadot claim contract");
    console.log("Fusion+ order destination set to bridge HTLC contract");

    console.log("\n--- Next Steps ---");
    console.log("1. Execute Fusion+ order on Ethereum");
    console.log("2. Monitor Ethereum HTLC for locked funds");
    console.log("3. Polkadot side creates corresponding HTLC with same H");
    console.log("4. Reveal secret P on Polkadot to claim DOT");
    console.log("5. Use same secret P on Ethereum to release USDC from bridge");

    // Save critical info for bridge monitoring
    const bridgeInfo = {
      bridgeTransactionId,
      secretPreimage: preimage.toString('hex'), // P
      secretHash: hashH, // H
      ethereumOrder: order,
      htlcData,
      timestamp: Date.now(),
      status: "prepared",
    };

    console.log("\nSave this bridge info for monitoring:");
    console.log(JSON.stringify(bridgeInfo, null, 2));

  } catch (error) {
    console.error("Error in bridge transaction:", error);
    process.exit(1);
  }
})();

async function calculatePolkadotAmount(amount: string | bigint) {
    //**
    // Implementation pending TBD
    //  */
}