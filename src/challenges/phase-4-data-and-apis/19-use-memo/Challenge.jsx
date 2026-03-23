import { useState, useMemo } from 'react'

export const description = {
  title: 'useMemo & useCallback',
  concept: 'useMemo · useCallback · Caching expensive work',
  task: 'You have a list of 10,000 numbers and a search input. Without useMemo, the filter runs on EVERY render — even when unrelated state changes. Add a second counter button to prove this, then wrap the filter in useMemo so it only re-runs when the search term changes.',
  hints: [
    'useMemo: const filtered = useMemo(() => numbers.filter(...), [numbers, search])',
    'The dependency array works like useEffect — only recompute when these values change',
    'Add a counter state and button that has nothing to do with the list — clicking it re-renders the component',
    'Without useMemo: clicking the counter re-runs the expensive filter on 10,000 items',
    'With useMemo: clicking the counter uses the cached result — no re-computation',
    'Add a console.log("filtering...") inside the filter callback to see when it actually runs',
  ],
  acceptance: [
    'A list of 10,000 numbers is generated (define outside component, or with useMemo)',
    'Typing in the search box filters the list',
    'The filter is wrapped in useMemo with [numbers, search] as dependencies',
    'A separate counter button exists — clicking it should NOT re-run the filter',
    'A console.log inside the filter confirms it only runs when search changes',
  ],
}

// Generate numbers outside the component so they don't change on re-render
const numbers = Array.from({ length: 10000 }, (_, i) => i + 1)

export default function Challenge() {
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)

  // TODO:
  // Wrap this filter in useMemo so it only re-runs when search changes.
  // Add a console.log("filtering...") inside to verify.
  const filtered = numbers.filter(n => n.toString().includes(search))

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
        Showing {filtered.length} of {numbers.length} numbers
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
