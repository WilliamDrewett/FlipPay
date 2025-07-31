# FlipPay Swap Backend

A TypeScript backend service for cross-chain ETH ↔ DOT swaps using Fusion+ and Snowbridge protocols.

## Architecture Overview

```
Frontend (Already Implemented)
    ↓ POST /api/swap
Backend (This Implementation)
    ↓ ETH → USDC
Fusion+ API (1inch)
    ↓ USDC → Polkadot
Snowbridge Protocol
    ↓ Receives bridged tokens
ink! Smart Contract
```

## Features

- **ETH to USDC Swaps**: Uses Fusion+ (1inch) for optimal swap rates
- **Cross-chain Bridging**: Snowbridge protocol for Ethereum to Polkadot bridging
- **Real-time Updates**: WebSocket notifications for swap progress
- **Smart Contract**: ink! contract for receiving bridged tokens
- **Comprehensive Logging**: Structured logging with Winston
- **Error Handling**: Robust error handling and validation

## Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Create logs directory
mkdir -p logs
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp environment.example .env
```

Edit `.env` with your configuration:

```bash
# Server Configuration
PORT=8000
NODE_ENV=development
LOG_LEVEL=info

# Frontend Configuration
FRONTEND_URL=http://localhost:3000

# Fusion+ (1inch) API Configuration
ONEINCH_API_KEY=your_1inch_api_key_here
ETHEREUM_CHAIN_ID=1

# Ethereum Configuration
ETHEREUM_KEY=your_ethereum_private_key_here

# Polkadot Configuration
SUBSTRATE_KEY=your_substrate_seed_phrase_or_private_key_here

# Snowbridge Configuration
SNOWBRIDGE_ENVIRONMENT=westend_sepolia
DESTINATION_PARACHAIN=1000
```

### 3. Start the Backend

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The server will start on `http://localhost:8000`

## API Endpoints

### POST /api/swap

Initiate a cross-chain swap.

**Request Body:**
```json
{
  "fromEthToDot": true,
  "payAmount": "0.1",
  "ethAddress": "0x742d35Cc6634C0532925a3b8D7389d80dDdBB40a",
  "dotAddress": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
}
```

**Response:**
```json
{
  "success": true,
  "swapId": "uuid-string",
  "message": "Swap initiated successfully",
  "estimatedTime": "5-10 minutes"
}
```

### GET /api/swap/:swapId/status

Get the current status of a swap.

**Response:**
```json
{
  "swapId": "uuid-string",
  "status": "fusion_swap",
  "currentStep": "Swapping ETH to USDC...",
  "progress": 25,
  "txHashes": {
    "fusionTx": "0x..."
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:05:00.000Z"
}
```

## WebSocket Communication

Connect to WebSocket for real-time updates:

```javascript
const ws = new WebSocket('ws://localhost:8000');

ws.onopen = () => {
  // Subscribe to swap updates
  ws.send(JSON.stringify({
    type: 'subscribe',
    swapId: 'your-swap-id'
  }));
};

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  console.log('Swap update:', update);
};
```

## Fusion+ API Setup

### 1. Get API Key

