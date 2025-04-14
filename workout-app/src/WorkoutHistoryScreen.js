import React, { useState } from 'react';
import './WorkoutHistoryScreen.css';

function WorkoutHistoryScreen({ onGoBack, workouts }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Format date for display
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar data
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear);
    const calendarDays = [];
    
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }
    
    return calendarDays;
  };

  // Filter workouts for the selected date
  const getWorkoutsForDate = (day) => {
    if (!day) return [];
    
    const dateToCheck = new Date(selectedYear, selectedMonth, day).setHours(0, 0, 0, 0);
    return workouts.filter(workout => {
      const workoutDate = new Date(workout.timestamp).setHours(0, 0, 0, 0);
      return workoutDate === dateToCheck;
    });
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Get month name
  const getMonthName = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month];
  };

  // Calendar days array
  const calendarDays = generateCalendarDays();

  return (
    <div className="workout-history-screen">
      <div className="header">
        <button className="header-button back-button" onClick={onGoBack}>
          👈
        </button>
        <h1>Workout History</h1>
        <button className="header-button home-button" onClick={onGoBack}>
          🏠
        </button>
      </div>

      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={goToPreviousMonth}>&lt;</button>
          <h2>{getMonthName(selectedMonth)} {selectedYear}</h2>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>
        
        <div className="calendar-weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        
        <div className="calendar-days">
          {calendarDays.map((day, index) => (
            <div 
              key={index} 
              className={`calendar-day ${day ? '' : 'empty-day'} ${
                getWorkoutsForDate(day).length > 0 ? 'has-workout' : ''
              }`}
            >
              {day && (
                <>
                  <div className="day-number">{day}</div>
                  {getWorkoutsForDate(day).map((workout, idx) => (
                    <div key={idx} className="calendar-workout">
                      <span className="workout-time">{formatTime(workout.timestamp)}</span>
                      <span className="workout-type">{workout.type}</span>
                      <span className="workout-duration">{workout.duration}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="list-view">
        <h3>Recent Workouts</h3>
        {workouts.length > 0 ? (
          <ul className="workout-list">
            {workouts.map((workout, index) => (
              <li key={index} className="workout-item">
                <div className="workout-date">{formatDate(workout.timestamp)}</div>
                <div className="workout-time">{formatTime(workout.timestamp)}</div>
                <div className="workout-details">
                  <div className="workout-type">{workout.type}</div>
                  <div className="workout-duration">{workout.duration}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-workouts">No workouts logged yet.</p>
        )}
      </div>
    </div>
  );
}

export default WorkoutHistoryScreen;