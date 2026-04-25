import './HealthAnalytics.css'

function HealthAnalytics() {
  const healthScore = 85
  const energyBalance = 1200 // calories

  return (
    <div className="analytics">
      <h2>Health Analytics</h2>
      <div className="score">
        <h3>Health Score: {healthScore}/100</h3>
        <div className="score-bar">
          <div className="score-fill" style={{ width: `${healthScore}%` }}></div>
        </div>
      </div>
      <div className="balance">
        <h3>Energy Balance</h3>
        <p>Daily surplus: {energyBalance} calories</p>
      </div>
      <div className="charts">
        <h3>Weekly Trends</h3>
        <p>Mock chart: Activity levels increasing over the week.</p>
      </div>
    </div>
  )
}

export default HealthAnalytics