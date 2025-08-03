# Setup

## Front-end

### Local development

```bash
cd frontend
npm install
npm run dev
```

### Put online

```bash
# Thanks Cloudflare
# It is better if you sync (git push) before to have the same thing online and in the repo
npm run deploy
```

## Back-end

### Local development (Docker)

```bash
# From project root
docker build -t flippay-backend .
docker run -d --name flippay-backend -p 8000:8000 flippay-backend
```

Once the container is up you can explore the FastAPI Swagger UI at:

```
http://localhost:8000/docs
```

---

### Quick API walkthrough

The calls below showcase a full user journey using the default **loot-box** game.

| Step | Endpoint & Method | Purpose |
|------|-------------------|---------|
| 0 | `GET /admin/reset-db` | Reset demo database (optional). |
| 1 | `POST /swaps/?wallet_address=test`  <br>Body example → `{ "amount": 300, "from_token": "ETH", "to_token": "USDC" }` | Make a swap → earn points. |
| 2 | `GET /users/test/balance` | Check current points balance. |
| 3 | `POST /games/play/?wallet_address=test` | Spend 250 pts to open a loot-box. |
| 4 | `GET /users/test/balance` | Verify points were deducted / bonuses added. |
| 5 | `GET /users/test/prizes` | List all prizes won (includes loot-boxes). |
| 6 | `POST /ai_agent?wallet_address=test&lottery_result=win` | Example call to the AI endpoint with win/lose context. |

---

## 1inch API Integration

