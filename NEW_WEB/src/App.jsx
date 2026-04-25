import { useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FoodAI from './pages/FoodAI';
import Social from './pages/Social';
import Analytics from './pages/Analytics';
import Home from './pages/Home';

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('smartHealthUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    localStorage.setItem('smartHealthUser', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('smartHealthUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <div className="app-shell">
        {user && <NavBar user={user} />}
        <main className={user ? 'with-nav' : ''}>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/food" element={user ? <FoodAI /> : <Navigate to="/login" />} />
            <Route path="/social" element={user ? <Social /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

function NavBar({ user }) {
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: '◉' },
    { to: '/food', label: 'Food AI', icon: '◐' },
    { to: '/social', label: 'Social', icon: '◈' },
    { to: '/analytics', label: 'Analytics', icon: '◎' },
  ];

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <span className="brand-icon">◈</span>
        <span>Smart Health</span>
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
          >
            <span className="link-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="nav-user">
        <span className="user-avatar">{user.name[0]}</span>
        <span className="user-name">{user.name}</span>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default App;
