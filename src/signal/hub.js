/**
 * Basic signaling hub for WebRTC peers
 */
export default function registerHub(io, socket) {
  // Join room
  socket.on('join', roomId => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
    console.log(`👥 ${socket.id} joined room: ${roomId}`);
  });

  // Relay WebRTC offer/answer/candidates
  socket.on('signal', ({ roomId, data }) => {
    socket.to(roomId).emit('signal', { sender: socket.id, data });
  });

  // Leave room
  socket.on('leave', roomId => {
    socket.leave(roomId);
    socket.to(roomId).emit('user-left', socket.id);
    console.log(`👋 ${socket.id} left room: ${roomId}`);
  });
}
