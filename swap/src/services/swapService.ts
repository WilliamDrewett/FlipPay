import { logger } from '../utils/logger';
import { wsService } from './websocketService';
import { FusionPlusService } from './fusionPlusService';
import { SnowbridgeService } from './snowbridgeService';

interface SwapParams {
  swapId: string;
  fromEthToDot: boolean;
  payAmount: string;
  ethAddress: string;
  dotAddress: string;
}

interface SwapStatus {
  swapId: string;
  status: 'initiated' | 'fusion_swap' | 'bridging' | 'completed' | 'failed';
  currentStep: string;
  progress: number; // 0-100
  txHashes?: {
    fusionTx?: string;
    bridgeTx?: string;
  };
  createdAt: string;
  updatedAt: string;
  error?: string;
}

export class SwapService {
  private swaps: Map<string, SwapStatus> = new Map();
  private fusionService: FusionPlusService;
  private bridgeService: SnowbridgeService;

  constructor() {
    this.fusionService = new FusionPlusService();
    this.bridgeService = new SnowbridgeService();
  }

  async processSwap(params: SwapParams): Promise<void> {
    const { swapId, fromEthToDot, payAmount, ethAddress, dotAddress } = params;
    
    // Initialize swap status
    this.updateSwapStatus(swapId, {
      swapId,
      status: 'initiated',
      currentStep: 'Preparing swap...',
      progress: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    try {
      if (fromEthToDot) {
        await this.processEthToDotSwap(swapId, payAmount, ethAddress, dotAddress);
      } else {
        // For future DOT to ETH implementation
        throw new Error('DOT to ETH swaps not yet implemented');
      }
    } catch (error) {
      logger.error(`Swap ${swapId} failed:`, error);
      this.updateSwapStatus(swapId, {
        status: 'failed',
        currentStep: 'Swap failed',
        progress: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
        updatedAt: new Date().toISOString()
      });
    }
  }

  private async processEthToDotSwap(
    swapId: string, 
    payAmount: string, 
    ethAddress: string, 
    dotAddress: string
  ): Promise<void> {
    // Step 1: Fusion+ swap ETH -> USDC
    wsService.sendToSwap(swapId, {
      status: 'fusion_swap',
      message: 'Swapping ETH to USDC using Fusion+'
    });

    this.updateSwapStatus(swapId, {
      status: 'fusion_swap',
      currentStep: 'Swapping ETH to USDC...',
      progress: 25,
      updatedAt: new Date().toISOString()
    });

    const fusionResult = await this.fusionService.swapEthToUsdc(
      payAmount,
      ethAddress
    );

    this.updateSwapStatus(swapId, {
      currentStep: 'ETH to USDC swap completed',
      progress: 50,
      txHashes: { fusionTx: fusionResult.txHash },
      updatedAt: new Date().toISOString()
    });

    // Step 2: Bridge USDC to Polkadot using Snowbridge
    wsService.sendToSwap(swapId, {
      status: 'bridging',
      message: 'Bridging USDC to Polkadot using Snowbridge'
    });

    this.updateSwapStatus(swapId, {
      status: 'bridging',
      currentStep: 'Bridging USDC to Polkadot...',
      progress: 75,
      updatedAt: new Date().toISOString()
    });

    const bridgeResult = await this.bridgeService.bridgeUsdcToPolkadot(
      fusionResult.usdcAmount,
      dotAddress
    );

    // Step 3: Complete
    wsService.sendToSwap(swapId, {
      status: 'completed',
      message: 'Swap completed successfully'
    });

    this.updateSwapStatus(swapId, {
      status: 'completed',
      currentStep: 'Swap completed successfully',
      progress: 100,
      txHashes: { 
        fusionTx: fusionResult.txHash,
        bridgeTx: bridgeResult.txHash 
      },
      updatedAt: new Date().toISOString()
    });

    logger.info(`Swap ${swapId} completed successfully`);
  }

  private updateSwapStatus(swapId: string, updates: Partial<SwapStatus>): void {
    const currentStatus = this.swaps.get(swapId);
    const newStatus = { ...currentStatus, ...updates } as SwapStatus;
    this.swaps.set(swapId, newStatus);
  }

  async getSwapStatus(swapId: string): Promise<SwapStatus | null> {
    return this.swaps.get(swapId) || null;
  }
} 