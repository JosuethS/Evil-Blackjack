import { Link, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { socket } from '../scripts/socket';
import '../styles/index.css'; // Assuming you want to retain the global styles

export default function HostGameSetup() {
    const navigate = useNavigate();

    useEffect(() => {
        // Log connection status
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        return () => {
            // Clean up the socket connection when component unmounts
            console.log('Disconnecting from server');
            // Do not disconnect the socket here to keep the connection alive for other components
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
