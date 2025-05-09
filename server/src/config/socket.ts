// Socket.io configuration
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { env } from './env';

export async function initSocket(httpServer: any) {
  const io = new Server(httpServer, {
    cors: {
      origin: env.CLIENT_URL
    }
  });

  // Redis setup
  const pubClient = createClient({ url: env.REDIS_URL });
  const subClient = pubClient.duplicate();
  
  await Promise.all([pubClient.connect(), subClient.connect()]);
  io.adapter(createAdapter(pubClient, subClient));

  // Market events namespace
  io.of('/markets').on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('joinMarket', (marketId: string) => {
      socket.join(`market_${marketId}`);
      console.log(`Client joined market ${marketId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
}