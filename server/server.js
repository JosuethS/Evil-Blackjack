// server.js

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
// server.js

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle room creation
    socket.on('create-room', (roomId) => {
        socket.join(roomId);
        console.log(`Room created: ${roomId}`);
        
        const usersInRoom = io.sockets.adapter.rooms.get(roomId)?.size || 0;
        io.to(roomId).emit('user-count', usersInRoom);
    });

    // Handle leaving a room and disconnecting the socket
    socket.on('leave-and-disconnect', (roomId) => {
        console.log(`User leaving room: ${roomId} and disconnecting`);

        socket.leave(roomId); // Leave the specified room
        socket.disconnect(); // Disconnect the socket
        io.close(); // Disconnects all clients


        const usersInRoom = io.sockets.adapter.rooms.get(roomId)?.size || 0;
        io.to(roomId).emit('user-count', usersInRoom);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
        const rooms = Array.from(socket.rooms);
        rooms.forEach((roomId) => {
            socket.leave(roomId);
            const usersInRoom = io.sockets.adapter.rooms.get(roomId)?.size || 0;
            io.to(roomId).emit('user-count', usersInRoom);
        });
        io.close(); // Disconnects all clients

    });
});
