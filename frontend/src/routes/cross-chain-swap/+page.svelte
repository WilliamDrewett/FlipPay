<script lang="ts">
  import CrossChainSwap from '../../lib/components/swap/CrossChainSwap.svelte';
</script>

<svelte:head>
  <title>Cross-Chain Swap - FlipPay</title>
  <meta name="description" content="Execute cross-chain swaps between Ethereum and Polkadot" />
</svelte:head>

<div class="page">
  <div class="container">
    <h1>Cross-Chain Swap</h1>
    <p class="description">
      Execute atomic swaps between Ethereum and Polkadot using our cross-chain swap API.
      This demo shows how to use the new swap API with proper TypeScript interfaces.
    </p>
    
    <CrossChainSwap />
  </div>
</div>

<style>
  .page {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 20px 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 10px;
    font-size: 2.5rem;
    font-weight: 700;
  }

  .description {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
</style> 