import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Smart Health & Fitness</h1>
        <p>Your AI-powered companion for a healthier lifestyle</p>
        <div className="features-grid">
          <div className="feature">
            <h3>Smartwatch Sync</h3>
            <p>Seamlessly sync your activity data from your smartwatch.</p>
            <Link to="/sync" className="btn">Try Sync</Link>
          </div>
          <div className="feature">
            <h3>AI Food Recognition</h3>
            <p>Log meals with camera and AI-powered food identification.</p>
            <Link to="/food" className="btn">Log Meal</Link>
          </div>
          <div className="feature">
            <h3>Social Groups</h3>
            <p>Join challenges and share progress with friends.</p>
            <Link to="/social" className="btn">Join Groups</Link>
          </div>
          <div className="feature">
            <h3>Health Analytics</h3>
            <p>Track your health score and energy balance.</p>
            <Link to="/analytics" className="btn">View Analytics</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home