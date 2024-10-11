import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from '@remix-run/react';
import { socket } from '../scripts/socket';

export default function WaitingForPlayer() {
    const [searchParams] = useSearchParams();
    const roomId = searchParams.get('roomId');
    const [userCount, setUserCount] = useState(0); // State to track user count
    const [chatMessage, setChatMessage] = useState(''); // State for the chat message
    const [chatMessages, setChatMessages] = useState([]); // State for storing chat messages
    const [typingUser, setTypingUser] = useState(''); // State to track typing user
    const [copySuccess, setCopySuccess] = useState(''); // State to track copy success
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('typing');
        socket.off('user-count');
        socket.off('chat-message');

        console.log('Joining room:', roomId);
        socket.emit('join-room', roomId); // Emit join-room when component mounts

        // Handle user count updates
        socket.on('user-count', (count) => {
            console.log('Users in room:', count);
            setUserCount(count); // Update user count state
        });

        // Handle incoming chat messages
        socket.on('chat-message', (message) => {
            console.log('Chat message received:', message); // Log received message
            setChatMessages((prevMessages) => [...prevMessages, message]); // Update chat messages
            setTypingUser(''); // Clear typing user when a message is received
        });

        // Handle typing event
        socket.on('typing', (userId) => {
            setTypingUser(userId); // Set the typing user
            setTimeout(() => {
                setTypingUser(''); // Clear typing user after 1 second
            }, 1000); // Adjust this duration as needed
        });

        // Clean up when the component unmounts
        return () => {
            console.log('Leaving room:', roomId);
            socket.emit('leave-room', roomId); // Emit leave-room when unmounting
        };
    }, [roomId]);

    // Function to handle sending a chat message
    const handleSendChat = () => {
        if (chatMessage.trim()) {
            const messageData = { roomId, message: chatMessage }; // Create message object
            socket.emit('chat-message', messageData); // Emit chat message
            setChatMessage(''); // Clear input after sending
        } else {
            console.log('Cannot send an empty message.'); // Log if message is empty
        }
    };

    // Function to handle typing event
    const handleTyping = () => {
        socket.emit('typing', socket.id); // Emit typing event with socket ID
    };

    // Function to handle back button click
    const handleBack = () => {
        console.log('Disconnecting socket and going back...');
        socket.emit('leave-room', roomId); // Emit leave-room
        navigate('/'); // Navigate back to the main page or another route
    };

    // Function to handle copying the Room ID to clipboard
    const handleCopyRoomId = () => {
        navigator.clipboard.writeText(roomId).then(() => {
            setCopySuccess('Room ID copied!');
            setTimeout(() => setCopySuccess(''), 2000); // Clear success message after 2 seconds
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

            {/* Back button */}
            <button onClick={handleBack} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Back
            </button>

            {/* Chat Room */}
            <div className="chatContainer mt-4 border border-gray-300 rounded p-2">
                <h2 className="text-lg font-semibold">Chat Room</h2>
                <div className="chatMessages max-h-60 overflow-y-auto border border-gray-300 rounded p-2 mb-2">
                    {chatMessages.map((msg, index) => (
                        <div key={index}>
                            <strong>User {msg.senderId.substring(0, 5)}:</strong> {msg.message}
                        </div> // Display each message with sender's ID (truncated for display)
                    ))}
                </div>

                {/* Display current typing user */}
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
                            handleTyping(); // Emit typing event on input change
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
