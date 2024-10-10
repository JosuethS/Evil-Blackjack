import { useState } from 'react';
import { Link } from '@remix-run/react';
import '../styles/index.css'; // Assuming you want to retain the global styles

export default function Inventory() {
  const [isMuted, setIsMuted] = useState(false); // State for mute toggle

  const handleMuteChange = () => {
    setIsMuted((prev) => !prev); // Toggle mute state
    console.log()
  };

  return (
    <div className="settingsDiv">
      <h1 className="settingsTitle">Inventory</h1>
      <p className="settingsSubTitle">adjust your deck here:</p>


      <div style={{ marginTop: '27rem' }} className="settingsText">
        <Link to="/" className="titleButton">Back</Link>
      </div>
    </div>
  );
}
