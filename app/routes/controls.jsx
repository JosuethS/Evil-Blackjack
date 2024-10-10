import { useState } from 'react';
import { Link } from '@remix-run/react';
import '../styles/index.css'; // Assuming you want to retain the global styles

export default function Controls() {
  return (
    <div className="settingsDiv">
      <h1 className="settingsTitle">Controls</h1>
      <p className="settingsSubTitle">Adjust control settings here:</p>


      <div style={{ marginTop: '27rem' }} className="settingsText">
        <Link to="/settings" className="titleButton">Back to Settings</Link>
      </div>
    </div>
  );
}