1. Visit [1inch Developer Portal](https://portal.1inch.dev/)
2. Create an account and generate an API key
3. Add the API key to your `.env` file

### 2. Supported Networks

- **Mainnet**: `ETHEREUM_CHAIN_ID=1`
- **Sepolia Testnet**: `ETHEREUM_CHAIN_ID=11155111`

### 3. Rate Limits

- Free tier: 1 request per second
- Paid plans available for higher limits

## Snowbridge Integration

### 1. Environment Configuration

The backend uses the existing Snowbridge integration from the `bridges/` folder.

**Available Environments:**
- `polkadot_mainnet`: Production Polkadot network
- `westend_sepolia`: Testnet environment

### 2. Destination Parachains

- **AssetHub**: `1000` (recommended)
- **Other parachains**: Check [Polkadot documentation](https://wiki.polkadot.network/docs/learn-parachains)

### 3. Private Keys

**Security Requirements:**
- Use different keys for testnet and mainnet
- Never commit private keys to version control
- Consider hardware wallets for production

**Ethereum Key Format:**
```bash
ETHEREUM_KEY=0x1234567890abcdef...
```

**Substrate Key Format:**
```bash
SUBSTRATE_KEY="word1 word2 word3 ... word12"
# or
SUBSTRATE_KEY=0x1234567890abcdef...
```

## ink! Smart Contract

### 1. Contract Features

- **Token Reception**: Receives bridged tokens from Snowbridge
- **Event Emissions**: Emits events for tracking
- **Ownership Management**: Owner-controlled withdrawals
- **Balance Tracking**: Tracks per-user and per-token balances

### 2. Building the Contract

```bash
# Install cargo-contract if not already installed
cargo install --force --locked cargo-contract

# Navigate to contract directory
cd contracts/token_receiver

# Build the contract
cargo contract build

# Run tests
cargo test
```

### 3. Deployment

Deploy to a Substrate chain with contracts pallet (PolkaVM/AssetHub):

```bash
# Deploy to local node
cargo contract instantiate --constructor new \
  --suri //Alice \
  --url ws://localhost:9944

# Deploy to testnet
cargo contract instantiate --constructor new \
  --suri "your seed phrase" \
  --url wss://westend-asset-hub-rpc.polkadot.io
```

### 4. Contract Methods

- `receive_tokens(token_contract)`: Receive bridged tokens
- `get_received_tokens(token_contract)`: Query received amount
- `get_user_balance(user)`: Get user's balance
- `withdraw_tokens(token_contract, to, amount)`: Withdraw tokens (owner only)

## Development Workflow

### 1. Testing Locally

```bash
# Start a local Substrate node with contracts pallet
substrate-contracts-node --dev

# Deploy the ink! contract
cd contracts/token_receiver
cargo contract instantiate --constructor new --suri //Alice

# Start the backend
npm run dev

# Test with curl
curl -X POST http://localhost:8000/api/swap \
  -H "Content-Type: application/json" \
  -d '{
    "fromEthToDot": true,
    "payAmount": "0.01",
    "ethAddress": "0x742d35Cc6634C0532925a3b8D7389d80dDdBB40a",
    "dotAddress": "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
  }'
```

### 2. Monitoring

- **Logs**: Check `logs/` directory for detailed logs
- **Health Check**: `GET /health`
- **WebSocket**: Real-time swap updates

## Production Deployment

### 1. Environment Variables

Ensure all production environment variables are set:

```bash
NODE_ENV=production
ONEINCH_API_KEY=prod_api_key
ETHEREUM_CHAIN_ID=1
SNOWBRIDGE_ENVIRONMENT=polkadot_mainnet
DESTINATION_PARACHAIN=1000
```

### 2. Security Considerations

- Use environment-specific private keys
- Enable HTTPS in production
- Implement rate limiting
- Monitor for suspicious activity
- Use hardware security modules for key management

### 3. Scaling

- Deploy multiple backend instances behind a load balancer
- Use Redis for shared state if needed
- Monitor performance and adjust as needed

## Troubleshooting

### Common Issues

1. **"1inch API key not provided"**
   - Solution: Add `ONEINCH_API_KEY` to `.env`

2. **"ETHEREUM_KEY environment variable not set"**
   - Solution: Add your Ethereum private key to `.env`

3. **"USDC address not configured"**
   - Solution: Verify `ETHEREUM_CHAIN_ID` matches your network

4. **WebSocket connection failed**
   - Solution: Check if backend is running and firewall allows connections

### Debug Mode

Enable debug logging:

```bash
LOG_LEVEL=debug npm run dev
```

## API Rate Limits

- **1inch API**: 1 request/second (free tier)
- **Snowbridge**: No specific limits
- **Backend**: No built-in limits (implement as needed)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license here]

## Support

For issues and questions:
- Check the troubleshooting section
- Review logs in the `logs/` directory
- Open an issue in the repository 