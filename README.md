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

## EVM HTLC Smart contracts

Escrow contract deployed at: 0x47E5517c1Ea689c7D1c7144eF9d2A16bC22E90cd

Polkadot verifier deployed at: 0x27413D304841759D366083500c3a7FA01B098725

EscrowSrc deployed at: 0x366992C38D2aC17c6e237efcD1a1F47Ff37cf353

EscrowDst deployed at: 0x85858ffae302c819817631b84cB143Ae32fDD337