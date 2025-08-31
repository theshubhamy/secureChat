//server.js
import { createServer } from 'http';
import app from './app.js';
import { envConfig, dbConnection, redisClient } from './config/index.js';

// Create HTTP server for Express app
const server = createServer(app);
//  Attach Socket.IO to the same HTTP server
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // TODO: Restrict to frontend domain in production
    methods: ['GET', 'POST'],
  },
});

// Register WebSocket (signal) handlers
registerSignalHandlers(io);

(async () => {
  try {
    await dbConnection.connect();
    await redisClient.connect();
    server.listen(envConfig.API_PORT, () => {
      console.log(
        `Server is running at http://localhost:${envConfig.API_PORT}`,
      );
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
})();
// Graceful shutdown
process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
