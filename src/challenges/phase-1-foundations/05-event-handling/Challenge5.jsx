import { useState } from 'react'

export const description = {
  title: 'Stopping Propagation',
  concept: 'Events · stopPropagation · Event bubbling · Nested click handlers',
  task: 'Build a notification list where clicking a notification card marks it as "read", and each card also has a "Dismiss" button that removes it. The problem: clicking Dismiss bubbles up and also triggers the card\'s read handler. Fix the Dismiss button with e.stopPropagation() so it only removes the item without marking it read first.',
  hints: [
    'Events bubble up by default: a click on a child also fires every ancestor\'s onClick',
    'e.stopPropagation() stops the event from reaching parent handlers',
    'The dismiss handler needs the event: onClick={e => handleDismiss(e, id)}',
    'Call e.stopPropagation() as the very first line of handleDismiss',
    'Without stopPropagation, removing an item also marks it read (you\'ll see the opacity flash)',
  ],
  acceptance: [
    'Clicking a notification card (not the button) marks it as read (lower opacity)',
    'Clicking "Dismiss" removes only that notification from the list',
    'Clicking "Dismiss" does NOT also trigger the card\'s read handler',
    'e.stopPropagation() is called inside the dismiss handler',
    'Three notifications are rendered initially',
  ],
}

const INITIAL = [
  { id: 1, text: 'Alice commented on your post', read: false },
  { id: 2, text: 'Your pull request was merged',  read: false },
  { id: 3, text: 'New follower: Bob',              read: false },
]

export default function Challenge() {
  const [notifications, setNotifications] = useState(INITIAL)

  function handleRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function handleDismiss(e, id) {
    // TODO: call e.stopPropagation() to prevent the parent card's onClick from firing
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
