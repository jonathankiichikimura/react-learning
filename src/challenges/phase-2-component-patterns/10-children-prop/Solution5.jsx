import { useState } from 'react'

function Gated({ isAllowed, children, fallback }) {
  return isAllowed ? children : fallback
}

function UpgradePrompt({ label }) {
  return (
    <div style={{ padding: '1rem', border: '1px dashed #3a3a3a', borderRadius: '8px', textAlign: 'center' }}>
      <p style={{ color: '#777', margin: '0 0 0.5rem' }}>🔒 {label} is for subscribers only</p>
      <button style={{ background: '#3b82f6', color: '#fff', borderColor: '#2563eb', fontSize: '0.8rem' }}>
        Upgrade to Pro
      </button>
    </div>
  )
}

export default function Solution() {
  const [isSubscribed, setIsSubscribed] = useState(false)

  return (
    <div style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <button
        onClick={() => setIsSubscribed(s => !s)}
        style={{
          background:  isSubscribed ? '#14532d' : '#2a2a2a',
          color:       isSubscribed ? '#4ade80' : '#ccc',
          borderColor: isSubscribed ? '#16a34a' : '#3a3a3a',
        }}
      >
        {isSubscribed ? '✓ Subscribed — click to unsubscribe' : 'Subscribe to unlock content'}
      </button>

      <Gated isAllowed={isSubscribed} fallback={<UpgradePrompt label="Premium Article" />}>
        <div className="card">
          <h3 style={{ margin: '0 0 0.4rem' }}>The Future of React</h3>
          <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
            React Server Components are changing how we think about data fetching and rendering...
          </p>
        </div>
      </Gated>

      <Gated isAllowed={isSubscribed} fallback={<UpgradePrompt label="Premium Video" />}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', margin: '0.5rem 0' }}>▶️</div>
          <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>Advanced React Patterns — 45 min</p>
        </div>
      </Gated>
    </div>
  )
}
