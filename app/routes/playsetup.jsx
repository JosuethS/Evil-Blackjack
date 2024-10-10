import { Link } from '@remix-run/react';
import '../styles/index.css'; // Assuming you want to retain the global styles

export default function PlaySetup() {
  return (
    <div className="settingsDiv">
      <h1 className="settingsTitle"></h1>
      <p className="settingsSubTitle"></p>

      {/* Container for buttons */}
      <div className="buttonContainer">
        <Link to="/hostgamesetup" className="gameButton">Host Game</Link>
        <Link to="/joingamesetup" className="gameButton">Join Game</Link>
      </div>

      <div style={{ marginTop: '10rem' }} className="settingsText">
        <Link to="/" className="titleButton">Back</Link>
      </div>

    </div>
  );
}
