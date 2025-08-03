import { NEW_SWAP_POLKADOT_API, FAKE } from "./API";
import type { 
  SwapStep, 
  ExecuteSwapResponse, 
  HealthCheckResponse,
  OneInchTokensResponse 
} from "./types/swap2.types";

export type { 
  SwapStep, 
  ExecuteSwapResponse, 
  HealthCheckResponse,
  OneInchTokensResponse 
};

// Function to execute a complete cross-chain swap
export async function executeCrossChainSwap(): Promise<ExecuteSwapResponse> {
  // ----------------------------------- FAKE DATA -----------------------------------
  if (FAKE) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const fakeSteps: SwapStep[] = [
      {
        step: '1-create-order',
        command: 'npm run create:order',
        success: true,
        output: 'Order created successfully: eth_dot_order_1234567890',
        timestamp: new Date().toISOString(),
      },
      {
        step: '2-create-escrow',
        command: 'ORDER_ID=eth_dot_order_1234567890 npm run create:escrow',
        success: true,
        output: 'Escrow contracts created successfully',
        timestamp: new Date().toISOString(),
      },
      {
        step: '3-execute-swap',
        command: 'ORDER_ID=eth_dot_order_1234567890 npm run execute:swap',
        success: true,
        output: 'Atomic swap executed successfully',
        timestamp: new Date().toISOString(),
      },
    ];

    return {
      success: true,
      message: 'Cross-chain swap completed successfully (fake mode)',
      orderId: 'eth_dot_order_1234567890',
      steps: fakeSteps,
      totalTime: '2500ms',
    };
  }
  // ----------------------------------- REAL API -----------------------------------

  try {
    const response = await fetch(`${NEW_SWAP_POLKADOT_API}/api/execute-swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as { message?: string };
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: ExecuteSwapResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error executing cross-chain swap:', error);
    throw error;
  }
}

// Function to check the health of the swap API
export async function checkSwapAPIHealth(): Promise<HealthCheckResponse> {
  // ----------------------------------- FAKE DATA -----------------------------------
  if (FAKE) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return {
      success: true,
      message: 'Cross-chain swap API is running (fake mode)',
      timestamp: new Date().toISOString(),
    };
  }
  // ----------------------------------- REAL API -----------------------------------

  try {
    const response = await fetch(`${NEW_SWAP_POLKADOT_API}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})) as { message?: string };
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data: HealthCheckResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking swap API health:', error);
    throw error;
  }
}

// Function to get tokens from 1inch API (based on your example)
export async function getTokensFrom1inch(): Promise<OneInchTokensResponse> {
  const url = "https://api.1inch.dev/token/v1.3/1";

  const config = {
    headers: {
      Authorization: "Bearer EGdhaG7rsXWcTNxasiGKTWQNy8EB2RYX",
    },
    params: {
      provider: "1inch",
      country: "US",
    },
    paramsSerializer: {
      indexes: null,
    },
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: config.headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as OneInchTokensResponse;
    return data;
  } catch (error) {
    console.error('Error fetching tokens from 1inch:', error);
    throw error;
  }
}
