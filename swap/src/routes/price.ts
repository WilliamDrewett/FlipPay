import { Router, Request, Response } from 'express';
import { PriceService } from '../services/priceService';
import { logger } from '../utils/logger';

const router = Router();
const priceService = new PriceService();

// GET /api/price/eth - Get ETH price in USD
router.get('/eth', async (req: Request, res: Response) => {
  try {
    const chainId = parseInt(req.query.chainId as string) || 1;
    
    logger.info(`Getting ETH price for chain ${chainId}`);
    
    const priceData = await priceService.getEthPriceUsd(chainId);
    
    if (priceData) {
      res.json({
        success: true,
        data: priceData
      });
    } else {
      res.status(503).json({
        success: false,
        error: 'Unable to fetch ETH price at the moment'
      });
    }
  } catch (error) {
    logger.error('Error in /price/eth endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/price/polkadot - Get Polkadot (DOT) price in USD
router.get('/polkadot', async (req: Request, res: Response) => {
  try {
    const chainId = parseInt(req.query.chainId as string) || 1;
    
    logger.info(`Getting DOT price for chain ${chainId}`);
    
    const priceData = await priceService.getPolkadotPriceUsd(chainId);
    
    if (priceData) {
      res.json({
        success: true,
        data: priceData
      });
    } else {
      res.status(503).json({
        success: false,
        error: 'Unable to fetch Polkadot price at the moment'
      });
    }
  } catch (error) {
    logger.error('Error in /price/polkadot endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/price/multiple - Get multiple token prices
router.get('/multiple', async (req: Request, res: Response) => {
  try {
    const tokens = req.query.tokens as string;
    const chainId = parseInt(req.query.chainId as string) || 1;
    
    if (!tokens) {
      return res.status(400).json({
        success: false,
        error: 'tokens query parameter is required (comma-separated list)'
      });
    }
    
    const tokenList = tokens.split(',').map(t => t.trim().toUpperCase());
    const supportedTokens = tokenList.filter(token => ['ETH', 'DOT'].includes(token));
    
    if (supportedTokens.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No supported tokens found. Supported tokens: ETH, DOT'
      });
    }
    
    logger.info(`Getting multiple prices for tokens: ${supportedTokens.join(', ')}`);
    
    const prices = await priceService.getMultiplePrices(supportedTokens, chainId);
    
    res.json({
      success: true,
      data: prices
    });
  } catch (error) {
    logger.error('Error in /price/multiple endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/price/health - Check if price service is available
router.get('/health', async (req: Request, res: Response) => {
  try {
    const isAvailable = await priceService.checkApiAvailability();
    
    res.json({
      success: true,
      data: {
        service: 'PriceService',
        status: isAvailable ? 'available' : 'unavailable',
        provider: '1inch',
        timestamp: Math.floor(Date.now() / 1000)
      }
    });
  } catch (error) {
    logger.error('Error in /price/health endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

export const priceRouter = router; 