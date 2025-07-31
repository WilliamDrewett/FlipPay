import axios from 'axios';
import { logger } from '../utils/logger';

interface TokenPriceResponse {
  token: string;
  price_usd: number;
  chain_id: number;
  source: string;
  timestamp: number;
}

// 1inch Price API response format
interface OneInchPriceResponse {
  [tokenAddress: string]: string; // price as string
}

export class PriceService {
  private apiKey: string;
  private baseUrl: string;
  
  // Token addresses for price queries
  private tokenAddresses = {
    'ETH': '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // ETH placeholder
    'DOT': '0x7083609fce4d1d8dc0c979aab8c869ea2c873402', // Polkadot (DOT) on Ethereum
  };

  constructor() {
    this.apiKey = process.env.ONEINCH_API_KEY || '';
    this.baseUrl = 'https://api.1inch.dev';
    
    // Debug logging to check environment variables
    logger.info('PriceService initialized', {
      hasApiKey: !!this.apiKey,
      apiKeyLength: this.apiKey.length,
      apiKeyStart: this.apiKey ? this.apiKey.substring(0, 8) + '...' : 'undefined'
    });
    
    if (!this.apiKey) {
      logger.warn('1inch API key not provided. Price endpoints may be limited.');
    }
  }

  async getTokenPriceUsd(tokenSymbol: string, chainId: number = 1): Promise<TokenPriceResponse | null> {
    try {
      if (!(tokenSymbol in this.tokenAddresses)) {
        throw new Error(`Token ${tokenSymbol} not supported. Supported tokens: ${Object.keys(this.tokenAddresses).join(', ')}`);
      }

      const tokenAddress = this.tokenAddresses[tokenSymbol as keyof typeof this.tokenAddresses];

      // Use 1inch Price API v1.1 with correct endpoint
      const url = `${this.baseUrl}/price/v1.1/${chainId}`;
      
      const headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      };

      // Request body for price API (correct format)
      const payload = {
        tokens: [tokenAddress],
        currency: 'USD'
      };

      logger.info(`Getting ${tokenSymbol} price from 1inch Price API`, { tokenAddress, chainId });

      const response = await axios.post<OneInchPriceResponse>(url, payload, { headers });

      if (response.status === 200) {
        const data = response.data;
        
        // Get price from the response (normalize address to lowercase for lookup)
        const priceString = data[tokenAddress.toLowerCase()];
        
        if (!priceString) {
          logger.error(`No price data returned for ${tokenSymbol} (${tokenAddress})`);
          return null;
        }

        const priceUsd = parseFloat(priceString);

        const result: TokenPriceResponse = {
          token: tokenSymbol,
          price_usd: Math.round(priceUsd * 1000000) / 1000000, // Round to 6 decimal places
          chain_id: chainId,
          source: '1inch',
          timestamp: Math.floor(Date.now() / 1000)
        };

        logger.info(`${tokenSymbol} price retrieved successfully`, result);
        return result;
      } else {
        logger.error(`1inch API error for ${tokenSymbol}:`, {
          status: response.status,
          data: response.data
        });
        return null;
      }

    } catch (error) {
      logger.error(`Error getting ${tokenSymbol} price:`, error);
      return null;
    }
  }

  async getEthPriceUsd(chainId: number = 1): Promise<TokenPriceResponse | null> {
    return this.getTokenPriceUsd('ETH', chainId);
  }

  async getPolkadotPriceUsd(chainId: number = 1): Promise<TokenPriceResponse | null> {
    return this.getTokenPriceUsd('DOT', chainId);
  }

  async getMultiplePrices(tokens: string[], chainId: number = 1): Promise<{ [token: string]: TokenPriceResponse | null }> {
    try {
      // Get all token addresses
      const tokenAddresses = tokens.map(token => {
        if (!(token in this.tokenAddresses)) {
          throw new Error(`Token ${token} not supported`);
        }
        return this.tokenAddresses[token as keyof typeof this.tokenAddresses];
      });

      const url = `${this.baseUrl}/price/v1.1/${chainId}`;
      
      const headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      };

      const payload = {
        tokens: tokenAddresses,
        currency: 'USD'
      };

      logger.info(`Getting multiple prices from 1inch Price API`, { tokens, chainId });

      const response = await axios.post<OneInchPriceResponse>(url, payload, { headers });

      const results: { [token: string]: TokenPriceResponse | null } = {};

      if (response.status === 200) {
        const data = response.data;

        tokens.forEach((token, index) => {
          const tokenAddress = tokenAddresses[index];
          const priceString = data[tokenAddress.toLowerCase()];
          
          if (priceString) {
            const priceUsd = parseFloat(priceString);
            results[token] = {
              token,
              price_usd: Math.round(priceUsd * 1000000) / 1000000,
              chain_id: chainId,
              source: '1inch',
              timestamp: Math.floor(Date.now() / 1000)
            };
          } else {
            results[token] = null;
          }
        });

        logger.info('Multiple prices retrieved successfully', results);
      } else {
        logger.error('1inch API error for multiple prices:', {
          status: response.status,
          data: response.data
        });
        
        // Set all results to null on error
        tokens.forEach(token => {
          results[token] = null;
        });
      }

      return results;
    } catch (error) {
      logger.error('Error getting multiple prices:', error);
      
      // Return null for all tokens on error
      const results: { [token: string]: TokenPriceResponse | null } = {};
      tokens.forEach(token => {
        results[token] = null;
      });
      return results;
    }
  }

  // Helper method to check if 1inch API is available
  async checkApiAvailability(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/healthcheck`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });
      return response.status === 200;
    } catch (error) {
      logger.error('1inch API availability check failed:', error);
      return false;
    }
  }
} 