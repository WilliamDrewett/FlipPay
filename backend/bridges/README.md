# Bridge helpers

This folder contains small, self-contained CLI helpers that showcase cross-chain bridging flows we use in FlipPay.

Currently available:

1. Snowbridge – Ethereum ➜ Polkadot parachains (`bridgeEthToPolkadot.ts`)
2. StarkGate  – Ethereum ➜ Starknet (`bridgeEthToStarknet.ts`)

---

## Snowbridge Ethereum ➜ Polkadot

This script helps us in bridging tokens from Ethereum to Polkadot parachains using the Snowbridge protocol. It handles the complete transfer lifecycle including but not limited to validation, fee calculation, tx submission and status monitoring.

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env` and fill in the required private keys.

### Usage

```bash
npx ts-node scripts/bridgeEthToPolkadot.ts <environment> <token_contract> <destination_parachain> <amount>
```

Example:

```bash
npx ts-node scripts/bridgeEthToPolkadot.ts westend_sepolia 0x0000... 1000 15000000000000
```

---

## StarkGate Ethereum ➜ Starknet

The `bridgeEthToStarknet.ts` helper performs an **L1 deposit** using the official StarkGate contracts and waits until the corresponding message is consumed on Starknet (L2).

### Prerequisites

* An Ethereum account funded with ETH for gas and fees (`ETHEREUM_KEY` in your `.env`).
* An **Infura** project ID (`INFURA_KEY`) unless another public RPC endpoint is used.

### Usage

```bash
npx ts-node scripts/bridgeEthToStarknet.ts <environment> <token_contract> <starknet_recipient> <amount>
```

Parameters:

1. `environment` – `mainnet` or `sepolia` (more can be added in `BRIDGE_INFO`).
2. `token_contract` – ERC-20 on Ethereum that is listed on StarkGate.
3. `starknet_recipient` – Felt-252 address of the destination account on Starknet (hex string starting with `0x`).
4. `amount` – Deposit amount in the token's smallest unit (similar to `wei`).

Example:

```bash
# Deposit 1 LINK from Sepolia to Starknet Sepolia (alpha)
NODE_OPTIONS=--loader ts-node/esm npx ts-node scripts/bridgeEthToStarknet.ts sepolia 0x514910771AF9Ca656af840dff83E8264EcF986CA 0x0123abc... 1000000000000000000
```

The script will:

1. Fetch the dynamic fee via `getDepositFee`.
2. Submit the `deposit` transaction with the correct value.
3. Poll until Starknet has consumed the message.
