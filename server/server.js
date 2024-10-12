// server.js

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*', // Allow all origins
    },
});

// Enable CORS for all origins
app.use(cors({
    origin: '*', // Allow all origins
}));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle the create-room event
    socket.on('create-room', (roomID) => {
        console.log(`Room created with ID: ${roomID}`);
        socket.join(roomID);
        socket.emit('room-created', roomID); // Notify the creator that the room was created
    });

    // Handle when a client joins a room
    socket.on('join-room', (roomID) => {
        console.log(`User ${socket.id} joined room ${roomID}`);
        socket.join(roomID);
    });

    // Handle chat messages
    socket.on('message', (data) => {
        const { roomID, message } = data; // Expect an object with roomID and message
        const messageData = {
            message,
            senderID: socket.id, // Add the sender's socket ID to the message data
        };

        // Emit message to all clients in the room
        io.to(roomID).emit('message', messageData);
        console.log(`Message sent to room ${roomID} by ${socket.id}:`, message);
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
    });
});

// Start the server
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
