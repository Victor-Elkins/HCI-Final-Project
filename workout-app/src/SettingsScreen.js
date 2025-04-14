import React from 'react';
import './SettingsScreen.css';

function SettingsScreen({ onGoHome }) {
  return (
    <div className="settings-screen">
      <div className="header">
        <button className="header-button home-button" onClick={onGoHome}>
          🏠
        </button>
        {/* We can add a settings icon here if needed later */}
      </div>
      <h1>Settings</h1>
      <p>Placeholder for settings content.</p>
      {/* Add your settings options here */}
    </div>
  );
}

export default SettingsScreen;