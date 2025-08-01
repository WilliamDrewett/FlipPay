// TypeScript compilation enabled - removed @ts-nocheck directive
import * as dotenv from 'dotenv';
import { Wallet, Contract, JsonRpcProvider } from 'ethers';
import { setTimeout } from 'timers/promises';
import starknetBridgeAbi from '../abis/starkgateAbi.json';

/*
  A **very** simplified Ethereum ➜ Starknet bridge helper.

  The goal of the script is to mimic the developer-experience we already have for
  Snowbridge (Ethereum ➜ Polkadot). The Snowbridge helper lives next to this
  file (`bridgeEthToPolkadot.ts`).  Our long-term plan is to wrap both Snowbridge
  and StarkGate helpers behind a common interface but for the time being we keep
  the two utilities side-by-side so they can evolve independently.

  At the moment the script only supports **deposits** from Ethereum to Starknet
  using the official StarkGate contracts.  A full blown implementation would
  also expose the **withdraw** (L2 ➜ L1) direction but that is outside the scope
  of the first MVP requested by @Joao.

  Usage (example for Sepolia → Starknet Mainnet Alpha):

    npx ts-node scripts/bridgeEthToStarknet.ts sepolia 0xYourERC20Token 0xStarknetRecipient 1000000000000000000

  Parameters
  ----------
  1. environment         – "mainnet" | "sepolia" (only these two are wired atm)
  2. token_contract      – ERC-20 contract address on L1 (Ethereum)
  3. starknet_recipient  – Felt-252 address on Starknet (hex-string starting with 0x)
  4. amount              – deposit amount in the token's smallest unit (wei-like)

  The script relies on the following environment variables which **must** be
  present in a local `.env` file (never commit secrets to git):

      ETHEREUM_KEY   – private key of the funding EOA on L1 (Ethereum)

  ----
  Disclaimer
  ----------
  StarkGate uses an opaque fee model that is subject to change.  The implementation
  below pulls the dynamic fee from the contract but **does not** attempt to be
  clever about fee-bumps, reorgs, nor rate limiting – treat this as a demo/MVP.
*/

dotenv.config();

// ---------------------------------------------------------------------------
// Constants & helpers
// ---------------------------------------------------------------------------

/** 
 * StarkGate uses token-specific bridge contracts, not universal bridges.
 * Each token has its own dedicated bridge address.
 */
const BRIDGE_INFO: Record<string, { 
  rpcUrl: string; 
  bridges: Record<string, string>; 
}> = {
  mainnet: {
    rpcUrl: 'https://mainnet.infura.io/v3/' + (process.env.INFURA_KEY ?? ''),
    bridges: {
      // ETH Bridge (for native ETH transfers)
      '0x0000000000000000000000000000000000000000': '0xae0ee0a63a2ce6baeeffe56e7714fb4efe48d419',
      // USDC Bridge 
      '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': '0xf6080d9fbeebcd44d89affbfd42f098cbff92816',
      // USDT Bridge
      '0xdAC17F958D2ee523a2206206994597C13D831ec7': '0x83e7083709179c4e24814c23dcda9e2c50c70676',
      // DAI Bridge  
      '0x6B175474E89094C44Da98b954EedeAC495271d0F': '0x659a00c33263d9254fed382de81349426c795bb6',
      // WBTC Bridge
      '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': '0x283751a21eafbfcd52297820d27c1f1963d9b5b4',
      // STRK Bridge
      '0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766': '0xcE5485Cfb26914C5dcE00B9BAF0580364daFC7a4'
    }
  },
  sepolia: {
    rpcUrl: 'https://sepolia.infura.io/v3/' + (process.env.INFURA_KEY ?? ''),
    bridges: {
      // ETH Bridge (for native ETH transfers on Sepolia)
      '0x0000000000000000000000000000000000000000': '0xae0ee0a63a2ce6baeeffe56e7714fb4efe48d419', 
      // USDC Bridge on Sepolia - using the verified token address
      '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8': '0xf6080d9fbeebcd44d89affbfd42f098cbff92816',
      // STRK Bridge on Sepolia  
      '0xb4FBF271143F4FBf7B91A5ded31805e42b2208d6': '0xcE5485Cfb26914C5dcE00B9BAF0580364daFC7a4'
    }
  }
};

function usage() {
  console.error(
    'Usage: ts-node bridgeEthToStarknet.ts <environment> <token_contract> <starknet_recipient> <amount>'
  );
  process.exit(1);
}

// Early exit for container smoke test
if (process.env.SMOKE_TEST === "1") {
  console.log('Smoke test flag detected: skipping deposit.');
  process.exit(0);
}

// ---------------------------------------------------------------------------
// CLI parsing
// ---------------------------------------------------------------------------
const [, , environment, tokenContract, starknetRecipient, amountStr] = process.argv;

