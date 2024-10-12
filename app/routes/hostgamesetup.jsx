import { Link, useNavigate } from '@remix-run/react';
import Cookies from 'js-cookie'; // Import js-cookie

export default function HostGameSetup() {
    const navigate = useNavigate();

    function generateRoomID() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const length = 8;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    const handleCreateRoom = () => {
        const newRoomID = generateRoomID();
        console.log(`Room created with ID: ${newRoomID}`);

        // Store the new room ID in cookies
        Cookies.set('roomID', newRoomID);

        // Reset the remainingDeck in cookies
        Cookies.remove('remainingDeck');

        // Navigate to the dynamic room page using the new room ID
        navigate(`/${newRoomID}`);
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
