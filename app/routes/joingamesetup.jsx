import { useState } from 'react';
import { Link, useNavigate } from '@remix-run/react'; // Import useNavigate for navigation
import '../styles/index.css'; // Assuming you want to retain the global styles

export default function JoinGameSetup() {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Joining room:', roomId);
    
    // Navigate to the waiting page with the roomId
    navigate(`/waitingforplayer?roomId=${roomId}`);
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
