import { io } from 'socket.io-client';

// Connect to the Socket.io server with fallback transports
const socket = io('http://localhost:3001', {
    transports: ['websocket', 'polling'], // Fallback to polling if WebSocket fails
});

// Function to join a room
const joinRoom = (roomId) => {
    if (socket) {
        socket.emit('join-room', roomId);
        console.log(`Joined room: ${roomId}`);
    } else {
        console.log('Socket not initialized');
    }
};

// Socket connection handling
socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Socket disconnected');
});

// Export the socket and joinRoom function
export { socket, joinRoom };
