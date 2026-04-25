import { useState } from 'react';

const initialFriends = [
  { id: 1, name: 'Mia', score: 88, status: 'Active', avatar: 'M' },
  { id: 2, name: 'Noah', score: 82, status: 'Challenge ready', avatar: 'N' },
  { id: 3, name: 'Leo', score: 79, status: 'Weekly streak', avatar: 'L' },
  { id: 4, name: 'Emma', score: 91, status: 'Top performer', avatar: 'E' },
];

const initialGroups = [
  { id: 1, title: 'Morning Movers', progress: 84, members: 12, description: 'Early birds staying active' },
  { id: 2, title: 'Weekend Warriors', progress: 69, members: 8, description: 'Weekend workout warriors' },
  { id: 3, title: 'Clean Plate Club', progress: 92, members: 6, description: 'Healthy eating enthusiasts' },
];

const initialSnaps = [
  { id: 1, title: 'Protein-packed brunch', description: 'A quick meal recap from Jess', time: '5m ago', from: 'Jess' },
  { id: 2, title: 'Sunrise smoothie', description: 'Auto-vanishing meal snapshot from Omar', time: '12m ago', from: 'Omar' },
  { id: 3, title: 'Post-workout meal', description: 'Healthy dinner from Mia', time: '25m ago', from: 'Mia' },
];

export default function Social() {
  const [friends, setFriends] = useState(initialFriends);
  const [groups, setGroups] = useState(initialGroups);
  const [snaps, setSnaps] = useState(initialSnaps);
  const [viewedSnaps, setViewedSnaps] = useState([]);
  const [activeTab, setActiveTab] = useState('friends');

  const viewSnap = (id) => {
    if (!viewedSnaps.includes(id)) {
      setViewedSnaps((ids) => [...ids, id]);
    }
  };

  // Auto-vanish snaps after viewing
  const visibleSnaps = snaps.filter((snap) => !viewedSnaps.includes(snap.id));

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <span className="section-tag">Social</span>
          <h1>Friends & Groups</h1>
          <p>Connect with friends, join challenges, and share moments</p>
        </div>
      </header>

      <div className="social-tabs">
        <button 
          className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </button>
        <button 
          className={`tab-btn ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          Groups
        </button>
        <button 
          className={`tab-btn ${activeTab === 'snaps' ? 'active' : ''}`}
          onClick={() => setActiveTab('snaps')}
        >
          Meal Snaps
        </button>
      </div>

      {activeTab === 'friends' && (
        <div className="friends-grid">
          <div className="friends-list">
            <h3>Your Friends</h3>
            {friends.map((friend) => (
              <div key={friend.id} className="friend-card">
                <div className="friend-avatar">{friend.avatar}</div>
                <div className="friend-info">
                  <strong>{friend.name}</strong>
                  <p>{friend.status}</p>
                </div>
                <div className="friend-score">
                  <span className="score-value">{friend.score}</span>
                  <span className="score-label">Health Score</span>
                </div>
              </div>
            ))}
            <button className="btn btn-secondary">Add New Friend</button>
          </div>

          <div className="leaderboard">
            <h3>Leaderboard</h3>
            <div className="leaderboard-list">
              {[...friends].sort((a, b) => b.score - a.score).map((friend, index) => (
                <div key={friend.id} className="leaderboard-item">
                  <span className="rank">#{index + 1}</span>
                  <span className="name">{friend.name}</span>
                  <span className="score">{friend.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="groups-grid">
          {groups.map((group) => (
            <div key={group.id} className="group-card">
              <div className="group-header">
                <h3>{group.title}</h3>
                <span className="member-count">{group.members} members</span>
              </div>
              <p className="group-description">{group.description}</p>
              <div className="progress-section">
                <div className="progress-header">
                  <span>Group Progress</span>
                  <span>{group.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div style={{ width: `${group.progress}%` }} />
                </div>
              </div>
              <button className="btn btn-secondary">View Details</button>
            </div>
          ))}
          <div className="group-card new-group">
            <span className="add-icon">+</span>
            <h3>Create New Group</h3>
            <p>Start a new challenge with friends</p>
          </div>
        </div>
      )}

      {activeTab === 'snaps' && (
        <div className="snaps-grid">
          <div className="snaps-section">
            <h3>Ephemeral Meal Snaps</h3>
            <p className="snap-info">Snaps vanish after you view them</p>
            {visibleSnaps.length > 0 ? (
              <div className="snaps-list">
                {visibleSnaps.map((snap) => (
                  <button 
                    key={snap.id} 
                    className="snap-card"
                    onClick={() => viewSnap(snap.id)}
                  >
                    <div className="snap-header">
                      <span className="snap-from">{snap.from}</span>
                      <span className="snap-time">{snap.time}</span>
                    </div>
                    <strong>{snap.title}</strong>
                    <p>{snap.description}</p>
                    <span className="tap-hint">Tap to view</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-snaps">
                <p>No new snaps available</p>
                <p className="hint">Ask friends to share their meals!</p>
              </div>
            )}
          </div>

          <div className="create-snap">
            <h3>Share a Meal Snap</h3>
            <p>Share what you're eating with friends</p>
            <button className="btn btn-primary">Create Snap</button>
          </div>
        </div>
      )}
    </div>
  );
}