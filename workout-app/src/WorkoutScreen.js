import React, { useState } from 'react';
import './WorkoutScreen.css';

function WorkoutScreen({ onWorkoutSaved, onGoSettings, onGoHistory, cachedWorkouts }) {
  const [exerciseType, setExerciseType] = useState('');
  const [otherExercise, setOtherExercise] = useState('');
  const [duration, setDuration] = useState('');

  const handleExerciseTypeChange = (event) => {
    setExerciseType(event.target.value);
    if (event.target.value !== 'Other') {
      setOtherExercise('');
    }
  };

  const handleOtherExerciseChange = (event) => {
    setOtherExercise(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSaveWorkout = (workout) => {
    let finalExerciseType = workout.type;
    let finalDuration = workout.duration.replace(' mins', ''); // Extract duration in minutes

    if (finalExerciseType && finalDuration) {
      const newWorkout = {
        type: finalExerciseType,
        duration: `${finalDuration} mins`,
        timestamp: new Date().toISOString(), // Add timestamp
      };
      console.log('Workout saved (via quick log):', newWorkout);
      onWorkoutSaved(newWorkout); // Call the callback to notify App
      // Reset form
      setExerciseType('');
      setOtherExercise('');
      setDuration('');
    } else {
      alert('Error saving workout.');
    }
  };

  const handleManualSave = () => {
    let finalExerciseType = exerciseType;
    if (exerciseType === 'Other' && otherExercise) {
      finalExerciseType = otherExercise;
    }

    if (finalExerciseType && duration) {
      const newWorkout = {
        type: finalExerciseType,
        duration: `${duration} mins`,
        timestamp: new Date().toISOString(), // Add timestamp
      };
      console.log('Workout saved (manual):', newWorkout);
      onWorkoutSaved(newWorkout); // Call the callback to notify App
      // Reset form
      setExerciseType('');
      setOtherExercise('');
      setDuration('');
    } else {
      alert('Please select an exercise type and enter the duration.');
    }
  };

  const handleCachedWorkoutClick = (workout) => {
    handleSaveWorkout(workout); // Directly call handleSaveWorkout with the cached workout
  };

  const goToHistory = () => {
    onGoHistory(); // Call the prop to navigate to WorkoutHistoryScreen
  };

  return (
    <div className="workout-screen">
      <div className="header">
        <button className="header-button history-button" onClick={goToHistory}>
          Logs
        </button>
        <button className="header-button settings-button" onClick={onGoSettings}>
          ⚙️
        </button>
      </div>
      <h1>Log Workout</h1>

      <div className="cached-workouts-section">
        <h2>Quick Log</h2>
        {cachedWorkouts.map((workout, index) => (
          <button
            key={index}
            className="cached-workout-item"
            onClick={() => handleCachedWorkoutClick(workout)}
          >
            {workout.type} - {workout.duration}
          </button>
        ))}
        {cachedWorkouts.length === 0 && <p>No cached workouts yet.</p>}
      </div>

      <div className="manual-log-form">
        <h2>New Workout</h2>
        <div className="form-group">
          <label htmlFor="exerciseType">Exercise:</label>
          <select
            id="exerciseType"
            value={exerciseType}
            onChange={handleExerciseTypeChange}
          >
            <option value="">Select Exercise</option>
            <option value="Running">Running</option>
            <option value="Weightlifting">Weightlifting</option>
            <option value="Yoga">Yoga</option>
            <option value="Cycling">Cycling</option>
            <option value="Swimming">Swimming</option>
            <option value="Other">Other</option>
          </select>
          {exerciseType === 'Other' && (
            <input
              type="text"
              id="otherExercise"
              placeholder="Specify exercise"
              value={otherExercise}
              onChange={handleOtherExerciseChange}
              className="other-exercise-input"
            />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (mins):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={handleDurationChange}
          />
        </div>
        <button onClick={handleManualSave} className="save-button">
          Save Workout
        </button>
      </div>

      {/* Removed the separate Workout History button */}
    </div>
  );
}

export default WorkoutScreen;