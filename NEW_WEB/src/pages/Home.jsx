import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <header className="hero-banner">
        <nav className="nav-bar">
          <div className="brand">Smart Health</div>
          <div className="nav-links">
            <Link to="/login">Login</Link>
          </div>
        </nav>
        <div className="hero-content">
          <div>
            <p className="eyebrow">Smart Health & Fitness</p>
            <h1>Turn wearable telemetry, AI nutrition, and social fitness into a single web experience.</h1>
            <p className="hero-copy">
              Explore a demo website with smartwatch sync, camera-based meal recognition, health scoring, group challenges, and ephemeral meal sharing.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/login">Get Started</Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="panel-card">
              <span>Health Score</span>
              <strong>--</strong>
            </div>
            <div className="panel-card secondary">
              <span>Energy Balance</span>
              <strong>--</strong>
            </div>
            <div className="panel-card detail">
              <p>Login to access your dashboard</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section intro-grid">
          <div className="panel large">
            <h2>Complete app concept for a healthier lifestyle</h2>
            <p>Built around smart device integration, AI-driven meal logging, and meaningful social support. This website is a product demo for a connected wellness platform.</p>
          </div>
          <div className="feature-card">
            <h3>Smartwatch Integration</h3>
            <p>Sync real-time activity from Wear OS, Google Fit, and HealthKit into a central dashboard.</p>
          </div>
          <div className="feature-card">
            <h3>AI Food Recognition</h3>
            <p>Instantly identify meals from photos and estimate calories with a mock AI model ready for TensorFlow Lite.</p>
          </div>
          <div className="feature-card">
            <h3>Social Challenges</h3>
            <p>Join groups, compete in leaderboards, and share ephemeral meal snaps with friends.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Demo website for Smart Health & Fitness. Built with React, Vite, and interactive health app concepts.</p>
      </footer>
    </div>
  );
}