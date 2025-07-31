import { logger } from '../utils/logger';
import { Keyring } from "@polkadot/keyring";
import { Context, contextConfigFor, historyV2, toPolkadotV2 } from "@snowbridge/api";
import { formatEther, Wallet } from "ethers";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { assetRegistryFor } from "@snowbridge/registry";
import { setTimeout } from "timers/promises";

interface BridgeResult {
  txHash: string;
  messageId: string;
  blockNumber: number;
  status: string;
}

export class SnowbridgeService {
  private environment: string;
  private destinationParachain: number;
  private ethereumWallet: Wallet | null = null;
  private polkadotAccount: any = null;
  private context: Context | null = null;

  constructor() {
    // Environment should be 'polkadot_mainnet' for production or 'westend_sepolia' for testing
    this.environment = process.env.SNOWBRIDGE_ENVIRONMENT || 'westend_sepolia';
    // AssetHub parachain ID is typically 1000 for Polkadot, 1000 for Westend
    this.destinationParachain = parseInt(process.env.DESTINATION_PARACHAIN || '1000');
  }

  async bridgeUsdcToPolkadot(usdcAmount: string, dotAddress: string): Promise<BridgeResult> {
    try {
      logger.info(`Initiating Snowbridge transfer: ${usdcAmount} USDC to ${dotAddress}`);

      await this.initializeContext();
      await this.initializeWallets();

      const usdcContractAddress = this.getUsdcContractAddress();
      const registry = assetRegistryFor(this.environment);

      // Step 1: Get delivery fee
      const fee = await toPolkadotV2.getDeliveryFee(
        this.context!,
        registry,
        usdcContractAddress,
        this.destinationParachain
      );

      logger.info(`Snowbridge delivery fee: ${formatEther(fee.totalFeeInWei)} ETH`);

      // Step 2: Create transfer
      const amount = this.parseUsdcAmount(usdcAmount);
      const transfer = await toPolkadotV2.createTransfer(
        registry,
        await this.ethereumWallet!.getAddress(),
        dotAddress,
        usdcContractAddress,
        this.destinationParachain,
        amount,
        fee
      );

      // Step 3: Validate transfer
      const validation = await toPolkadotV2.validateTransfer(
        this.context!,
        transfer
      );

      if (!validation.success) {
        logger.error('Snowbridge validation failed:', validation.logs);
        throw new Error('Bridge transfer validation failed');
      }

      logger.info('Snowbridge validation successful');

      // Step 4: Submit transaction
      const { tx } = transfer;
      const response = await this.ethereumWallet!.sendTransaction(tx);
      const receipt = await response.wait(1);

      if (!receipt) {
        throw new Error(`Transaction ${response.hash} not included`);
      }

      logger.info(`Snowbridge transaction submitted: ${receipt.hash}`);

      // Step 5: Get message receipt
      const message = await toPolkadotV2.getMessageReceipt(receipt);
      if (!message) {
        throw new Error(`Transaction ${receipt.hash} did not emit a message`);
      }

      logger.info(`Snowbridge message created with ID: ${message.messageId}`);

      // Step 6: Monitor transfer status (we'll check a few times, but won't wait indefinitely)
      await this.monitorTransfer(message.messageId);

      return {
        txHash: receipt.hash,
        messageId: message.messageId,
        blockNumber: message.blockNumber,
        status: 'submitted'
      };

    } catch (error) {
      logger.error('Snowbridge transfer failed:', error);
      throw new Error(`Snowbridge transfer failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      await this.cleanup();
    }
  }

  private async initializeContext(): Promise<void> {
    await cryptoWaitReady();
    this.context = new Context(contextConfigFor(this.environment));
    logger.info(`Snowbridge context initialized for ${this.environment}`);
  }

  private async initializeWallets(): Promise<void> {
    // Initialize Ethereum wallet
    const ethereumKey = process.env.ETHEREUM_KEY;
    if (!ethereumKey) {
      throw new Error('ETHEREUM_KEY environment variable not set');
    }

    this.ethereumWallet = new Wallet(ethereumKey, this.context!.ethereum());

    // Initialize Polkadot account
    const substrateKey = process.env.SUBSTRATE_KEY;
    if (!substrateKey) {
      throw new Error('SUBSTRATE_KEY environment variable not set');
    }

    const polkadotKeyring = new Keyring({ type: "sr25519" });
    this.polkadotAccount = polkadotKeyring.addFromUri(substrateKey);

    logger.info('Snowbridge wallets initialized');
  }

  private getUsdcContractAddress(): string {
    // USDC contract addresses for different environments
    const usdcAddresses: { [env: string]: string } = {
      'polkadot_mainnet': '0xA0b86a33E6441066CE6b8B0d5A5a57d4E47e0b12', // Mainnet USDC
      'westend_sepolia': '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238' // Sepolia testnet USDC
    };

    const address = usdcAddresses[this.environment];
    if (!address) {
      throw new Error(`USDC address not configured for environment ${this.environment}`);
    }

    return address;
  }

  private parseUsdcAmount(usdcAmount: string): bigint {
    // USDC has 6 decimal places
    const amount = parseFloat(usdcAmount);
    return BigInt(Math.floor(amount * 1e6));
  }

  private async monitorTransfer(messageId: string): Promise<void> {
    logger.info(`Monitoring Snowbridge transfer ${messageId}...`);
    
    let attempts = 0;
    const maxAttempts = 5; // Check 5 times max
    
    while (attempts < maxAttempts) {
      try {
        const status = await historyV2.toPolkadotTransferById(
          this.context!.graphqlApiUrl(),
          messageId
        );

        if (status !== undefined && status.status !== historyV2.TransferStatus.Pending) {
          logger.info(`Snowbridge transfer ${messageId} completed with status: ${historyV2.TransferStatus[status.status]}`);
          return;
        }

        logger.info(`Snowbridge transfer ${messageId} still pending (attempt ${attempts + 1}/${maxAttempts})`);
        attempts++;

        if (attempts < maxAttempts) {
          await setTimeout(30_000); // Wait 30 seconds between checks
        }
      } catch (error) {
        logger.error(`Error checking transfer status:`, error);
        attempts++;
      }
    }

    logger.info(`Stopped monitoring transfer ${messageId} after ${maxAttempts} attempts`);
  }

  private async cleanup(): Promise<void> {
    if (this.context) {
      await this.context.destroyContext();
      this.context = null;
    }
  }
} 