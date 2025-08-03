import express, { Request, Response, NextFunction } from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import cors from 'cors';

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Types
interface SwapStep {
  step: string;
  command: string;
  success: boolean;
  output?: string;
  error?: string;
  timestamp: string;
}

interface SwapResponse {
  success: boolean;
  message: string;
  orderId?: string;
  steps: SwapStep[];
  totalTime: string;
}

// Helper function to execute npm scripts
async function executeScript(command: string, env?: Record<string, string>): Promise<{ success: boolean; output?: string; error?: string }> {
  try {
    const options = {
      cwd: process.cwd(),
      env: { ...process.env, ...env },
      timeout: 300000, // 5 minutes timeout
    };

    const { stdout, stderr } = await execAsync(command, options);

    return {
      success: true,
      output: stdout,
      error: stderr || undefined,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
      output: error.stdout || undefined,
    };
  }
}

// Extract order ID from script output
function extractOrderId(output: string): string | undefined {
  // Look for the specific order ID format: fromChain_toChain_order_timestamp
  const orderIdPatterns = [
    /Order ID:\s*([a-z]+_[a-z]+_order_\d+)/i,
    /📄 Order ID:\s*([a-z]+_[a-z]+_order_\d+)/i,
    /ORDER_ID[:\s]*([a-z]+_[a-z]+_order_\d+)/i,
    /([a-z]+_[a-z]+_order_\d+)/g, // Global search for the pattern
  ];

  for (const pattern of orderIdPatterns) {
    const match = output.match(pattern);
    if (match) {
      return match[1];
    }
  }

  // Fallback: look for any mention of order IDs in the output
  console.log('🔍 Debug: Full output for order ID extraction:');
  console.log('---START OUTPUT---');
  console.log(output);
  console.log('---END OUTPUT---');

  return undefined;
}

/**
 * POST /api/execute-swap
 * Executes the complete cross-chain swap process:
 * 1. Creates an order
 * 2. Creates escrow contracts
 * 3. Executes the atomic swap
 */
app.post('/api/execute-swap', async (req: Request, res: Response) => {
  const startTime = Date.now();
  const steps: SwapStep[] = [];
  let orderId: string | undefined;

  try {
    console.log('🚀 Starting complete cross-chain swap process...');

    // Step 1: Create Order
    console.log('📝 Step 1: Creating order...');

    const orderResult = await executeScript('npm run create:order');

    steps.push({
      step: '1-create-order',
      command: 'npm run create:order',
      success: orderResult.success,
      output: orderResult.output,
      error: orderResult.error,
      timestamp: new Date().toISOString(),
    });

    if (!orderResult.success) {
      const totalTime = `${Date.now() - startTime}ms`;
      console.error('❌ Failed at order creation step');
      return res.status(500).json({
        success: false,
        message: 'Failed to create order',
        steps,
        totalTime,
      } as SwapResponse);
    }

    // Extract order ID
    orderId = extractOrderId(orderResult.output || '');
    console.log(`🔍 Extracted Order ID: "${orderId}"`);
    
    if (!orderId) {
      const totalTime = `${Date.now() - startTime}ms`;
      console.error('❌ Could not extract order ID from output');
      console.error('📝 Output was:', orderResult.output);
      return res.status(500).json({
        success: false,
        message: 'Could not extract order ID from create order output',
        debug: {
          output: orderResult.output,
          availablePatterns: ['Order ID:', '📄 Order ID:', 'ORDER_ID']
        },
        steps,
        totalTime,
      } as SwapResponse);
    }

    console.log(`✅ Order created successfully: ${orderId}`);

    // Step 2: Create Escrow
    console.log(`🔒 Step 2: Creating escrow for order ${orderId}...`);
    
    const escrowResult = await executeScript(`ORDER_ID=${orderId} npm run create:escrow`, {
      ORDER_ID: orderId,
    });

    steps.push({
      step: '2-create-escrow',
      command: `ORDER_ID=${orderId} npm run create:escrow`,
      success: escrowResult.success,
      output: escrowResult.output,
      error: escrowResult.error,
      timestamp: new Date().toISOString(),
    });

    if (!escrowResult.success) {
      const totalTime = `${Date.now() - startTime}ms`;
      console.error('❌ Failed at escrow creation step');
      console.error('🔍 Escrow error:', escrowResult.error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create escrow contracts',
        orderId,
        steps,
        totalTime,
        debug: {
          escrowError: escrowResult.error,
          escrowOutput: escrowResult.output
        }
      } as SwapResponse);
    }

    console.log(`✅ Escrow created successfully for order: ${orderId}`);

    // Step 3: Execute Swap
    console.log(`⚡ Step 3: Executing swap for order ${orderId}...`);
    
    const swapResult = await executeScript(`ORDER_ID=${orderId} npm run execute:swap`, {
      ORDER_ID: orderId,
    });

    steps.push({
      step: '3-execute-swap',
      command: `ORDER_ID=${orderId} npm run execute:swap`,
      success: swapResult.success,
      output: swapResult.output,
      error: swapResult.error,
      timestamp: new Date().toISOString(),
    });

    if (!swapResult.success) {
      const totalTime = `${Date.now() - startTime}ms`;
      console.error('❌ Failed at swap execution step');
      console.error('🔍 Swap error:', swapResult.error);
      console.error('🔍 Swap output:', swapResult.output);
      return res.status(500).json({
        success: false,
        message: 'Failed to execute atomic swap',
        orderId,
        steps,
        totalTime,
        debug: {
          swapError: swapResult.error,
          swapOutput: swapResult.output,
          orderIdUsed: orderId
        }
      } as SwapResponse);
    }

    const totalTime = `${Date.now() - startTime}ms`;
    console.log(`🎉 Complete swap process finished successfully in ${totalTime}`);

    res.status(200).json({
      success: true,
      message: 'Cross-chain swap completed successfully',
      orderId,
      steps,
      totalTime,
    } as SwapResponse);

  } catch (error: any) {
    const totalTime = `${Date.now() - startTime}ms`;
    console.error('💥 Unexpected error during swap process:', error);
    
    res.status(500).json({
      success: false,
      message: 'Internal server error during swap process',
      orderId,
      steps,
      totalTime,
      error: error.message,
    } as SwapResponse);
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Cross-chain swap API is running',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message,
  });
});

// 404 handler - Fixed the wildcard route
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
    method: req.method,
    available_endpoints: [
      'POST /api/execute-swap',
      'GET /api/health'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Cross-chain swap API server running on port ${PORT}`);
  console.log(`📖 Available endpoints:`);
  console.log(`   POST /api/execute-swap - Execute complete swap process`);
  console.log(`   GET  /api/health - Health check`);
  console.log(`\n💡 Usage: curl -X POST http://localhost:${PORT}/api/execute-swap`);
});

export default app;