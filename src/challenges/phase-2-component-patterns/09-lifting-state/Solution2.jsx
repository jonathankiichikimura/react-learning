import { useState } from 'react'

function NumberDisplay({ count }) {
  return (
    <p style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', margin: '0.5rem 0' }}>
      {count}
    </p>
  )
}

function BarDisplay({ count }) {
  const width = Math.min(count * 5, 100)
  return (
    <div style={{ background: '#1a1a1a', borderRadius: '4px', height: '16px', overflow: 'hidden', margin: '0.5rem 0' }}>
      <div style={{ width: `${width}%`, height: '100%', background: '#3b82f6', transition: 'width 0.2s' }} />
    </div>
  )
}

export default function Solution() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ maxWidth: '280px' }}>
      <NumberDisplay count={count} />
      <BarDisplay count={count} />
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
        <button onClick={() => setCount(c => Math.max(0, c - 1))}>-</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  )
}
