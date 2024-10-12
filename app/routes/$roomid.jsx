import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../scripts/socket';
import Cookies from 'js-cookie';

export default function Room() {
    const navigate = useNavigate();
    const [roomID, setRoomID] = useState(null);
    const [copyMessage, setCopyMessage] = useState('');
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [drawnCard, setDrawnCard] = useState(null);
    const [remainingDeck, setRemainingDeck] = useState([]);
    const socketRef = useRef(socket); // Use a ref to manage the socket

    useEffect(() => {
        const storedRoomID = Cookies.get('roomID');
        const storedRemainingDeck = Cookies.get('remainingDeck');

        console.log("Stored Room ID:", storedRoomID); // Debugging line

        if (storedRoomID) {
            setRoomID(storedRoomID);

            // Ensure socket is connected only once
            if (!socketRef.current.connected) {
                socketRef.current.connect();
            }

            // Join the room
            socketRef.current.emit('join-room', storedRoomID);

            // Clean up any existing listeners to avoid duplicates
            const handleIncomingMessage = (messageData) => {
                const { message, senderID } = messageData;
                // Only add the message if it's not from the current user
                if (senderID !== socketRef.current.id) {
                    setChatLog((prev) => [...prev, { message, senderID }]);
                }
            };

            socketRef.current.off('message'); // Remove existing listeners
            socketRef.current.on('message', handleIncomingMessage); // Set new listener

            // Initialize remainingDeck from cookies if available
            const initialDeck = Array.from({ length: 11 }, (_, i) => (i + 1).toString());
            if (storedRemainingDeck) {
                const parsedDeck = JSON.parse(storedRemainingDeck);
                if (parsedDeck.length > 0) {
                    setRemainingDeck(parsedDeck);
                    console.log("Remaining Deck Loaded:", parsedDeck);
                } else {
                    // If the parsed deck is empty, use a copy of the initialDeck
                    setRemainingDeck(initialDeck);
                    Cookies.set('remainingDeck', JSON.stringify(initialDeck));
                    console.log("Empty Remaining Deck. Using Initial Deck:", initialDeck);
                }
            } else {
                // Initialize a new deck if no remainingDeck exists
                setRemainingDeck(initialDeck);
                Cookies.set('remainingDeck', JSON.stringify(initialDeck));
                console.log("Initial Deck Created:", initialDeck);
            }

            // Cleanup when the component unmounts
            return () => {
                // Notify the server that the player is leaving the room
                socketRef.current.emit('leave-room', storedRoomID);
                // Remove the message listener
                socketRef.current.off('message', handleIncomingMessage);
                // Disconnect the socket if it’s still connected
                if (socketRef.current.connected) {
                    socketRef.current.disconnect();
                }
            };
        }
    }, []); // Only run this effect once on mount

    // Save the remainingDeck to cookies whenever it changes
    useEffect(() => {
        console.log("Saving Remaining Deck to Cookies:", remainingDeck);
        Cookies.set('remainingDeck', JSON.stringify(remainingDeck));
    }, [remainingDeck]);

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

    const handleSendMessage = () => {
        if (message.trim()) {
            socketRef.current.emit('message', { roomID, message });
            setChatLog((prev) => [...prev, { message, senderID: 'Me' }]);
            setMessage('');
        }
    };

    const handleDrawCard = () => {
        console.log('Remaining Deck Before Drawing:', remainingDeck);

        if (remainingDeck.length > 0) {
            const randomIndex = Math.floor(Math.random() * remainingDeck.length);
            const card = remainingDeck[randomIndex];
            setDrawnCard(card);

            const updatedDeck = [...remainingDeck];
            updatedDeck.splice(randomIndex, 1);
            setRemainingDeck(updatedDeck);

            console.log('Drawn Card:', card);
            console.log('Remaining Deck After Drawing:', updatedDeck);
        } else {
            // Optionally, if no cards left, reset the deck to the initial state
            const initialDeck = Array.from({ length: 11 }, (_, i) => (i + 1).toString());
            setRemainingDeck(initialDeck);
            Cookies.set('remainingDeck', JSON.stringify(initialDeck)); // Save the reset deck to cookies
            console.log("Resetting Remaining Deck to Initial Deck:", initialDeck);
        }
    };

    const handleLeaveRoom = () => {
        // Notify the server that the player is leaving the room
        socketRef.current.emit('leave-room', roomID);

        // Clear remainingDeck from cookies
        Cookies.remove('remainingDeck');

        // Disconnect the socket if it’s still connected
        if (socketRef.current.connected) {
            socketRef.current.disconnect();
        }

        // Navigate back to the previous page
        navigate(-1);
    };

    return (
        <div>
            <div className="cardArea">
                <button onClick={handleDrawCard} className="drawCardButton">
                    Draw a Card
                </button>
                {drawnCard && <p>Drawn Card: {drawnCard}</p>}
                <p>Remaining Cards: {remainingDeck.length > 0 ? remainingDeck.join(', ') : 'No cards left!'}</p>
            </div>

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

            <button onClick={handleLeaveRoom} className="leaveRoomButton">
                Leave Room
            </button>
        </div>
    );
}
