import { useState, useEffect } from 'react'

export const description = {
  title: 'useEffect Basics',
  concept: 'useEffect · Side effects · Dependency array',
  task: 'Build a counter that keeps the browser tab title in sync with the count. The tab should show "Count: 0", "Count: 1", etc. Use useEffect to update document.title whenever count changes.',
  hints: [
    'useEffect takes two arguments: a callback and a dependency array',
    'Update the title: document.title = `Count: ${count}`',
    'Put count in the deps array: useEffect(() => { ... }, [count])',
    'The effect runs after every render where count changed',
    '[] means run once on mount. No array means run after every render. [count] means run when count changes.',
    'Check the browser tab above to see it working',
  ],
  acceptance: [
    'A counter renders with + and - buttons',
    'The browser tab title shows "Count: 0" on load',
    'The tab title updates every time the count changes',
  ],
}

export default function Challenge() {
  const [count, setCount] = useState(0)

  // TODO: Add a useEffect that sets document.title to `Count: ${count}`
  //       whenever count changes

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
