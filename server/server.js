import http from 'http';
import express from 'express'; // Import express with ES module syntax
import cors from 'cors'; // Import CORS
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your front-end URL
    methods: ['GET', 'POST'], // Allow specific methods
    credentials: true // Allow cookies to be sent
  }));


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('create-room', (roomId) => {
    console.log('Room created with ID:', roomId);
    socket.join(roomId);
  });

  socket.on('join-room', (roomId) => {
    console.log('User joined room:', roomId);
    socket.join(roomId);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
