import { useState } from 'react'
import './SocialGroups.css'

function SocialGroups() {
  const [friends] = useState([
    { name: 'Alice', steps: 9500 },
    { name: 'Bob', steps: 8200 },
    { name: 'Charlie', steps: 11000 }
  ])

  const [challenges] = useState([
    { name: '10K Steps Daily', participants: 5 },
    { name: 'Healthy Eating Week', participants: 12 }
  ])

  return (
    <div className="social">
      <h2>Social Groups</h2>
      <section className="friends">
        <h3>Friends</h3>
        <ul>
          {friends.map((friend, index) => (
            <li key={index}>
              {friend.name}: {friend.steps} steps today
            </li>
          ))}
        </ul>
      </section>
      <section className="challenges">
        <h3>Group Challenges</h3>
        <ul>
          {challenges.map((challenge, index) => (
            <li key={index}>
              {challenge.name} ({challenge.participants} participants)
            </li>
          ))}
        </ul>
      </section>
      <section className="snaps">
        <h3>Meal Snaps</h3>
        <p>Share disappearing photos of your meals!</p>
        <button className="snap-btn">Share Snap</button>
      </section>
    </div>
  )
}

export default SocialGroups