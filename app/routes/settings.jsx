import { Link } from '@remix-run/react'; // Correct import for Remix v2
import globalStyles from '../styles/index.css'; // Include your global styles

export default function Settings() {
  return (
    <div className="settingsDiv">
      <h1 className="settingsTitle"> Settings </h1>
      <p className="settingsSubTitle">Configure your game settings here:</p>

    <div className="settingsText">
        <Link to="/sound" className="titleButton">
            Sound
        </Link>
    </div>
      
    <div className="settingsText">
        <Link to="/controls" className="titleButton">
            Controls
        </Link>
    </div>

    <div style={{ marginTop: '17rem'}}  className="settingsText">
        <Link to="/" className="titleButton">Back To Main Page</Link>
    </div>

    </div>
  );
}
