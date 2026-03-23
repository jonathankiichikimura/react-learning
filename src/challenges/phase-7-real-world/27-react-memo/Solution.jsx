import { useState, useRef, memo } from 'react'

const ExpensiveChild = memo(function ExpensiveChild({ count }) {
  const renders = useRef(0)
  renders.current += 1

  return (
    <div style={{ padding: '1rem', background: '#1a1a1a', borderRadius: '6px', marginTop: '1rem' }}>
      <p>Count prop: <strong>{count}</strong></p>
      <p style={{ color: '#888', fontSize: '0.8rem' }}>
        ExpensiveChild has rendered {renders.current} time{renders.current !== 1 ? 's' : ''}.
        (With memo, this only increments when count changes.)
      </p>
    </div>
  )
})

export default function Solution() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        <button onClick={() => setCount(c => c + 1)}>Counter: {count}</button>
        <input
          placeholder="Type here (unrelated state)..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <ExpensiveChild count={count} />
    </div>
  )
}
