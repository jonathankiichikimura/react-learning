import { useState, useRef } from 'react'

export default function Solution() {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const renderCount = useRef(0)

  renderCount.current += 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '300px' }}>
      <input
        ref={inputRef}
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => inputRef.current.focus()}>
          Focus Input
        </button>
        <button onClick={() => alert(`Rendered ${renderCount.current} times`)}>
          Check Renders
        </button>
      </div>
    </div>
  )
}
