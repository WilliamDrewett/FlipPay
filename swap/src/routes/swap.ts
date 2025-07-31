import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';
import { SwapService } from '../services/swapService';
import { wsService } from '../services/websocketService';

const router = Router();
const swapService = new SwapService();

interface SwapRequest {
  fromEthToDot: boolean;
  payAmount: string;
  ethAddress: string;
  dotAddress: string;
}

// POST /api/swap
router.post('/swap', async (req: Request, res: Response) => {
  try {
    const { fromEthToDot, payAmount, ethAddress, dotAddress }: SwapRequest = req.body;

    // Validate request
    if (typeof fromEthToDot !== 'boolean') {
      return res.status(400).json({ error: 'fromEthToDot must be a boolean' });
    }

    if (!payAmount || !ethAddress || !dotAddress) {
      return res.status(400).json({ 
        error: 'Missing required fields: payAmount, ethAddress, dotAddress' 
      });
    }

    // Validate Ethereum address
    if (!/^0x[a-fA-F0-9]{40}$/.test(ethAddress)) {
      return res.status(400).json({ error: 'Invalid Ethereum address' });
    }

    // Validate amount
    const amount = parseFloat(payAmount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const swapId = uuidv4();
    
    logger.info(`Initiating swap ${swapId}:`, {
      fromEthToDot,
      payAmount,
      ethAddress,
      dotAddress
    });

    // Send immediate response with swap ID
    res.json({
      success: true,
      swapId,
      message: 'Swap initiated successfully',
      estimatedTime: '5-10 minutes'
    });

    // Send initial WebSocket update
    wsService.sendToSwap(swapId, {
      status: 'initiated',
      message: 'Swap request received and validated'
    });

    // Process swap asynchronously
    swapService.processSwap({
      swapId,
      fromEthToDot,
      payAmount,
      ethAddress,
      dotAddress
    }).catch(error => {
      logger.error(`Swap ${swapId} failed:`, error);
      wsService.sendToSwap(swapId, {
        status: 'failed',
        message: `Swap failed: ${error.message}`
      });
    });

  } catch (error) {
    logger.error('Error in /swap endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process swap request'
    });
  }
});

// GET /api/swap/:swapId/status
router.get('/swap/:swapId/status', async (req: Request, res: Response) => {
  try {
    const { swapId } = req.params;
    const status = await swapService.getSwapStatus(swapId);
    
    if (!status) {
      return res.status(404).json({ error: 'Swap not found' });
    }

    res.json(status);
  } catch (error) {
    logger.error('Error getting swap status:', error);
    res.status(500).json({ error: 'Failed to get swap status' });
  }
});

export const swapRouter = router; 