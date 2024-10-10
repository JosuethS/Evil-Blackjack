import { Link, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/index.css'; // Assuming you want to retain the global styles

let socket;

export default function HostGameSetup() {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the socket connection with the correct server URL
    socket = io('http://localhost:3001'); // Update with your server port if needed

    // Log connection status
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        console.log('Disconnecting from server');
        socket.disconnect();
      }
    };
  }, []);

  const generateRoomID = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const roomLength = Math.floor(Math.random() * (8 - 4 + 1)) + 4; // Random length between 4 and 8
    let roomId = '';
    for (let i = 0; i < roomLength; i++) {
      roomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return roomId;
  };

  const handleCreateRoom = () => {
    const roomId = generateRoomID();
    console.log('Generated roomId:', roomId);

    if (socket) {
      console.log('Socket is connected:', socket.connected);
      socket.emit('create-room', roomId);
      console.log('Room creation emitted');
    } else {
      console.log('Socket not initialized');
    }

    // Redirect to the waiting page
    navigate(`/waitingforplayer?roomId=${roomId}`);
  };

  return (
    <div className="settingsDiv">
      <h1 className="settingsTitle">Host Game</h1>

      <div className="buttonContainer">
        <button onClick={handleCreateRoom} className="createRoomButton">
          Create Room
        </button>
      </div>

      <div style={{ marginTop: '22rem' }} className="settingsText">
        <Link to="/playsetup" className="titleButton">Back</Link>
      </div>
    </div>
  );
}
