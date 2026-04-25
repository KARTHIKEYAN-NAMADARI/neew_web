import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../App';

const initialStats = {
  caloriesIn: 1780,
  caloriesBurned: 520,
  activityMinutes: 48,
  consistency: 92,
  hydration: 78,
};

const initialWorkoutData = [
  { type: 'Running', duration: 30, calories: 280, time: '7:00 AM' },
  { type: 'Cycling', duration: 45, calories: 350, time: '6:00 PM' },
];

const initialHydrationData = [
  { amount: 250, time: '8:00 AM' },
  { amount: 500, time: '12:00 PM' },
  { amount: 300, time: '3:00 PM' },
];

function calculateHealthScore({ caloriesIn, caloriesBurned, activityMinutes, consistency }) {
  const energy = Math.max(0, 100 - Math.abs(caloriesIn - 2000) / 20);
  const activity = Math.min(100, activityMinutes * 1.6);
  const consistencyScore = consistency;
  const calorieBalance = Math.min(100, Math.max(0, 50 + (caloriesBurned - (caloriesIn - 1800)) / 10));
  return Math.round((energy * 0.25 + activity * 0.35 + consistencyScore * 0.25 + calorieBalance * 0.15));
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(initialStats);
  const [syncing, setSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [workoutData, setWorkoutData] = useState(initialWorkoutData);
  const [hydrationData, setHydrationData] = useState(initialHydrationData);
  const [message, setMessage] = useState('Welcome to your dashboard. Click "Sync Smartwatch" to update your activity data.');

  const healthScore = useMemo(() => calculateHealthScore(stats), [stats]);
  const energyBalance = stats.caloriesBurned - (stats.caloriesIn - 1800);
  const totalHydration = hydrationData.reduce((sum, entry) => sum + entry.amount, 0);
  const totalWorkoutCalories = workoutData.reduce((sum, workout) => sum + workout.calories, 0);

  // Auto-sync functionality
  useEffect(() => {
    let interval;
    if (autoSync) {
      interval = setInterval(() => {
        handleSync();
      }, 300000); // Auto sync every 5 minutes
    }
    return () => clearInterval(interval);
  }, [autoSync]);

  const handleSync = () => {
    setSyncing(true);
    setMessage('Syncing with smartwatch...');

    // Simulate API call to smartwatch
    setTimeout(() => {
      // Generate realistic new data
      const newWorkout = {
        type: ['Running', 'Walking', 'Cycling', 'Swimming'][Math.floor(Math.random() * 4)],
        duration: Math.floor(Math.random() * 60) + 15,
        calories: Math.floor(Math.random() * 200) + 100,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const newHydration = {
        amount: [200, 250, 300, 500][Math.floor(Math.random() * 4)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setWorkoutData(prev => [newWorkout, ...prev.slice(0, 4)]); // Keep last 5 workouts
      setHydrationData(prev => [newHydration, ...prev.slice(0, 9)]); // Keep last 10 hydration entries

      setStats((current) => ({
        caloriesIn: current.caloriesIn,
        caloriesBurned: current.caloriesBurned + newWorkout.calories,
        activityMinutes: current.activityMinutes + newWorkout.duration,
        consistency: Math.min(100, current.consistency + 0.5),
        hydration: Math.min(100, current.hydration + 2),
      }));

      setLastSyncTime(new Date());
      setMessage('Smartwatch data synced successfully! Updated workout and hydration data.');
      setSyncing(false);
    }, 2500);
  };

  const toggleAutoSync = () => {
    setAutoSync(!autoSync);
    setMessage(autoSync ? 'Auto-sync disabled' : 'Auto-sync enabled - will sync every 5 minutes');
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <span className="section-tag">Dashboard</span>
          <h1>Welcome back, {user?.name}</h1>
          <p>Your real-time health insights and energy balance</p>
        </div>
        <div className="sync-controls">
          <button className="sync-btn" onClick={handleSync} disabled={syncing}>
            {syncing ? 'Syncing...' : 'Sync Smartwatch'}
          </button>
          {lastSyncTime && (
            <div className="sync-status">
              <div className="sync-indicator"></div>
              Last sync: {lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
        </div>
      </header>

      <div className="auto-sync">
        <h4>Auto-Sync Settings</h4>
        <p>Automatically sync data from your smartwatch every 5 minutes</p>
        <div className="toggle-switch">
          <label htmlFor="auto-sync">Enable Auto-Sync</label>
          <label className="switch">
            <input
              type="checkbox"
              id="auto-sync"
              checked={autoSync}
              onChange={toggleAutoSync}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card large">
          <h3>Health Score</h3>
          <div className="score-display">
            <strong>{healthScore}</strong>
            <span className="score-label">/ 100</span>
          </div>
          <p className="score-description">
            {healthScore >= 80 ? 'Excellent health!' : healthScore >= 60 ? 'Good progress!' : 'Keep going!'}
          </p>
        </div>

        <div className="stat-card">
          <h3>Calories Consumed</h3>
          <p className="stat-value">{stats.caloriesIn} <span className="unit">kcal</span></p>
        </div>

        <div className="stat-card">
          <h3>Calories Burned</h3>
          <p className="stat-value">{stats.caloriesBurned} <span className="unit">kcal</span></p>
        </div>

        <div className="stat-card">
          <h3>Active Minutes</h3>
          <p className="stat-value">{stats.activityMinutes} <span className="unit">min</span></p>
        </div>

        <div className="stat-card">
          <h3>Consistency</h3>
          <p className="stat-value">{stats.consistency}<span className="unit">%</span></p>
        </div>

        <div className="stat-card">
          <h3>Hydration</h3>
          <p className="stat-value">{stats.hydration}<span className="unit">%</span></p>
        </div>

        <div className="stat-card wide">
          <h3>Live Summary</h3>
          <p className="message-text">{message}</p>
        </div>

        <div className="stat-card">
          <h3>Energy Balance</h3>
          <p className={`stat-value ${energyBalance >= 0 ? 'positive' : 'negative'}`}>
            {energyBalance >= 0 ? '+' : ''}{energyBalance} <span className="unit">kcal</span>
          </p>
          <p className="stat-description">
            {energyBalance >= 0 ? 'Calories burned above intake' : 'Calorie deficit - eat more!'}
          </p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="workout-data">
          <div className="data-header">
            <h4>Recent Workouts</h4>
            <div className="data-value">{totalWorkoutCalories} <span className="data-unit">kcal</span></div>
          </div>
          <div className="data-list">
            {workoutData.map((workout, index) => (
              <div key={index} className="data-item">
                <span className="data-label">{workout.type} - {workout.duration}min</span>
                <span className="data-amount">{workout.calories} kcal</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hydration-data">
          <div className="data-header">
            <h4>Today's Hydration</h4>
            <div className="data-value">{totalHydration} <span className="data-unit">ml</span></div>
          </div>
          <div className="data-list">
            {hydrationData.map((entry, index) => (
              <div key={index} className="data-item">
                <span className="data-label">{entry.time}</span>
                <span className="data-amount">{entry.amount} ml</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}