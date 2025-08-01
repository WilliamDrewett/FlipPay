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

/** Map between our `environment` CLI flag and actual on-chain parameters. */
const BRIDGE_INFO: Record<string, { rpcUrl: string; bridgeAddress: string }> = {
  mainnet: {
    rpcUrl: 'https://mainnet.infura.io/v3/' + (process.env.INFURA_KEY ?? ''),
    bridgeAddress: '0xcE5485Cfb26914C5dcE00B9BAF0580364daFC7a4' // STRK StarkGate Bridge Mainnet
  },
  sepolia: {
    rpcUrl: 'https://sepolia.infura.io/v3/' + (process.env.INFURA_KEY ?? ''),
    bridgeAddress: '0xF6217de888fD6E6b2CbFBB2370973BE4c36a152D' // Correct Sepolia testnet address
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

    const { rpcUrl, bridgeAddress } = BRIDGE_INFO[params.network];

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
      error: error.message 
    };
  }
}

// ---------------------------------------------------------------------------
// Main CLI function
// ---------------------------------------------------------------------------
(async () => {
  const amount = BigInt(amountStr);

  const { rpcUrl, bridgeAddress } = BRIDGE_INFO[environment];

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
