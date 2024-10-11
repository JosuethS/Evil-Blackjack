// waitingforplayer.jsx

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from '@remix-run/react';
import { socket } from '../scripts/socket';

export default function WaitingForPlayer() {
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');
    const [userCount, setUserCount] = useState(0);
    const [chatMessage, setChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [typingUser, setTypingUser] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('typing');
        socket.off('user-count');
        socket.off('chat-message');

        console.log('Joining room:', roomId);
        socket.emit('join-room', roomId);

        // Handle user count updates
        socket.on('user-count', (count) => {
            setUserCount(count);
        });

        // Handle incoming chat messages
        socket.on('chat-message', (message) => {
            setChatMessages((prevMessages) => [...prevMessages, message]);
            setTypingUser('');
        });

        // Handle typing event
        socket.on('typing', (userId) => {
            setTypingUser(userId);
            setTimeout(() => setTypingUser(''), 1000);
        });

        // Clean up when the component unmounts
        return () => {
            console.log('Leaving room:', roomId);
            socket.emit('leave-and-disconnect', roomId); // Leave room and disconnect on unmount
        };
    }, [roomId]);

    const handleSendChat = () => {
        if (chatMessage.trim()) {
            const messageData = { roomId, message: chatMessage };
            socket.emit('chat-message', messageData);
            setChatMessage('');
        }
    };

    const handleTyping = () => {
        socket.emit('typing', socket.id);
    };

    const handleBack = () => {
        socket.emit('leave-and-disconnect', roomId); // Emit leave-and-disconnect event
        navigate('/'); // Navigate back to the main page
        
        socket.off('connect');
        socket.off('disconnect');
        socket.off('typing');
        socket.off('user-count');
        socket.off('chat-message');
    };

    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(roomId).then(() => {
            setCopySuccess('Room ID copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        }).catch(() => {
            setCopySuccess('Failed to copy!');
        });
    };

    return (
        <div className="p-4">
            <h1>{userCount === 2 ? 'Connected!' : 'Waiting for Player'}</h1>
            <div className="flex items-center">
                <p className="mr-2">Room ID: {roomId}</p>
                <button onClick={handleCopyRoomId} className="p-1 bg-blue-500 text-white rounded">
                    Copy
                </button>
            </div>
            {copySuccess && <p className="text-green-500 mt-2">{copySuccess}</p>}

            <button onClick={handleBack} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Back
            </button>

            <div className="chatContainer mt-4 border border-gray-300 rounded p-2">
                <h2 className="text-lg font-semibold">Chat Room</h2>
                <div className="chatMessages max-h-60 overflow-y-auto border border-gray-300 rounded p-2 mb-2">
                    {chatMessages.map((msg, index) => (
                        <div key={index}>
                            <strong>User {msg.senderId.substring(0, 5)}:</strong> {msg.message}
                        </div>
                    ))}
                </div>

                {typingUser && (
                    <div className="currentTypingMessage mb-2 p-2 border border-gray-300 rounded">
                        <strong>{typingUser.substring(0, 5)} is typing...</strong>
                    </div>
                )}

                <div className="flex">
                    <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => {
                            setChatMessage(e.target.value);
                            handleTyping();
                        }}
                        placeholder="Type your message..."
                        className="border border-gray-300 rounded p-1 flex-grow"
                    />
                    <button onClick={handleSendChat} className="ml-2 p-1 bg-green-500 text-white rounded">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
