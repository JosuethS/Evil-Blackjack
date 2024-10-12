import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import socket from '../scripts/socket';

export default function Room() {
    const [roomID, setRoomID] = useState(null);
    const [copyMessage, setCopyMessage] = useState('');
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [mySocketID, setMySocketID] = useState(null);

    useEffect(() => {
        const storedRoomID = Cookies.get('roomID');

        if (storedRoomID) {
            setRoomID(storedRoomID);

            // Ensure socket is connected
            socket.connect();
            setMySocketID(socket.id);

            // Join the room
            socket.emit('join-room', storedRoomID);

            // Clean up any existing listeners to avoid duplicates
            socket.off('message');

            // Listen for incoming messages
            socket.on('message', (messageData) => {
                const { message, senderID } = messageData;

                // Only add the message if it's not from the current user
                if (senderID !== socket.id) {
                    setChatLog((prev) => [...prev, { message, senderID }]);
                }
            });

            // Cleanup when the component unmounts
            return () => {
                // Notify the server that the player is leaving the room
                socket.emit('leave-room', storedRoomID);

                // Disconnect the socket to sever the connection
                socket.disconnect();
            };
        }
    }, []);

    // Function to copy room ID to clipboard
    const handleCopy = () => {
        if (roomID) {
            navigator.clipboard.writeText(roomID)
                .then(() => {
                    setCopyMessage(`Room ID: "${roomID}" was copied!`);
                    setTimeout(() => setCopyMessage(''), 2000);
                })
                .catch((error) => {
                    console.error('Error copying room ID:', error);
                });
        }
    };

    // Function to handle sending a message
    const handleSendMessage = () => {
        if (message.trim()) {
            socket.emit('message', { roomID, message });
            setChatLog((prev) => [...prev, { message, senderID: 'Me' }]);
            setMessage('');
        }
    };

    return (
        <div className="chatContainer">
            <div className="chatLog">
                {chatLog.map((msg, index) => (
                    <div key={index} className="chatMessage">
                        <strong>{msg.senderID === 'Me' ? 'Me' : msg.senderID}:</strong> {msg.message}
                    </div>
                ))}
            </div>

            <div className="inputArea">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type here..."
                    className="chatInput"
                />
                <button onClick={handleSendMessage} className="sendButton">
                    Send Message
                </button>
                <button onClick={handleCopy} className="copyButton">
                    Copy Room ID
                </button>
            </div>
            {copyMessage && <div className="copyMessage">{copyMessage}</div>}
        </div>
    );
}
