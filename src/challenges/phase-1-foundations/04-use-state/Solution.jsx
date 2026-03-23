import { useState } from 'react'

export default function Solution() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', margin: '1rem 0' }}>
        {count}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  )
}
