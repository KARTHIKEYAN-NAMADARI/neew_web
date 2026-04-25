import { useState } from 'react';
import { useAuth } from '../App';

export default function Login() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    if (isRegister && !form.name) {
      setError('Please enter your name');
      return;
    }
    // Mock authentication - in production, this would call an API
    const user = {
      id: Date.now(),
      name: form.name || form.email.split('@')[0],
      email: form.email,
      joinedDate: new Date().toISOString(),
    };
    login(user);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <span className="brand-icon large">◈</span>
          <h1>Smart Health</h1>
          <p>{isRegister ? 'Create your account' : 'Welcome back'}</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn btn-primary full-width">
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="toggle-mode">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button type="button" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? 'Sign in' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}