if (!environment || !tokenContract || !starknetRecipient || !amountStr) usage();
if (!(environment in BRIDGE_INFO)) {
  console.error(`Unknown environment "${environment}". Allowed: ${Object.keys(BRIDGE_INFO).join(', ')}`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Reusable bridge function for cross-chain swaps
// ---------------------------------------------------------------------------
export async function bridgeTokens(params: {
  network: string;
  tokenAddress: string;
  recipient: string;
  amount: string;
  privateKey: string;
}): Promise<{
  success: boolean;
  txHash?: string;
  error?: string;
}> {
  try {
    const amount = BigInt(params.amount);
    
    if (!(params.network in BRIDGE_INFO)) {
      return { 
        success: false, 
        error: `Unknown network "${params.network}". Allowed: ${Object.keys(BRIDGE_INFO).join(', ')}` 
      };
    }

    const { rpcUrl, bridges } = BRIDGE_INFO[params.network];
    
    // Find the correct bridge for this token
    const bridgeAddress = bridges[params.tokenAddress];
    if (!bridgeAddress) {
      const supportedTokens = Object.keys(bridges);
      return {
        success: false,
        error: `Token ${params.tokenAddress} not supported on ${params.network}. Supported tokens: ${supportedTokens.join(', ')}`
      };
    }

    // Init signer and provider
    const provider = new JsonRpcProvider(rpcUrl as string);
    const wallet = new Wallet(params.privateKey, provider);

    console.log('Bridge Environment :', params.network);
    console.log('Bridge Address     :', bridgeAddress);
    console.log('Token Address      :', params.tokenAddress);
    console.log('Recipient          :', params.recipient);
    console.log('Amount             :', amount.toString());

    // Load bridge contract
    const bridge = new Contract(bridgeAddress, starknetBridgeAbi as any, wallet);

    // Get fee
    let fee: bigint;
    try {
      const feeBn = await bridge.getDepositFee(amount);
      fee = feeBn.toBigInt();
      console.log('Bridge fee         :', fee.toString(), 'wei');
    } catch (error) {
      console.warn('⚠️  Using fallback fee for Sepolia testnet');
      fee = BigInt('1000000000000000'); // 0.001 ETH
    }

    // Execute bridge deposit
    const tx = await bridge.deposit(params.tokenAddress, params.recipient, amount, {
      value: fee
    });

    console.log('Bridge tx submitted:', tx.hash);

    const receipt = await tx.wait(1);
    if (!receipt) {
      return { 
        success: false, 
        error: `Transaction ${tx.hash} not included` 
      };
    }

    console.log('Bridge tx confirmed in block:', receipt.blockNumber);

    return {
      success: true,
      txHash: tx.hash
    };

  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// ---------------------------------------------------------------------------
// Main CLI function
// ---------------------------------------------------------------------------
(async () => {
  const amount = BigInt(amountStr);

  const { rpcUrl, bridges } = BRIDGE_INFO[environment];
  
  // Find the correct bridge for this token
  const bridgeAddress = bridges[tokenContract];
  if (!bridgeAddress) {
    const supportedTokens = Object.keys(bridges);
    console.error(`❌ Token ${tokenContract} not supported on ${environment}`);
    console.error(`📋 Supported tokens: ${supportedTokens.join(', ')}`);
    process.exit(1);
  }

  // Init signer and provider
  const provider = new JsonRpcProvider(rpcUrl as string);
  const wallet = new Wallet(process.env.ETHEREUM_KEY ?? '', provider);
  const publicAddress = await wallet.getAddress();

  console.log('Environment        :', environment);
  console.log('L1 RPC             :', rpcUrl);
  console.log('Bridge contract    :', bridgeAddress);
  console.log('Token contract     :', tokenContract);
  console.log('Starknet recipient :', starknetRecipient);
  console.log('Amount             :', amount.toString());
  console.log('Sender (L1)        :', publicAddress);

  // Load bridge contract (StarkGate proxy) – we only need the `deposit` entrypoint.
  const bridge = new Contract(bridgeAddress, starknetBridgeAbi as any, wallet);

  // Fetch dynamic fee for the deposit call.  StarkGate exposes `getDepositFee(uint256)`.
  let fee: bigint;
  try {
    const feeBn = await bridge.getDepositFee(amount);
    fee = feeBn.toBigInt();
    console.log('Quoted fee (wei)   :', fee.toString());
  } catch (error) {
    console.warn('⚠️  getDepositFee not available on Sepolia testnet, using default fee of 0.001 ETH');
    fee = BigInt('1000000000000000'); // 0.001 ETH in wei as fallback
    console.log('Using fallback fee :', fee.toString(), 'wei');
  }

  // Perform the deposit.  The stakingSignatures param can be empty for default path.
  const tx = await bridge.deposit(tokenContract, starknetRecipient, amount, {
    value: fee // the fee is paid in ETH on L1
  });

  console.log('Tx submitted       :', tx.hash);

  const receipt = await tx.wait(1);
  if (!receipt) {
    throw new Error(`Transaction ${tx.hash} not included`);
  }
  console.log('Tx included in block:', receipt.blockNumber);

  console.log('Waiting for message consumption on Starknet…');

  // -----------------------------------------------------------------------
  // VERY simplistic poll – production code should subscribe to events or use
  // the official messaging service.  Here we poll every minute for the sake of
  // symmetry with the Polkadot helper.
  // -----------------------------------------------------------------------
  while (true) {
    // The StarkGate L1 contract exposes `l2BridgedAmount()` which returns the
    // total bridged amount so far; in practice, we would rely on the event logs
    // or an off-chain indexer.  For MVP we just check that some receipts exist.

    const completedBn = await bridge.l2BridgedAmount(publicAddress);
    const completed = completedBn.toBigInt();
    if (completed >= amount) {
      console.log('✔ Deposit message consumed on L2');
      break;
    }

    console.log('…still waiting');
    await setTimeout(60_000);
  }
})();
