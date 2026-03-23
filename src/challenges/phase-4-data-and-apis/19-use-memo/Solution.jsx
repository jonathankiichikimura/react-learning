import { useState, useMemo } from 'react'

const numbers = Array.from({ length: 10000 }, (_, i) => i + 1)

export default function Solution() {
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)

  const filtered = useMemo(() => {
    console.log('filtering...')
    return numbers.filter(n => n.toString().includes(search))
  }, [search]) // numbers is stable (defined outside), so no need to include it

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          placeholder="Filter numbers..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => setCount(c => c + 1)}>
          Unrelated counter: {count}
        </button>
      </div>
      <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
        Showing {filtered.length} of {numbers.length} — open console to see when filtering runs
      </p>
      <ul style={{ maxHeight: '200px', overflow: 'auto' }}>
        {filtered.slice(0, 100).map(n => (
          <li key={n}>{n}</li>
        ))}
        {filtered.length > 100 && <li style={{ color: '#666' }}>...and {filtered.length - 100} more</li>}
      </ul>
    </div>
  )
}
