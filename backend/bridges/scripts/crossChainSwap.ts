// Cross-chain swap using 1inch Fusion + StarkGate bridge
import * as dotenv from 'dotenv';
import { FusionSDK, NetworkEnum, OrderStatus, PrivateKeyProviderConnector, Web3Like } from '@1inch/fusion-sdk';
import { JsonRpcProvider, Wallet, formatUnits, parseUnits } from 'ethers';

dotenv.config();

// Network configuration
const NETWORKS = {
  sepolia: {
    rpcUrl: 'https://sepolia.infura.io/v3/' + (process.env.INFURA_KEY ?? ''),
    networkEnum: NetworkEnum.ETHEREUM, // Fusion SDK uses ETHEREUM for Sepolia testnet
    name: 'Sepolia Testnet'
  }
};

// 1inch Fusion configuration  
const FUSION_CONFIG = {
  url: 'https://api.1inch.dev/fusion',
  authKey: process.env.INCH_API_KEY // You'll need to get this from 1inch Developer Portal
};

interface CrossChainSwapParams {
  network: keyof typeof NETWORKS;
  fromToken: string;           // Source token address on L1
  toToken: string;            // Destination token address on L2
  amount: string;             // Amount in wei
  userL1Address: string;      // User's Ethereum address
  userL2Address: string;      // User's Starknet address
  bridgeableToken?: string;   // Intermediate token for bridging (default: USDC)
}

class CrossChainSwapService {
  private fusionSDK: FusionSDK;
  private wallet: Wallet;
  private provider: JsonRpcProvider;

  constructor(network: keyof typeof NETWORKS) {
    const networkConfig = NETWORKS[network];
    
    // Initialize Ethereum provider
    this.provider = new JsonRpcProvider(networkConfig.rpcUrl);
    this.wallet = new Wallet(process.env.ETHEREUM_KEY!, this.provider);
    
    // Initialize 1inch Fusion connector
    const connector = new PrivateKeyProviderConnector(
      process.env.ETHEREUM_KEY!,
      {
        eth: {
          call: (config: any) => this.provider.call(config)
        },
        extend: () => {}
      } as Web3Like
    );

    // Initialize Fusion SDK
    this.fusionSDK = new FusionSDK({
      url: FUSION_CONFIG.url,
      network: networkConfig.networkEnum,
      blockchainProvider: connector,
      authKey: FUSION_CONFIG.authKey
    });
  }

  /**
   * Execute a complete cross-chain swap
   */
  async executeCrossChainSwap(params: CrossChainSwapParams): Promise<{
    success: boolean;
    l1SwapHash?: string;
    bridgeHash?: string; 
    l2SwapHash?: string;
    error?: string;
  }> {
    try {
      console.log('🚀 Starting cross-chain swap...');
      console.log('From:', params.fromToken, 'on L1');
      console.log('To:', params.toToken, 'on L2');
      console.log('Amount:', formatUnits(params.amount, 18));

      // Step 1: L1 Swap using 1inch Fusion
      console.log('\n📈 Step 1: L1 Swap via 1inch Fusion');
      const l1SwapResult = await this.executeL1Swap(params);
      
      if (!l1SwapResult.success) {
        return { success: false, error: `L1 swap failed: ${l1SwapResult.error}` };
      }

      // Step 2: Bridge tokens L1 → L2
      console.log('\n🌉 Step 2: Bridge via StarkGate');
      const bridgeResult = await this.executeBridge(params, l1SwapResult.outputAmount!);
      
      if (!bridgeResult.success) {
        return { 
          success: false, 
          l1SwapHash: l1SwapResult.txHash,
          error: `Bridge failed: ${bridgeResult.error}` 
        };
      }

      // Step 3: L2 Swap on Starknet (placeholder - needs Cairo contracts)
      console.log('\n🔄 Step 3: L2 Swap on Starknet');
      console.log('⚠️  L2 swap requires Cairo contracts (next TODO)');

      return {
        success: true,
        l1SwapHash: l1SwapResult.txHash,
        bridgeHash: bridgeResult.txHash,
        l2SwapHash: 'pending_cairo_contracts'
      };

    } catch (error) {
      return {
        success: false,
        error: `Cross-chain swap failed: ${error.message}`
      };
    }
  }

