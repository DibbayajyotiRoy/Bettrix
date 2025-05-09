import { createServer } from 'http';
import app from './src/app'; 
import { initSocket } from './src/config/socket';
import { env } from './src/config/env';

const server = createServer(app);
const port = env.PORT || 3000;

// Initialize WebSocket
initSocket(server).then(io => {
  console.log('✅ WebSocket server ready');
});

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});