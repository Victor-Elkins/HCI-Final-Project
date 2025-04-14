import React, { useState } from 'react';
import './SettingsScreen.css';

function SettingsScreen({ onGoHome }) {
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(true);
  const [toggle1State, setToggle1State] = useState(false);
  const [toggle2State, setToggle2State] = useState(true);

  const handlePushNotificationsToggle = () => {
    setPushNotificationsEnabled(!pushNotificationsEnabled);
    console.log('Push Notifications Toggled:', !pushNotificationsEnabled);
    // In a real app, you'd save this preference
  };

  const handleToggle1 = () => {
    setToggle1State(!toggle1State);
    console.log('Toggle 1:', !toggle1State);
    // In a real app, you'd handle the action for this toggle
  };

  const handleToggle2 = () => {
    setToggle2State(!toggle2State);
    console.log('Toggle 2:', !toggle2State);
    // In a real app, you'd handle the action for this toggle
  };

  return (
    <div className="settings-screen">
      <div className="header">
        <button className="header-button home-button" onClick={onGoHome}>
          🏠
        </button>
        <h1>Settings</h1>
      </div>

      <div className="settings-section">
        <h2>Push Notifications</h2>
        <button
          className={`ios-toggle ${pushNotificationsEnabled ? 'on' : 'off'}`}
          onClick={handlePushNotificationsToggle}
        >
          <div className="toggle-handle"></div>
        </button>
        <p className="setting-description">Receive notifications for workout reminders and updates.</p>
      </div>

      <div className="settings-section">
        <h2>Notification Types</h2>
        <div className="toggle-item">
          <label>Location Based Services/Notifications</label>
          <button
            className={`ios-toggle small ${toggle1State ? 'on' : 'off'}`}
            onClick={handleToggle1}
          >
            <div className="toggle-handle"></div>
          </button>
        </div>
        <div className="toggle-item">
          <label>Time/Trend Based Notifications</label>
          <button
            className={`ios-toggle small ${toggle2State ? 'on' : 'off'}`}
            onClick={handleToggle2}
          >
            <div className="toggle-handle"></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsScreen;