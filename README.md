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