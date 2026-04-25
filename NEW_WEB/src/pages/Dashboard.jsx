import { useState, useMemo } from 'react';
import { useAuth } from '../App';

const initialStats = {
  caloriesIn: 1780,
  caloriesBurned: 520,
  activityMinutes: 48,
  consistency: 92,
  hydration: 78,
};

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
  const [message, setMessage] = useState('Welcome to your dashboard. Click "Sync Smartwatch" to update your activity data.');

  const healthScore = useMemo(() => calculateHealthScore(stats), [stats]);
  const energyBalance = stats.caloriesBurned - (stats.caloriesIn - 1800);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setStats((current) => ({
        caloriesIn: current.caloriesIn,
        caloriesBurned: current.caloriesBurned + 65,
        activityMinutes: current.activityMinutes + 18,
        consistency: Math.min(100, current.consistency + 1),
        hydration: Math.min(100, current.hydration + 4),
      }));
      setMessage('Smartwatch data synced successfully. Activity and calorie burn updated.');
      setSyncing(false);
    }, 1200);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <span className="section-tag">Dashboard</span>
          <h1>Welcome back, {user?.name}</h1>
          <p>Your real-time health insights and energy balance</p>
        </div>
        <button className="btn btn-primary" onClick={handleSync} disabled={syncing}>
          {syncing ? 'Syncing...' : 'Sync Smartwatch'}
        </button>
      </header>

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
    </div>
  );
}