import React, { useState } from 'react';
import LockScreen from './LockScreen';
import WorkoutScreen from './WorkoutScreen';
import WorkoutConfirmationScreen from './WorkoutConfirmationScreen';
import SettingsScreen from './SettingsScreen';
import WorkoutHistoryScreen from './WorkoutHistoryScreen';
import './App.css';

function App() {
  const [showWorkoutScreen, setShowWorkoutScreen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSettingsScreen, setShowSettingsScreen] = useState(false);
  const [showHistoryScreen, setShowHistoryScreen] = useState(false);
  const [lastWorkout, setLastWorkout] = useState(null);
  const [loggedWorkouts, setLoggedWorkouts] = useState([]); // State for logged workouts

  // New state for cached workouts
  const [cachedWorkouts, setCachedWorkouts] = useState([
    { type: 'Running', duration: '30 mins' },
    { type: 'Weightlifting', duration: '45 mins' },
    { type: 'Yoga', duration: '60 mins' },
  ]);

  const handleNotificationClick = () => {
    setShowWorkoutScreen(true);
    setShowSettingsScreen(false);
    setShowConfirmation(false);
    setShowHistoryScreen(false);
  };

  const handleWorkoutSave = (workoutData) => {
    setLastWorkout(workoutData);
    setLoggedWorkouts(prev => [...prev, workoutData]); // Add the new workout to the list

    // Update cached workouts if it's not already in the list
    const workoutExists = cachedWorkouts.some(
      workout => workout.type === workoutData.type && workout.duration === workoutData.duration
    );

    if (!workoutExists) {
      setCachedWorkouts(prev => [...prev, workoutData]);
    }

    setShowConfirmation(true);
    setShowWorkoutScreen(false);
    setShowSettingsScreen(false);
    setShowHistoryScreen(false);
  };

  const goToWorkoutLog = () => {
    setShowConfirmation(false);
    setShowSettingsScreen(false);
    setShowHistoryScreen(false);
    setShowWorkoutScreen(true);
  };

  const goToSettings = () => {
    setShowSettingsScreen(true);
    setShowWorkoutScreen(false);
    setShowConfirmation(false);
    setShowHistoryScreen(false);
  };

  const goToHistory = () => {
    setShowHistoryScreen(true);
    setShowWorkoutScreen(false);
    setShowConfirmation(false);
    setShowSettingsScreen(false);
  };

  const goHomeFromSettings = () => {
    setShowSettingsScreen(false);
    setShowWorkoutScreen(true);
    setShowHistoryScreen(false);
  };

  const goBackFromHistory = () => {
    setShowHistoryScreen(false);
    setShowConfirmation(true);
  };

  if (showHistoryScreen) {
    return <WorkoutHistoryScreen onGoBack={goToWorkoutLog} workouts={loggedWorkouts} />;
  }

  if (showSettingsScreen) {
    return <SettingsScreen onGoHome={goHomeFromSettings} />;
  }

  if (showConfirmation) {
    return <WorkoutConfirmationScreen
      lastWorkout={lastWorkout}
      onGoSettings={goToSettings}
      onGoHistory={goToHistory}
      onGoToWorkoutLog={goToWorkoutLog} // Pass the goToWorkoutLog function
    />;
  }

  if (showWorkoutScreen) {
    return <WorkoutScreen
      onWorkoutSaved={handleWorkoutSave}
      onGoSettings={goToSettings}
      onGoHistory={goToHistory} // Pass the goToHistory function
      cachedWorkouts={cachedWorkouts}
      onGoHome={goToWorkoutLog} // Keep this for the header button in WorkoutScreen
    />;
  }

  return (
    <div className="App">
      <LockScreen onNotificationClick={handleNotificationClick} />
    </div>
  );
}

export default App;