import registerHub from './hub.js';

/**
 * Attach signaling logic to Socket.IO
 * @param {SocketIOServer} io
 */
export default function registerSignalHandlers(io) {
  io.on('connection', socket => {
    console.log(`🔗 Client connected: ${socket.id}`);

    // Register signaling hub events
    registerHub(io, socket);

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
}
