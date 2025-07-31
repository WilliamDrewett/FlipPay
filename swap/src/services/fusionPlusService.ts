import axios from 'axios';
import { logger } from '../utils/logger';

interface FusionSwapResult {
  txHash: string;
  usdcAmount: string;
  gasUsed: string;
}

interface FusionQuoteResponse {
  dstAmount: string;
  srcToken: string;
  dstToken: string;
  protocols: any[];
  tx: {
    to: string;
    data: string;
    value: string;
    gas: string;
    gasPrice: string;
  };
}

export class FusionPlusService {
  private apiKey: string;
  private baseUrl: string;
  private chainId: number;

  constructor() {
    this.apiKey = process.env.ONEINCH_API_KEY || '';
    this.baseUrl = 'https://api.1inch.dev';
    this.chainId = parseInt(process.env.ETHEREUM_CHAIN_ID || '1'); // 1 for mainnet, 11155111 for sepolia
    
    if (!this.apiKey) {
      logger.warn('1inch API key not provided. Some functionality may be limited.');
    }
  }

  async swapEthToUsdc(ethAmount: string, fromAddress: string): Promise<FusionSwapResult> {
    try {
      logger.info(`Initiating Fusion+ ETH to USDC swap for ${ethAmount} ETH`);

      // ETH and USDC token addresses
      const ETH_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETH placeholder
      const USDC_ADDRESS = this.getUsdcAddress();
      
      // Convert ETH amount to wei
      const amountWei = this.ethToWei(ethAmount);

      // Step 1: Get quote from 1inch
      const quote = await this.getSwapQuote(
        ETH_ADDRESS,
        USDC_ADDRESS,
        amountWei,
        fromAddress
      );

      // Step 2: Execute swap (in a real implementation, this would involve
      // sending the transaction through a wallet or signing service)
      logger.info('Fusion+ quote received:', {
        srcToken: quote.srcToken,
        dstToken: quote.dstToken,
        dstAmount: quote.dstAmount,
        gasEstimate: quote.tx.gas
      });

      // For now, we'll simulate the transaction
      // In a real implementation, you would:
      // 1. Sign the transaction using a wallet service
      // 2. Submit to the network
      // 3. Wait for confirmation
      const simulatedTxHash = this.generateSimulatedTxHash();
      
      // Convert USDC amount from smallest unit
      const usdcAmount = this.formatUsdcAmount(quote.dstAmount);

      logger.info(`Fusion+ swap completed: ${ethAmount} ETH -> ${usdcAmount} USDC`);

      return {
        txHash: simulatedTxHash,
        usdcAmount,
        gasUsed: quote.tx.gas
      };

    } catch (error) {
      logger.error('Fusion+ swap failed:', error);
      throw new Error(`Fusion+ swap failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async getSwapQuote(
    srcToken: string,
    dstToken: string,
    amount: string,
    fromAddress: string
  ): Promise<FusionQuoteResponse> {
    const params = new URLSearchParams({
      src: srcToken,
      dst: dstToken,
      amount: amount,
      from: fromAddress,
      slippage: '1', // 1% slippage
      disableEstimate: 'false',
      allowPartialFill: 'false'
    });

    const response = await axios.get(
      `${this.baseUrl}/swap/v6.0/${this.chainId}/swap?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status !== 200) {
      throw new Error(`1inch API error: ${response.statusText}`);
    }

    return response.data;
  }

  private getUsdcAddress(): string {
    // USDC contract addresses for different networks
    const usdcAddresses: { [chainId: number]: string } = {
      1: '0xA0b86a33E6441066CE6b8B0d5A5a57d4E47e0b12', // Mainnet USDC
      11155111: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238' // Sepolia testnet USDC
    };

    const address = usdcAddresses[this.chainId];
    if (!address) {
      throw new Error(`USDC address not configured for chain ID ${this.chainId}`);
    }

    return address;
  }

  private ethToWei(ethAmount: string): string {
    const eth = parseFloat(ethAmount);
    const wei = eth * 1e18;
    return Math.floor(wei).toString();
  }

  private formatUsdcAmount(usdcWei: string): string {
    // USDC has 6 decimal places
    const usdc = parseInt(usdcWei) / 1e6;
    return usdc.toFixed(6);
  }

  private generateSimulatedTxHash(): string {
    // Generate a simulated transaction hash for testing
    // In production, this would be the actual transaction hash
    return '0x' + Math.random().toString(16).substring(2, 66).padStart(64, '0');
  }

  // Helper method to check if Fusion+ is available for the current network
  async checkFusionAvailability(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/healthcheck`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.status === 200;
    } catch (error) {
      logger.error('Fusion+ availability check failed:', error);
      return false;
    }
  }
} 