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