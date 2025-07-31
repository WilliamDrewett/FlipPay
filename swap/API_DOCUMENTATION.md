# FlipPay Swap Service API Documentation

## Price Endpoints

The swap service now includes price endpoints that act as proxies to the 1inch Spot Price API, providing real-time ETH/USD and Polkadot/USD prices.

### Base URL
```
http://localhost:8000/api/price
```

### Authentication
All price endpoints use the 1inch API under the hood. Make sure to set your `ONEINCH_API_KEY` environment variable.

---

## Endpoints

### 1. Get ETH Price in USD

**GET** `/eth`

Returns the current ETH price in USD.

#### Query Parameters
- `chainId` (optional): Blockchain chain ID (default: 1 for Ethereum mainnet)

#### Example Request
```bash
curl -X GET "http://localhost:8000/api/price/eth?chainId=1"
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "token": "ETH",
    "price_usd": 3456.789123,
    "chain_id": 1,
    "source": "1inch",
    "timestamp": 1704067200
  }
}
```

---

### 2. Get Polkadot Price in USD

**GET** `/polkadot`

Returns the current Polkadot (DOT) price in USD.

#### Query Parameters
- `chainId` (optional): Blockchain chain ID (default: 1 for Ethereum mainnet)

#### Example Request
```bash
curl -X GET "http://localhost:8000/api/price/polkadot?chainId=1"
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "token": "DOT",
    "price_usd": 7.234567,
    "chain_id": 1,
    "source": "1inch",
    "timestamp": 1704067200
  }
}
```

---

### 3. Get Multiple Token Prices

**GET** `/multiple`

Returns prices for multiple tokens in a single request.

#### Query Parameters
- `tokens` (required): Comma-separated list of token symbols (ETH, DOT)
- `chainId` (optional): Blockchain chain ID (default: 1 for Ethereum mainnet)

#### Example Request
```bash
curl -X GET "http://localhost:8000/api/price/multiple?tokens=ETH,DOT&chainId=1"
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "ETH": {
      "token": "ETH",
      "price_usd": 3456.789123,
      "chain_id": 1,
      "source": "1inch",
      "timestamp": 1704067200
    },
    "DOT": {
      "token": "DOT",
      "price_usd": 7.234567,
      "chain_id": 1,
      "source": "1inch",
      "timestamp": 1704067200
    }
  }
}
```

---

### 4. Price Service Health Check

**GET** `/health`

Checks if the price service and 1inch API are available.

#### Example Request
```bash
curl -X GET "http://localhost:8000/api/price/health"
```

#### Example Response
```json
{
  "success": true,
  "data": {
    "service": "PriceService",
    "status": "available",
    "provider": "1inch",
    "timestamp": 1704067200
  }
}
```

---

## Error Responses

All endpoints return standardized error responses:

### Service Unavailable (503)
```json
{
  "success": false,
  "error": "Unable to fetch ETH price at the moment"
}
```

### Bad Request (400)
```json
{
  "success": false,
  "error": "tokens query parameter is required (comma-separated list)"
}
```

### Internal Server Error (500)
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Supported Tokens

Currently supported tokens for price queries:
- **ETH**: Ethereum
- **DOT**: Polkadot

---

## Technical Details

### Token Addresses Used
- **ETH**: `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE` (ETH placeholder)
- **DOT**: `0x7083609fce4d1d8dc0c979aab8c869ea2c873402` (Polkadot on Ethereum)
- **USDC**: `0xA0b86a33E6441066CE6b8B0d5A5a57d4E47e0b12` (Price reference)

### Rate Limiting
The endpoints are subject to 1inch API rate limits. Consider implementing caching for production use.

### Caching Recommendation
For production environments, consider implementing Redis or in-memory caching with a TTL of 30-60 seconds to reduce API calls and improve response times.

---

## Integration Example

### JavaScript/TypeScript
```typescript
async function getTokenPrices() {
  try {
    const response = await fetch('http://localhost:8000/api/price/multiple?tokens=ETH,DOT');
    const data = await response.json();
    
    if (data.success) {
      console.log('ETH Price:', data.data.ETH.price_usd);
      console.log('DOT Price:', data.data.DOT.price_usd);
    }
  } catch (error) {
    console.error('Failed to fetch prices:', error);
  }
}
```

### Python
```python
import requests

def get_eth_price():
    response = requests.get('http://localhost:8000/api/price/eth')
    data = response.json()
    
    if data['success']:
        return data['data']['price_usd']
    else:
        print(f"Error: {data['error']}")
        return None
```

---

## Getting Started

1. Set up your environment variables:
   ```bash
   cp .env.example .env
   # Edit .env and add your ONEINCH_API_KEY
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run dev
   ```

4. Test the endpoints:
   ```bash
   curl http://localhost:8000/api/price/eth
   ``` 