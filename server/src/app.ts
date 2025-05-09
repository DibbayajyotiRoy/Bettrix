import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { testConnection } from './config/database';
// import tradingRoutes from './domains/trading/routes';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// // Routes
// app.use('/api/markets', tradingRoutes);

// Health check
app.get('/health', async (req, res) => {
  await testConnection();
  res.status(200).json({ status: 'healthy' });
});

export default app;