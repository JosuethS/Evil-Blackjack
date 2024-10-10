import { Link } from '@remix-run/react';
import '../styles/index.css'; // Assuming you want to retain the global styles

export default function HostGameSetup() {
  const handleCreateRoom = () => {
    // Add logic to create a game room
    console.log('Creating room...');
  };

  return (
    <div className="settingsDiv">
      <h1 className="settingsTitle">Host Game</h1>

      <div className="buttonContainer">
        <button onClick={handleCreateRoom} className="createRoomButton">
          CreatE Room
        </button>
      </div>

      <div style={{ marginTop: '22rem' }} className="settingsText">
        <Link to="/playsetup" className="titleButton">Back</Link>
      </div>
    </div>
  );
}
