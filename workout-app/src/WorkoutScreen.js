import React, { useState } from 'react';
import './WorkoutScreen.css';

function WorkoutScreen() {
  const [exerciseType, setExerciseType] = useState('');
  const [otherExercise, setOtherExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [cachedWorkouts, setCachedWorkouts] = useState([
    { type: 'Running', duration: '30 mins' },
    { type: 'Weightlifting', duration: '45 mins' },
    { type: 'Yoga', duration: '60 mins' },
  ]);
  const [newlySavedWorkout, setNewlySavedWorkout] = useState(null);

  const handleExerciseTypeChange = (event) => {
    setExerciseType(event.target.value);
    if (event.target.value !== 'Other') {
      setOtherExercise(''); // Clear 'other' input if a preset is selected
    }
  };

  const handleOtherExerciseChange = (event) => {
    setOtherExercise(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleSaveWorkout = () => {
    let finalExerciseType = exerciseType;
    if (exerciseType === 'Other' && otherExercise) {
      finalExerciseType = otherExercise;
    } else if (exerciseType === 'Other' && !otherExercise) {
      alert('Please specify the exercise type when selecting "Other".');
      return;
    }

    if (finalExerciseType && duration) {
      const newWorkout = { type: finalExerciseType, duration: `${duration} mins` };
      setCachedWorkouts([...cachedWorkouts, newWorkout]);
      setNewlySavedWorkout(newWorkout);
      // Reset form
      setExerciseType('');
      setOtherExercise('');
      setDuration('');
      console.log('Workout saved:', newWorkout);
      // In the future, trigger end-result screen
    } else {
      alert('Please select an exercise type and enter the duration.');
    }
  };

  const handleCachedWorkoutClick = (workout) => {
    console.log('Cached workout selected:', workout);
    // Later, we might pre-fill the form.
  };

  return (
    <div className="workout-screen">
      <h1>Log Workout</h1>

      {/* Cached Workouts Section */}
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

      {/* Manual Workout Logging Form */}
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
        <button onClick={handleSaveWorkout} className="save-button">
          Save Workout
        </button>
        {newlySavedWorkout && (
          <p className="success-message">
            Saved: {newlySavedWorkout.type} - {newlySavedWorkout.duration}
          </p>
        )}
      </div>
    </div>
  );
}

export default WorkoutScreen;