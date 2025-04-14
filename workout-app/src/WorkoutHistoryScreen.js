import React from 'react';
import './WorkoutHistoryScreen.css';

function WorkoutHistoryScreen({ onGoBack, workouts }) {
  return (
    <div className="workout-history-screen">
      <div className="header">
        <button className="header-button home-button" onClick={onGoBack}>
          🏠
        </button>
      </div>
      <h1>Workout History</h1>
      {workouts.length > 0 ? (
        <ul>
          {workouts.map((workout, index) => (
            <li key={index}>
              {workout.type} - {workout.duration}
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts logged yet.</p>
      )}
      {/* We will add the calendar view here later */}
    </div>
  );
}

export default WorkoutHistoryScreen;