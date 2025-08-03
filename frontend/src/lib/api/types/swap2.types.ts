// Types for the cross-chain swap API (swap2)

export interface SwapStep {
  step: string;
  command: string;
  success: boolean;
  output?: string;
  error?: string;
  timestamp: string;
}

export interface ExecuteSwapResponse {
  success: boolean;
  message: string;
  orderId?: string;
  steps: SwapStep[];
  totalTime: string;
}

export interface HealthCheckResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

// 1inch API types
export interface OneInchToken {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI?: string;
  tags?: string[];
}

export interface OneInchTokensResponse {
  tokens: Record<string, OneInchToken>;
}

// Future dynamic input types (for later use)
export interface SwapRequest {
  fromChain: 'ethereum' | 'polkadot';
  toChain: 'ethereum' | 'polkadot';
  fromToken: string;
  toToken: string;
  amount: string;
  fromAddress: string;
  toAddress: string;
  slippageTolerance?: number;
}

export interface SwapQuote {
  fromAmount: string;
  toAmount: string;
  priceImpact: number;
  gasEstimate: string;
  route: SwapStep[];
} 