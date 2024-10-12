// app/routes/hostgamesetup.jsx

import { Link, useNavigate } from '@remix-run/react'; // Import useNavigate for redirection
import Cookies from 'js-cookie'; // Import js-cookie

export default function HostGameSetup() {
    const navigate = useNavigate(); // Hook for navigation

    function generateRoomID() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const length = 8; // Length of the room ID
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length)); // Generate random character
        }
        return result; // Return the generated room ID
    }

    const handleCreateRoom = () => {
        const newRoomID = generateRoomID(); // Generate a new room ID
        console.log(`Room created with ID: ${newRoomID}`);

        // Store the new room ID in cookies
        Cookies.set('roomID', newRoomID, { expires: 1 }); // Set cookie to expire in 1 day

        // Navigate to the dynamic room page using the new room ID
        navigate(`/${newRoomID}`); // Ensure this path is correct
    };

    return (
        <div className="settingsDiv">
            <h1 className="settingsTitle">Host Game</h1>
            <div className="buttonContainer">
                <button className="createRoomButton" onClick={handleCreateRoom}>
                    Create Room
                </button>
            </div>
            <div style={{ marginTop: '22rem' }} className="settingsText">
                <Link to="/playsetup" className="titleButton">Back</Link>
            </div>
        </div>
    );
}
