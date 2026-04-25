import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Smart Health & Fitness</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sync">Smartwatch Sync</Link></li>
          <li><Link to="/food">Food Recognition</Link></li>
          <li><Link to="/social">Social Groups</Link></li>
          <li><Link to="/analytics">Health Analytics</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header