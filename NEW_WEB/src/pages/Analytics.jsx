import { useState, useMemo } from 'react';
import { useAuth } from '../App';

const weeklyData = [
  { day: 'Mon', calories: 1850, activity: 45 },
  { day: 'Tue', calories: 2100, activity: 60 },
  { day: 'Wed', calories: 1950, activity: 30 },
  { day: 'Thu', calories: 2200, activity: 75 },
  { day: 'Fri', calories: 1800, activity: 40 },
  { day: 'Sat', calories: 2400, activity: 90 },
  { day: 'Sun', calories: 1700, activity: 25 },
];

const insights = [
  { type: 'achievement', title: 'Weekly Goal Met!', description: 'You hit your activity goal 5 days this week.' },
  { type: 'tip', title: 'Stay Hydrated', description: 'Your hydration drops on weekends. Try setting reminders.' },
  { type: 'trend', title: 'Calorie Trend', description: 'Your calorie intake has been consistent this week.' },
];

function calculateHealthScore(stats) {
  const { caloriesIn, caloriesBurned, activityMinutes, consistency } = stats;
  const energy = Math.max(0, 100 - Math.abs(caloriesIn - 2000) / 20);
  const activity = Math.min(100, activityMinutes * 1.6);
  const calorieBalance = Math.min(100, Math.max(0, 50 + (caloriesBurned - (caloriesIn - 1800)) / 10));
  return Math.round((energy * 0.25 + activity * 0.35 + consistency * 0.25 + calorieBalance * 0.15));
}

export default function Analytics() {
  const { user } = useAuth();
  const [stats] = useState({
    caloriesIn: 1780,
    caloriesBurned: 520,
    activityMinutes: 48,
    consistency: 92,
  });

  const healthScore = useMemo(() => calculateHealthScore(stats), [stats]);
  const maxCalories = Math.max(...weeklyData.map(d => d.calories));

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <span className="section-tag">Analytics</span>
          <h1>Health Analytics</h1>
          <p>Detailed insights and personalized recommendations</p>
        </div>
      </header>

      <div className="analytics-grid">
        <div className="score-section">
          <h3>Health Score Breakdown</h3>
          <div className="score-circle">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="bg-circle" />
              <circle 
                cx="50" cy="50" r="45" 
                className="progress-circle"
                style={{ strokeDasharray: `${healthScore * 2.83} 283` }}
              />
            </svg>
            <div className="score-text">
              <strong>{healthScore}</strong>
              <span>/ 100</span>
            </div>
          </div>
          <div className="score-factors">
            <div className="factor">
              <span>Activity</span>
              <div className="factor-bar">
                <div style={{ width: `${Math.min(100, stats.activityMinutes * 1.6)}%` }} />
              </div>
              <span>{stats.activityMinutes} min</span>
            </div>
            <div className="factor">
              <span>Consistency</span>
              <div className="factor-bar">
                <div style={{ width: `${stats.consistency}%` }} />
              </div>
              <span>{stats.consistency}%</span>
            </div>
            <div className="factor">
              <span>Energy Balance</span>
              <div className="factor-bar">
                <div style={{ width: '65%' }} />
              </div>
              <span>Good</span>
            </div>
          </div>
        </div>

        <div className="chart-section">
          <h3>Weekly Activity</h3>
          <div className="bar-chart">
            {weeklyData.map((day) => (
              <div key={day.day} className="bar-column">
                <div 
                  className="bar" 
                  style={{ height: `${(day.activity / 90) * 100}%` }}
                  title={`${day.activity} min`}
                />
                <span className="bar-label">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <h3>Weekly Calories</h3>
          <div className="bar-chart">
            {weeklyData.map((day) => (
              <div key={day.day} className="bar-column">
                <div 
                  className="bar calories" 
                  style={{ height: `${(day.calories / maxCalories) * 100}%` }}
                  title={`${day.calories} kcal`}
                />
                <span className="bar-label">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="insights-section">
          <h3>Insights & Recommendations</h3>
          {insights.map((insight, index) => (
            <div key={index} className={`insight-card ${insight.type}`}>
              <span className="insight-type">{insight.type}</span>
              <strong>{insight.title}</strong>
              <p>{insight.description}</p>
            </div>
          ))}
        </div>

        <div className="stats-summary">
          <h3>Period Summary</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Avg. Calories</span>
              <span className="value">2000 kcal</span>
            </div>
            <div className="summary-item">
              <span className="label">Avg. Activity</span>
              <span className="value">52 min</span>
            </div>
            <div className="summary-item">
              <span className="label">Active Days</span>
              <span className="value">5 / 7</span>
            </div>
            <div className="summary-item">
              <span className="label">Score Change</span>
              <span className="value positive">+5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}