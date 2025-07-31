import { WebSocketServer, WebSocket } from 'ws';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';

interface SwapUpdate {
  swapId: string;
  status: 'initiated' | 'fusion_swap' | 'bridging' | 'completed' | 'failed';
  message: string;
  data?: any;
  timestamp: string;
}

interface SwapUpdateInput {
  status: 'initiated' | 'fusion_swap' | 'bridging' | 'completed' | 'failed';
  message: string;
  data?: any;
}

class WebSocketService {
  private connections: Map<string, WebSocket> = new Map();

  setup(wss: WebSocketServer): void {
    wss.on('connection', (ws: WebSocket) => {
      const connectionId = uuidv4();
      this.connections.set(connectionId, ws);
      
      logger.info(`WebSocket connection established: ${connectionId}`);

      ws.on('message', (message: Buffer) => {
        try {
          const data = JSON.parse(message.toString());
          logger.info(`Received message from ${connectionId}:`, data);
          
          // Handle different message types
          if (data.type === 'subscribe') {
            // Client subscribing to updates for a specific swap
            ws.send(JSON.stringify({
              type: 'subscribed',
              swapId: data.swapId,
              message: `Subscribed to updates for swap ${data.swapId}`
            }));
          }
        } catch (error) {
          logger.error(`Error parsing WebSocket message from ${connectionId}:`, error);
        }
      });

      ws.on('close', () => {
        this.connections.delete(connectionId);
        logger.info(`WebSocket connection closed: ${connectionId}`);
      });

      ws.on('error', (error) => {
        logger.error(`WebSocket error for ${connectionId}:`, error);
        this.connections.delete(connectionId);
      });

      // Send welcome message
      ws.send(JSON.stringify({
        type: 'connected',
        connectionId,
        message: 'Connected to FlipPay swap service'
      }));
    });
  }

  broadcast(update: SwapUpdate): void {
    const message = JSON.stringify(update);
    
    this.connections.forEach((ws, connectionId) => {
      if (ws.readyState === WebSocket.OPEN) {
        try {
          ws.send(message);
        } catch (error) {
          logger.error(`Error sending message to ${connectionId}:`, error);
          this.connections.delete(connectionId);
        }
      } else {
        // Clean up closed connections
        this.connections.delete(connectionId);
      }
    });
  }

  sendToSwap(swapId: string, update: SwapUpdateInput): void {
    this.broadcast({
      swapId,
      ...update,
      timestamp: new Date().toISOString()
    });
  }
}

export const wsService = new WebSocketService();

export const setupWebSocket = (wss: WebSocketServer): void => {
  wsService.setup(wss);
}; 