The FlipPay backend includes a comprehensive proxy for all [1inch APIs](https://portal.1inch.dev/documentation/apis). This proxy allows you to access any 1inch service by appending the API path to our base endpoint.

### How the Proxy Works

- **Base URL**: `http://localhost:8000/oneinch/`
- **1inch Base**: `https://api.1inch.dev`
- **Pattern**: Any path after `/oneinch/` gets forwarded to the corresponding 1inch API endpoint
- **Authentication**: Automatically handled with Bearer token from `ONEINCH_KEY` environment variable
- **Methods**: Supports both GET and POST requests

### Available Services

The proxy reflects all services available at the [1inch Developer Portal](https://portal.1inch.dev/documentation/apis):

- **Swap API** - Token swaps and quotes
- **Token API** - Token information and search
- **Balance API** - Wallet balance queries
- **Spot Price API** - Real-time token prices
- **Portfolio API** - Portfolio analytics
- **NFT API** - NFT data
- **Fusion API** - Gasless swaps
- And many more...

### Examples

#### 1. List Available ETH Tokens

Get all tokens available on Ethereum mainnet:

```bash
curl "http://localhost:8000/oneinch/token/v1.2/1"
```

**Response**: Complete token registry including ETH, USDC, USDT, DAI, WETH, UNI, AAVE, etc.

#### 2. Search for Specific Tokens

```bash
curl "http://localhost:8000/oneinch/token/v1.2/1/search?query=USDC"
```

#### 3. Get Token Quote/Price

Get live swap quote (1 ETH → USDC):

```bash
curl "http://localhost:8000/oneinch/swap/v5.2/1/quote?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&amount=1000000000000000000"
```

**Response**: `{"toAmount":"3525446392"}` (≈3,525 USDC for 1 ETH)

#### 4. Execute Swap (POST)

```bash
curl -X POST "http://localhost:8000/oneinch/swap/v5.2/1/swap" \
  -H "Content-Type: application/json" \
  -d '{
    "fromTokenAddress": "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    "toTokenAddress": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "amount": "1000000000000000000",
    "fromAddress": "0x...",
    "slippage": 1
  }'
```

### Token Addresses (Ethereum Mainnet)

- **ETH**: `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`
- **USDC**: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`
- **USDT**: `0xdac17f958d2ee523a2206206994597c13d831ec7`
- **DAI**: `0x6b175474e89094c44da98b954eedeac495271d0f`
- **WETH**: `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`

---

## Polkadot API Integration

The FlipPay backend includes comprehensive Polkadot ecosystem token listing and pricing capabilities. This service provides access to Polkadot native tokens and parachain assets with real-time pricing data from CoinGecko.

### How the Polkadot Service Works

- **Base URL**: `http://localhost:8000/polkadot/`
- **Data Sources**: 
  - **Token Registry**: Polkadot RPC (with CoinGecko fallback)
  - **Price Data**: CoinGecko API
- **Supported Tokens**: 15+ major Polkadot ecosystem tokens
- **Fallback Mode**: Works without Polkadot RPC dependency (CoinGecko-only mode)

### Available Endpoints

#### Token Listing & Search
- `GET /polkadot/tokens` - List all available Polkadot ecosystem tokens
- `GET /polkadot/tokens/search?query={query}` - Search tokens by symbol or name
- `GET /polkadot/tokens/{symbol}` - Get detailed info for a specific token

#### Price & Market Data  
- `GET /polkadot/prices` - Get current prices for all tokens
- `GET /polkadot/prices?tokens={symbols}` - Get prices for specific tokens (comma-separated)
- `GET /polkadot/prices/{symbol}` - Get current price for a specific token

### Supported Tokens

The service includes major Polkadot ecosystem tokens:

- **DOT** (Polkadot) - Native token
- **KSM** (Kusama) - Canary network
- **ACA** (Acala) - DeFi hub
- **ASTR** (Astar) - Smart contracts
- **GLMR** (Moonbeam) - Ethereum compatibility
- **HDX** (HydraDX) - Cross-chain liquidity
- **MOVR** (Moonriver) - Kusama parachain
- **And 8+ more ecosystem tokens...**

### Examples

#### 1. List All Polkadot Tokens

Get complete token registry with metadata:

```bash
curl "http://localhost:8000/polkadot/tokens"
```

**Response**: Complete list with symbol, name, decimals, and CoinGecko IDs
```json
{
  "tokens": {
    "DOT": {
      "symbol": "DOT",
      "name": "DOT", 
      "decimals": 10,
      "type": "ecosystem",
      "coingecko_id": "polkadot"
    },
    "KSM": { ... },
    "ACA": { ... }
  },
  "total_count": 15
}
```

#### 2. Search for Specific Tokens

```bash
curl "http://localhost:8000/polkadot/tokens/search?query=moon"
```

**Response**: Returns GLMR (Moonbeam) and MOVR (Moonriver)

#### 3. Get All Token Prices

Get live market data for all supported tokens:

```bash
curl "http://localhost:8000/polkadot/prices"
```

**Response**: Live prices with market cap, 24h change, and volume
```json
{
  "prices": {
    "DOT": {
      "symbol": "DOT",
      "price_usd": 3.58,
      "market_cap_usd": 5466101459.80,
      "change_24h_percent": -4.32,
      "volume_24h_usd": 404203253.31,
      "source": "coingecko"
    }
  }
}
```

#### 4. Get Specific Token Prices

Filter for specific tokens only:

```bash
curl "http://localhost:8000/polkadot/prices?tokens=DOT,KSM,ACA"
```

#### 5. Get Individual Token Price

```bash
curl "http://localhost:8000/polkadot/prices/DOT"
```

**Response**: 
```json
{
  "symbol": "DOT",
  "price_usd": 3.58,
  "market_cap_usd": 5466101459.80,
  "change_24h_percent": -4.32,
  "volume_24h_usd": 404203253.31,
  "source": "coingecko",
  "timestamp": 1736285493
}
```

#### 6. Get Token Details with Price

Get comprehensive token information including live pricing:

```bash
curl "http://localhost:8000/polkadot/tokens/KSM"
```

**Response**: Token metadata enriched with current market data
```json
{
  "symbol": "KSM",
  "name": "KSM",
  "decimals": 12,
  "type": "ecosystem",
  "coingecko_id": "kusama",
  "price_usd": 13.69,
  "market_cap_usd": 231281664.24,
  "change_24h_percent": -5.03,
  "volume_24h_usd": 15535851.51
}
```


---

## StarkGate Bridge Integration

The FlipPay backend includes a comprehensive StarkGate bridge endpoint for transferring tokens between Ethereum and Starknet. This frontend-friendly API provides easy token bridging with human-readable parameters and clear success/error responses.

### How the StarkGate Bridge Works

- **Base URL**: `http://localhost:8000/bridge/starkgate/`
- **Supported Networks**: Sepolia testnet and Ethereum mainnet
- **Supported Tokens**: ETH, USDC, USDT, STRK (varies by network)
- **Validation**: Automatic parameter validation and error handling
- **Format**: Accepts human-readable amounts (e.g., 1.5 USDC)

### Available Endpoints

#### Token Information
- `GET /bridge/starkgate/tokens` - List all supported tokens and bridge contracts

#### Bridge Execution  
- `POST /bridge/starkgate` - Execute a StarkGate bridge transaction

### Bridge Request Parameters

```json
{
  "network": "sepolia",           // "sepolia" or "mainnet"
  "token_symbol": "USDC",         // "ETH", "USDC", "USDT", "STRK"
  "amount": 1.5,                  // Human-readable amount (e.g., 1.5 USDC)
  "starknet_recipient": "0x...",  // L2 recipient address (64 chars)
  "dry_run": true                 // true = validation only, false = real transaction
}
```

### Bridge Response Format

```json
{
  "success": true,
  "transaction_hash": "0x5709911df8ef01e860532137e51629c6ab5978e41c8aabbc8c90debf00714813",
  "amount_bridged": "1.5 USDC",
  "token_info": {
    "address": "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
    "bridge": "0xf6080d9fbeebcd44d89affbfd42f098cbff92816",
    "decimals": 6,
    "symbol": "USDC"
  },
  "network_info": {
    "network": "sepolia",
    "bridge_contract": "0xf6080d9fbeebcd44d89affbfd42f098cbff92816",
    "token_contract": "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8"
  },
  "gas_used": "165431"
}
```

### Examples

#### 1. List Supported Tokens

Get all tokens supported by StarkGate bridge:

```bash
curl "http://localhost:8000/bridge/starkgate/tokens"
```

**Response**: Complete list with addresses, bridge contracts, and metadata

#### 2. Bridge USDC (Dry Run)

Test bridging 1 USDC from Ethereum Sepolia to Starknet:

```bash
curl -X POST "http://localhost:8000/bridge/starkgate" \
  -H "Content-Type: application/json" \
  -d '{
    "network": "sepolia",
    "token_symbol": "USDC",
    "amount": 1.0,
    "starknet_recipient": "0x1234567890123456789012345678901234567890123456789012345678901234",
    "dry_run": true
  }'
```

#### 3. Bridge ETH (Real Transaction)

Bridge 0.001 ETH to Starknet mainnet:

```bash
curl -X POST "http://localhost:8000/bridge/starkgate" \
  -H "Content-Type: application/json" \
  -d '{
    "network": "mainnet",
    "token_symbol": "ETH",
    "amount": 0.001,
    "starknet_recipient": "0x0742d13c6d1adc2a80b5c0b30bc68d0c90aecf42e24c46b59cf4cc4f492b0f92",
    "dry_run": false
  }'
```

### Environment Requirements

The bridge requires these environment variables:

```bash
ETHEREUM_KEY=0x...    # Private key for Ethereum transactions
INFURA_KEY=abc123...  # Infura project ID for RPC access
```

### Supported Token Addresses

#### Mainnet
- **ETH**: `0x0000000000000000000000000000000000000000`
- **USDC**: `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- **USDT**: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
- **STRK**: `0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766`

#### Sepolia Testnet
- **ETH**: `0x0000000000000000000000000000000000000000`
- **USDC**: `0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8`

### Error Handling

The API provides clear error messages for common issues:

- **Invalid Token**: `"Token XYZ not supported on sepolia. Supported: ['ETH', 'USDC']"`
- **Invalid Network**: `"Unsupported network: invalid. Supported: ['sepolia', 'mainnet']"`
- **Insufficient Balance**: `"Insufficient ETH balance for gas fees"`
- **Configuration**: `"ETHEREUM_KEY environment variable not set"`

### Bridge Transaction Flow

1. **Validation**: Checks network, token, amount, and configuration
2. **Conversion**: Converts human-readable amounts to token smallest units
3. **Execution**: Calls the token-specific StarkGate bridge contract
4. **Response**: Returns transaction hash and details or clear error message

### Integration Notes

- Use `dry_run: true` for validation and testing
- Always check the `success` field in responses
- Transaction hashes can be verified on Etherscan
- Bridge contracts are token-specific (not universal)
- Minimum amounts are enforced to prevent dust transactions

---

## EVM HTLC Contracts
### Limit order protocol contract deployed at 0x6af572bE6497d4Da120e51f310c6839E211E97AA

### Escrow contract deployed at: 0xd27Cbab8E34b8D6d9769BD557769bA96909cd390
### Resolver contract deployed at: 0xF6b928896E57955727C29d33a3B716C25E10A4e4
### EscrowSrc contract deployed at: 0x7D9bE409CAff73C6aa0E3eBe7e02393d678ecc46
### EscrowDst contract deployed at: 0xEc714A9f9e094B881e6B8087F51C6e03Dc6A500b

> All contracts in the EVM side have been deployed on Ethereum Sepolia

## Substrate

Spin up a local solochain to demonstrate HTLC

First, build the node without launching it:

```
cargo build --release
```

Use the following command to start a single node development chain
```
./target/release/solochain-template-node --dev --rpc-methods=Unsafe --rpc-port 9933
```

Run the following command to check if the chain is running 

```
curl http://127.0.0.1:9933 -H "Content-Type: application/json" -d '{
  "jsonrpc":"2.0",
  "method":"system_chain",
  "params":[],
  "id":1
}'
```

It should return something like this

```
{"jsonrpc":"2.0","id":1,"result":"Development"}
```

### The following is a simulation of ETH<>DOT transfer

Create an order. It will be filled for you automatically

```
npm run create:order
```

Next, create the escrow contracts. Here's an example

```
ORDER_ID=eth_dot_order_1754215281942 npm run create:escrow
```

Execute the atomic swap
```
ORDER_ID=eth_dot_order_1754215281942 npm run execute:swap
```