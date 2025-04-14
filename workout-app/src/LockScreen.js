import React, { useState, useEffect } from 'react';
import './LockScreen.css';

function LockScreen({ onNotificationClick }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="lock-screen">
      <div className="status-bar">
        <div className="time">{formattedTime}</div>
        <div className="status-icons">
          <span>📶</span>
          <span>🔋 100%</span>
          <span className="location-on">📍</span>
        </div>
      </div>
      <div className="date-display">{formattedDate}</div>
      <button className="notification-area" onClick={onNotificationClick}>
        <div className="notification-icon">💪</div>
        <div className="notification-text-container">
          <div className="notification-text">Are you working out right now?</div>
          <div className="notification-subtext">Log your workout!</div>
        </div>
      </button>
      <div className="bottom-actions">
        <div className="camera-icon">
          <span role="img" aria-label="camera">
            📸
          </span>
        </div>
        <div className="placeholder"></div>
        <div className="flashlight-icon">
          <span role="img" aria-label="flashlight">
            🔦
          </span>
        </div>
      </div>
      {/* Removed temporary simulate button */}
    </div>
  );
}

export default LockScreen;