import { useState, useEffect } from 'react'

export default function Solution() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])

  return (
    <div>
      <p style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center' }}>{count}</p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <p style={{ color: '#666', textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem' }}>
        Check the browser tab title
      </p>
    </div>
  )
}
