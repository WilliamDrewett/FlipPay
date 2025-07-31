import dotenv from 'dotenv';
import path from 'path';

// Load environment variables FIRST - before any other imports that might need them
const envPath = path.resolve(__dirname, '../.env');
const result = dotenv.config({ path: envPath });

// Now import everything else
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { swapRouter } from './routes/swap';
import { priceRouter } from './routes/price';
import { logger } from './utils/logger';
import { setupWebSocket } from './services/websocketService';

// Debug environment loading
if (result.error) {
  logger.warn('Failed to load .env file', { error: result.error.message, envPath });
} else {
  logger.info('Environment variables loaded successfully', { 
    envPath,
    hasOneInchKey: !!process.env.ONEINCH_API_KEY,
    port: process.env.PORT
  });
}

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    body: req.body,
    query: req.query,
    headers: req.headers
  });
  next();
});

// Routes
app.use('/api', swapRouter);
app.use('/api/price', priceRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Setup WebSocket for real-time updates
setupWebSocket(wss);

// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`WebSocket server ready for connections`);
}); 