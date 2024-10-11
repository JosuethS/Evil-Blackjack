import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins
        methods: ['GET', 'POST'],
        credentials: true, // Allow credentials
    },
});

app.use(cors({
    origin: '*', // Allow all origins
    credentials: true, // Allow credentials
}));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle room creation
    socket.on('create-room', (roomId) => {
        socket.join(roomId);
        console.log(`Room created: ${roomId}`);
        
        // Notify the user count when a room is created
        const usersInRoom = io.sockets.adapter.rooms.get(roomId)?.size || 0;
        io.to(roomId).emit('user-count', usersInRoom); // Notify users in the room
    });

    // Handle joining a room
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`User joined room: ${roomId}`);

        // Update user count for the room
        const usersInRoom = io.sockets.adapter.rooms.get(roomId)?.size || 0;
        io.to(roomId).emit('user-count', usersInRoom); // Notify users in the room
    });

    // Handle chat messages
    socket.on('chat-message', (data) => {
        console.log(`Message received in room ${data.roomId}: ${data.message}`);
        // Broadcast chat message to all users in the room
        io.to(data.roomId).emit('chat-message', {
            message: data.message,
            senderId: socket.id, // Include the sender's ID
        });
    });

    // Handle typing event
    socket.on('typing', (userId) => {
        // Broadcast typing event to all users in the room except the sender
        socket.to(socket.rooms).emit('typing', userId);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
        // Optionally, update the user count when a user disconnects
        const rooms = Array.from(socket.rooms); // Get all rooms the socket is in
        rooms.forEach((roomId) => {
            const usersInRoom = io.sockets.adapter.rooms.get(roomId)?.size || 0;
            io.to(roomId).emit('user-count', usersInRoom); // Notify users in the room
        });
    });
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
