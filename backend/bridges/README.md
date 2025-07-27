# Snowbridge Ethereum to Polkadot

This script helps us in bridging tokens from Ethereum to Polkadot parachains using the Snowbridge protocol. It handles the complete transfer lifecycle including but not limited to validation, fee calculation, tx submission and status monitoring.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install TypeScript and ts-node if not already available:
```bash
npm install -g typescript ts-node
```

## Configuration

Create a .env file in this folder with the following vars:
```bash
# .env
ETHEREUM_KEY=your_ethereum_private_key_here
SUBSTRATE_KEY=your_substrate_seed_phrase_or_private_key_here
```

**Security Note**: Be very careful to never commit private keys to version control. Consider using a more secure key management solution for production use. Try to use a wallet that is specifically meant for testnet usage. Better be safe than sorry.

## Usage

Run the script with the following command:
```bash
npx ts-node scripts/bridgeEthToPolkadot.ts <environment> <token_contract> <destination_parachain> <amount>
```

Example usage
```bash
npx ts-node scripts/bridgeEthToPolkadot.ts westend_sepolia 0x0000000000000000000000000000000000000000 1000 15000000000000
```

Parameters
- environment: The network environment such as `polkadot_mainnet` or `westend_sepolia`
- token_contract: The ERC20 token contract address that you want to transfer
- destination_parachain: The numeric ID of the parachain where you want to transfer the tokens, such as Asset Hub
- amount: The transfer amount in the token's smallest unit, similar to wei for Ethereum