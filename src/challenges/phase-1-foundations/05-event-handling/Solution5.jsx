import { useState } from 'react'

const INITIAL = [
  { id: 1, text: 'Alice commented on your post', read: false },
  { id: 2, text: 'Your pull request was merged',  read: false },
  { id: 3, text: 'New follower: Bob',              read: false },
]

export default function Solution() {
  const [notifications, setNotifications] = useState(INITIAL)

  function handleRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function handleDismiss(e, id) {
    e.stopPropagation()
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '320px' }}>
      {notifications.length === 0 && <p style={{ color: '#555' }}>All caught up!</p>}
      {notifications.map(n => (
        <div
          key={n.id}
          onClick={() => handleRead(n.id)}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.75rem 1rem', borderRadius: '8px', cursor: 'pointer',
            background: n.read ? '#111' : '#1a1a1a',
            border: `1px solid ${n.read ? '#222' : '#3a3a3a'}`,
            opacity: n.read ? 0.45 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          <span style={{ fontSize: '0.9rem' }}>
            {!n.read && <span style={{ color: '#60a5fa', marginRight: '0.4rem' }}>●</span>}
            {n.text}
          </span>
          <button
            onClick={e => handleDismiss(e, n.id)}
            style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.1rem', padding: '0 0.2rem', lineHeight: 1 }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
