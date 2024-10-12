// socket.js

import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
    transports: ['websocket', 'polling'], // Specify transport methods
});

// Listen for connection events (for debugging)
socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
});

// Listen for disconnection events (for debugging)
socket.on('disconnect', (reason) => {
    console.log('Socket disconnected:', reason);
});

// Listen for connection errors
socket.on('connect_error', (error) => {
    console.error('Connection error:', error);
});

export default socket;
