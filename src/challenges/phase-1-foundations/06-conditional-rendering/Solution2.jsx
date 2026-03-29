import { useState } from 'react'

export default function Solution() {
  const [count, setCount] = useState(3)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '340px' }}>
      {count > 0 && (
        <div style={{
          background: '#1e3a5f',
          border: '1px solid #3b82f6',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          color: '#93c5fd',
        }}>
          You have {count} unread message{count !== 1 ? 's' : ''}.
        </div>
      )}
      <button onClick={() => setCount(0)}>Mark all read</button>
    </div>
  )
}
