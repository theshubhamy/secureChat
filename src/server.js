import { createServer } from 'http';
import app from './app.js';
import { envConfig, dbConnection, redisClient } from './config/index.js';
const server = createServer(app); // Create HTTP server

(async () => {
  await dbConnection.connect();
  await redisClient.connect();
  server.listen(envConfig.API_PORT, () => {
    console.log(`Server is running at http://localhost:${envConfig.API_PORT}`);
  });
})();
// Graceful shutdown
process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
