import { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';
import Cookies from 'js-cookie'; // Import js-cookie
import socket from '../scripts/socket';

export default function Room() {
    const [roomID, setRoomID] = useState(null); // State to hold the room ID
    const [copyMessage, setCopyMessage] = useState(''); // State for the copy confirmation message
    const [message, setMessage] = useState(''); // State to hold the current chat message
    const [chatLog, setChatLog] = useState([]); // State to hold chat messages

    useEffect(() => {
        const storedRoomID = Cookies.get('roomID'); // Get the room ID from the cookie

        if (storedRoomID) {
            setRoomID(storedRoomID); // Set the room ID from the cookie

            socket.emit('join-room', storedRoomID); // Emit a join event for the socket

            // Listen for messages specific to this room
            socket.on('message', (message) => {
                setChatLog((prev) => [...prev, message]); // Update chat log with new messages
                console.log(`New message in room ${storedRoomID}:`, message);
            });

            // Cleanup on unmount
            return () => {
                socket.emit('leave-room', storedRoomID); // Emit leave event on cleanup
                socket.off('message'); // Remove message listener
            };
        }
    }, []);

    // Function to copy room ID to clipboard
    const handleCopy = () => {
        if (roomID) {
            navigator.clipboard.writeText(roomID) // Use the Clipboard API to copy the text
                .then(() => {
                    console.log(`Room ID copied: ${roomID}`);
                    setCopyMessage(`Room ID: "${roomID}" was copied!`); // Set confirmation message
                    setTimeout(() => setCopyMessage(''), 2000); // Clear message after 2 seconds
                })
                .catch((error) => {
                    console.error('Error copying room ID:', error);
                });
        }
    };

    // Function to handle sending a message
    const handleSendMessage = () => {
        if (message.trim()) {
            socket.emit('message', { roomID, message }); // Emit message to the room with roomID
            setMessage(''); // Clear input field after sending
        }
    };

    return (
        <div className="chatContainer">
            {/* Display chat messages above the input area */}
            <div className="chatLog">
                {chatLog.map((msg, index) => (
                    <div key={index} className="chatMessage">{msg}</div>
                ))}
            </div>

            {/* Input area for sending messages */}
            <div className="inputArea">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)} // Update message state
                    placeholder="Type your message here..."
                    className="chatInput"
                />
                <button onClick={handleSendMessage} className="sendButton">Send Message</button>
                <button onClick={handleCopy} className="copyButton">
                    Copy Room ID
                </button>
            </div>
            {/* Optionally display the copy confirmation message */}
            {copyMessage && <div className="copyMessage">{copyMessage}</div>}
        </div>
    );
}
