<script lang="ts">
  import { onMount } from 'svelte';
  import { executeCrossChainSwap, checkSwapAPIHealth, getTokensFrom1inch } from '../../api/swap2';
  import type { ExecuteSwapResponse, SwapStep, HealthCheckResponse } from '../../api/swap2';

  let isExecuting = false;
  let swapResult: ExecuteSwapResponse | null = null;
  let healthStatus: HealthCheckResponse | null = null;
  let tokens: any = null;
  let error: string | null = null;

  // Check API health on component mount
  onMount(async () => {
    try {
      healthStatus = await checkSwapAPIHealth();
    } catch (err) {
      error = `Health check failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
    }
  });

  // Execute cross-chain swap
  async function handleExecuteSwap() {
    isExecuting = true;
    error = null;
    swapResult = null;

    try {
      swapResult = await executeCrossChainSwap();
    } catch (err) {
      error = `Swap execution failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
    } finally {
      isExecuting = false;
    }
  }

  // Get tokens from 1inch
  async function handleGetTokens() {
    try {
      tokens = await getTokensFrom1inch();
    } catch (err) {
      error = `Failed to get tokens: ${err instanceof Error ? err.message : 'Unknown error'}`;
    }
  }

  // Helper function to format step status
  function getStepStatus(step: SwapStep): string {
    if (step.success) {
      return '✅ Success';
    } else {
      return '❌ Failed';
    }
  }
</script>

<div class="cross-chain-swap">
  <h2>Cross-Chain Swap API</h2>
  
  <!-- Health Status -->
  <div class="health-status">
    <h3>API Health Status</h3>
    {#if healthStatus}
      <div class="status {healthStatus.success ? 'success' : 'error'}">
        <span>{healthStatus.success ? '✅' : '❌'}</span>
        <span>{healthStatus.message}</span>
        <small>Last checked: {new Date(healthStatus.timestamp).toLocaleString()}</small>
      </div>
    {:else}
      <div class="status loading">Loading...</div>
    {/if}
  </div>

  <!-- Error Display -->
  {#if error}
    <div class="error-message">
      <strong>Error:</strong> {error}
    </div>
  {/if}

  <!-- Action Buttons -->
  <div class="actions">
    <button 
      on:click={handleExecuteSwap} 
      disabled={isExecuting}
      class="primary-button"
    >
      {isExecuting ? 'Executing Swap...' : 'Execute Cross-Chain Swap'}
    </button>

    <button 
      on:click={handleGetTokens} 
      class="secondary-button"
    >
      Get Tokens from 1inch
    </button>
  </div>

  <!-- Swap Result -->
  {#if swapResult}
    <div class="swap-result">
      <h3>Swap Execution Result</h3>
      
      <div class="result-summary">
        <div class="status {swapResult.success ? 'success' : 'error'}">
          <strong>{swapResult.success ? '✅ Success' : '❌ Failed'}</strong>
        </div>
        <p><strong>Message:</strong> {swapResult.message}</p>
        {#if swapResult.orderId}
          <p><strong>Order ID:</strong> <code>{swapResult.orderId}</code></p>
        {/if}
        <p><strong>Total Time:</strong> {swapResult.totalTime}</p>
      </div>

      <!-- Steps Details -->
      <div class="steps-details">
        <h4>Execution Steps:</h4>
        {#each swapResult.steps as step, index}
          <div class="step">
            <div class="step-header">
              <span class="step-number">{index + 1}</span>
              <span class="step-name">{step.step}</span>
              <span class="step-status">{getStepStatus(step)}</span>
            </div>
            
            <div class="step-details">
              <p><strong>Command:</strong> <code>{step.command}</code></p>
              <p><strong>Timestamp:</strong> {new Date(step.timestamp).toLocaleString()}</p>
              
              {#if step.output}
                <details>
                  <summary>Output</summary>
                  <pre>{step.output}</pre>
                </details>
              {/if}
              
              {#if step.error}
                <details>
                  <summary>Error</summary>
                  <pre class="error">{step.error}</pre>
                </details>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Tokens Result -->
  {#if tokens}
    <div class="tokens-result">
      <h3>1inch Tokens</h3>
      <details>
        <summary>View Tokens Data</summary>
        <pre>{JSON.stringify(tokens, null, 2)}</pre>
      </details>
    </div>
  {/if}
</div>

<style>
  .cross-chain-swap {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  h2 {
    color: #333;
    margin-bottom: 20px;
  }

  h3 {
    color: #555;
    margin-top: 30px;
    margin-bottom: 15px;
  }

  .health-status {
    margin-bottom: 20px;
  }

  .status {
    padding: 10px 15px;
    border-radius: 6px;
    margin-bottom: 10px;
  }

  .status.success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .status.error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  .status.loading {
    background-color: #e2e3e5;
    color: #383d41;
    border: 1px solid #d6d8db;
  }

  .error-message {
    background-color: #f8d7da;
    color: #721c24;
    padding: 10px 15px;
    border-radius: 6px;
    margin-bottom: 20px;
    border: 1px solid #f5c6cb;
  }

  .actions {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .primary-button, .secondary-button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .primary-button {
    background-color: #007bff;
    color: white;
  }

  .primary-button:hover:not(:disabled) {
    background-color: #0056b3;
  }

  .primary-button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  .secondary-button {
    background-color: #6c757d;
    color: white;
  }

  .secondary-button:hover {
    background-color: #545b62;
  }

  .swap-result, .tokens-result {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
  }

  .result-summary {
    margin-bottom: 20px;
  }

  .result-summary p {
    margin: 5px 0;
  }

  .steps-details {
    margin-top: 20px;
  }

  .step {
    border: 1px solid #dee2e6;
    border-radius: 6px;
    margin-bottom: 15px;
    overflow: hidden;
  }

  .step-header {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background-color: #e9ecef;
    border-bottom: 1px solid #dee2e6;
  }

  .step-number {
    background-color: #007bff;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    margin-right: 10px;
  }

  .step-name {
    flex: 1;
    font-weight: 500;
  }

  .step-status {
    font-size: 12px;
    font-weight: 500;
  }

  .step-details {
    padding: 15px;
  }

  .step-details p {
    margin: 5px 0;
  }

  code {
    background-color: #f1f3f4;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
  }

  pre {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 10px;
    overflow-x: auto;
    font-size: 12px;
    margin: 10px 0;
  }

  pre.error {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
  }

  details {
    margin: 10px 0;
  }

  summary {
    cursor: pointer;
    font-weight: 500;
    color: #007bff;
  }

  summary:hover {
    color: #0056b3;
  }

  small {
    color: #6c757d;
    font-size: 12px;
  }
</style> 