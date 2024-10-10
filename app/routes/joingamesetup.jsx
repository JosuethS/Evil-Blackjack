import { useState } from 'react';
import { Link } from '@remix-run/react';
import '../styles/index.css'; // Assuming you want to retain the global styles

export default function JoinGameSetup() {
  const [roomId, setRoomId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to join the game with the roomId
    console.log('Joining room:', roomId);
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
