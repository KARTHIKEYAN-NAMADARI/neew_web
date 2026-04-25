import { useState } from 'react'
import './SmartwatchSync.css'

function SmartwatchSync() {
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      setSyncing(false)
      setLastSync(new Date().toLocaleString())
    }, 2000)
  }

  return (
    <div className="sync">
      <h2>Smartwatch Sync</h2>
      <p>Sync your latest activity data from your smartwatch.</p>
      <button onClick={handleSync} disabled={syncing} className="sync-btn">
        {syncing ? 'Syncing...' : 'Sync Now'}
      </button>
      {lastSync && <p>Last synced: {lastSync}</p>}
      <div className="mock-data">
        <h3>Recent Activity</h3>
        <ul>
          <li>Steps: 8,432</li>
          <li>Calories: 1,250</li>
          <li>Heart Rate: 72 bpm</li>
        </ul>
      </div>
    </div>
  )
}

export default SmartwatchSync