  /**
   * Step 1: Execute L1 swap using 1inch Fusion
   */
  private async executeL1Swap(params: CrossChainSwapParams): Promise<{
    success: boolean;
    txHash?: string;
    outputAmount?: string;
    error?: string;
  }> {
    try {
      const bridgeableToken = params.bridgeableToken || '0xA0b86a33E6c6a0D6B1Ad73E2E3E2e0f3E2e2e2e2'; // USDC Sepolia

      // Get quote from 1inch Fusion
      const quoteParams = {
        fromTokenAddress: params.fromToken,
        toTokenAddress: bridgeableToken,
        amount: params.amount,
        walletAddress: params.userL1Address,
        source: 'flippay-hackathon'
      };

      console.log('Getting 1inch Fusion quote...');
      const quote = await this.fusionSDK.getQuote(quoteParams);
      
      const outputAmount = quote.presets[quote.recommendedPreset].auctionEndAmount;
      console.log('Expected output:', formatUnits(outputAmount, 18), 'bridgeable tokens');

      // Create and submit order
      console.log('Creating Fusion order...');
      const preparedOrder = await this.fusionSDK.createOrder(quoteParams);
      
      console.log('Submitting order to 1inch Fusion...');
      const orderInfo = await this.fusionSDK.submitOrder(preparedOrder.order, preparedOrder.quoteId);
      
      console.log('Order Hash:', orderInfo.orderHash);

      // Wait for order to be filled
      console.log('Waiting for resolvers to fill order...');
      const startTime = Date.now();
      const maxWaitTime = 300000; // 5 minutes

      while (Date.now() - startTime < maxWaitTime) {
        try {
          const status = await this.fusionSDK.getOrderStatus(orderInfo.orderHash);
          
          if (status.status === OrderStatus.Filled) {
            console.log('✅ Order filled successfully!');
            console.log('Fills:', status.fills);
            
            // Get transaction hash from fills
            const txHash = status.fills?.[0]?.txHash || 'unknown';
            
            return {
              success: true,
              txHash,
              outputAmount: outputAmount.toString()
            };
          }
          
          if (status.status === OrderStatus.Expired) {
            return { success: false, error: 'Order expired - no resolvers filled it' };
          }
          
          if (status.status === OrderStatus.Cancelled) {
            return { success: false, error: 'Order was cancelled' };
          }
          
          // Wait 2 seconds before checking again
          await new Promise(resolve => setTimeout(resolve, 2000));
          
        } catch (statusError) {
          console.log('Status check error:', statusError.message);
          await new Promise(resolve => setTimeout(resolve, 5000));
        }
      }

      return { success: false, error: 'Timeout waiting for order to be filled' };

    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Step 2: Execute bridge transfer using existing StarkGate bridge
   */
  private async executeBridge(params: CrossChainSwapParams, amount: string): Promise<{
    success: boolean;
    txHash?: string;
    error?: string;
  }> {
    try {
      console.log('🌉 Bridging', formatUnits(amount, 18), 'tokens to Starknet...');
      
      // Import and use existing bridge logic
      const { bridgeTokens } = await import('./bridgeEthToStarknet');
      
      // Bridge the tokens using your existing infrastructure
      const bridgeResult = await bridgeTokens({
        network: params.network,
        tokenAddress: params.bridgeableToken || '0xA0b86a33E6c6a0D6B1Ad73E2E3E2e0f3E2e2e2e2', // USDC Sepolia
        recipient: params.userL2Address,
        amount: amount,
        privateKey: process.env.ETHEREUM_KEY!
      });
      
      if (bridgeResult.success) {
        console.log('✅ Bridge transfer successful!');
        return {
          success: true,
          txHash: bridgeResult.txHash
        };
      } else {
        return {
          success: false,
          error: bridgeResult.error || 'Bridge transfer failed'
        };
      }
      
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// CLI usage
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 6) {
    console.log('Usage: npx ts-node crossChainSwap.ts <network> <fromToken> <toToken> <amount> <userL1Address> <userL2Address>');
    console.log('Example: npx ts-node crossChainSwap.ts sepolia 0x123... 0x456... 1000000000000000000 0xuser1... 0xuser2...');
    process.exit(1);
  }

  const [network, fromToken, toToken, amount, userL1Address, userL2Address] = args;

  if (!NETWORKS[network as keyof typeof NETWORKS]) {
    console.error('❌ Unsupported network. Supported:', Object.keys(NETWORKS).join(', '));
    process.exit(1);
  }

  try {
    const swapService = new CrossChainSwapService(network as keyof typeof NETWORKS);
    
    const result = await swapService.executeCrossChainSwap({
      network: network as keyof typeof NETWORKS,
      fromToken,
      toToken, 
      amount,
      userL1Address,
      userL2Address
    });

    if (result.success) {
      console.log('\n🎉 Cross-chain swap completed successfully!');
      console.log('L1 Swap TX:', result.l1SwapHash);
      console.log('Bridge TX:', result.bridgeHash);
      console.log('L2 Swap TX:', result.l2SwapHash);
    } else {
      console.error('\n❌ Cross-chain swap failed:', result.error);
      process.exit(1);
    }

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { CrossChainSwapService };