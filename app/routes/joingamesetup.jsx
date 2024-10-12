import { useState } from 'react';
import { Link, useNavigate } from '@remix-run/react';
import Cookies from 'js-cookie'; // Import js-cookie
import '../styles/index.css';

export default function JoinGameSetup() {
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Joining room:', roomId);

        // Store room ID in cookies
        Cookies.set('roomID', roomId);

        // Reset the numbered deck and save it to cookies
        const initialDeck = Array.from({ length: 11 }, (_, i) => (i + 1).toString());
        Cookies.set('numberedDeck', JSON.stringify(initialDeck));

        // Navigate to the room page
        navigate(`/${roomId}`);
    };

    return (
        <div>
            <h1 className="settingsTitle">Join Game</h1>

            <form onSubmit={handleSubmit} className="formContainer">
                <input
                    type="text"
                    placeholder="Enter Room ID"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    className="roomInput"
                />
                <button type="submit" className="submitButton">Submit</button>
            </form>

            <div style={{ marginTop: '12rem' }} className="settingsText">
                <Link to="/playsetup" className="titleButton">Back</Link>
            </div>
        </div>
    );
}
