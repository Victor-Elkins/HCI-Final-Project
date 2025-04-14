import React from 'react';
import './WorkoutConfirmationScreen.css';

function WorkoutConfirmationScreen({ lastWorkout, onGoBack, onGoSettings, onGoHistory }) {
  const goToWorkoutLog = () => {
    onGoBack();
  };

  const goToSettings = () => {
    onGoSettings();
  };

  const goToHistory = () => {
    onGoHistory();
  };

  return (
    <div className="workout-confirmation-screen">
      <div className="header">
        <button className="header-button home-button" onClick={goToWorkoutLog}>
          🏠
        </button>
        <button className="header-button settings-button" onClick={goToSettings}>
          ⚙️
        </button>
      </div>
      <h1>Congrats!</h1>
      {lastWorkout && (
        <div className="feedback">
          <p>You logged a {lastWorkout.type} workout for {lastWorkout.duration}.</p>
          <div className="calendar-section" onClick={goToHistory} style={{ cursor: 'pointer' }}>
            <h2>Workout History</h2>
            <p>Calendar of previous workouts will go here.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutConfirmationScreen;