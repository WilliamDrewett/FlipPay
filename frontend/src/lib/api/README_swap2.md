# Cross-Chain Swap API (swap2)

This module provides TypeScript interfaces and functions to interact with the cross-chain swap API running on `NEW_SWAP_POLKADOT_API` (http://localhost:3000).

## Features

- **Execute Cross-Chain Swaps**: Complete atomic swap process between Ethereum and Polkadot
- **Health Check**: Monitor API status
- **1inch Integration**: Fetch token data from 1inch API
- **TypeScript Support**: Full type safety with proper interfaces
- **Fake Mode**: Development mode with mock data

## API Endpoints

### 1. Execute Cross-Chain Swap
- **Endpoint**: `POST /api/execute-swap`
- **Description**: Executes a complete cross-chain swap process
- **Steps**:
  1. Creates an order
  2. Creates escrow contracts
  3. Executes the atomic swap

### 2. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Checks if the swap API is running

## Usage Examples

### Basic Usage

```typescript
import { 
  executeCrossChainSwap, 
  checkSwapAPIHealth, 
  getTokensFrom1inch 
} from './api/swap2';

// Execute a cross-chain swap
try {
  const result = await executeCrossChainSwap();
  console.log('Swap result:', result);
} catch (error) {
  console.error('Swap failed:', error);
}

// Check API health
const health = await checkSwapAPIHealth();
console.log('API status:', health.message);

// Get tokens from 1inch
const tokens = await getTokensFrom1inch();
console.log('Available tokens:', tokens);
```

### Using in Svelte Components

```svelte
<script lang="ts">
  import { executeCrossChainSwap } from '../../api/swap2';
  import type { ExecuteSwapResponse } from '../../api/swap2';

  let swapResult: ExecuteSwapResponse | null = null;
  let isExecuting = false;

  async function handleSwap() {
    isExecuting = true;
    try {
      swapResult = await executeCrossChainSwap();
    } catch (error) {
      console.error('Swap failed:', error);
    } finally {
      isExecuting = false;
    }
  }
</script>

<button on:click={handleSwap} disabled={isExecuting}>
  {isExecuting ? 'Executing...' : 'Execute Swap'}
</button>

{#if swapResult}
  <div>
    <h3>Swap Result</h3>
    <p>Status: {swapResult.success ? 'Success' : 'Failed'}</p>
    <p>Order ID: {swapResult.orderId}</p>
    <p>Total Time: {swapResult.totalTime}</p>
  </div>
{/if}
```

## TypeScript Interfaces

### ExecuteSwapResponse
```typescript
interface ExecuteSwapResponse {
  success: boolean;
  message: string;
  orderId?: string;
  steps: SwapStep[];
  totalTime: string;
}
```

### SwapStep
```typescript
interface SwapStep {
  step: string;
  command: string;
  success: boolean;
  output?: string;
  error?: string;
  timestamp: string;
}
```

### HealthCheckResponse
```typescript
interface HealthCheckResponse {
  success: boolean;
  message: string;
  timestamp: string;
}
```

## Configuration

The API uses the following configuration from `API.ts`:

```typescript
export const NEW_SWAP_POLKADOT_API = 'http://localhost:3000';
export const FAKE = false; // Set to true for development with mock data
```

## Error Handling

All functions throw errors that should be caught and handled:

```typescript
try {
  const result = await executeCrossChainSwap();
  // Handle success
} catch (error) {
  if (error instanceof Error) {
    console.error('Error message:', error.message);
  }
  // Handle error appropriately
}
```

## Development Mode

Set `FAKE = true` in `API.ts` to use mock data for development:

```typescript
export const FAKE = true;
```

This will return fake responses without making actual API calls.

## Future Enhancements

The API is designed to support dynamic inputs in the future:

```typescript
// Future interface for dynamic swap requests
interface SwapRequest {
  fromChain: 'ethereum' | 'polkadot';
  toChain: 'ethereum' | 'polkadot';
  fromToken: string;
  toToken: string;
  amount: string;
  fromAddress: string;
  toAddress: string;
  slippageTolerance?: number;
}
```

## Testing

Visit `/cross-chain-swap` in your application to see a working demo of the API. 