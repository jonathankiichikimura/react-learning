import { useState } from 'react'

export const description = {
  title: 'Multi-branch Rendering',
  concept: 'Conditional rendering · Early return · Multiple branches · if/else',
  task: 'Build a WeatherCard with three possible states: loading, error, and loaded. Use early returns (if statements before return) to show a different UI for each state. Three buttons let you switch between states to test each branch.',
  hints: [
    'Early returns go BEFORE the main return: if (loading) return <Spinner />',
    'Early returns keep your code clean — avoid deeply nested ternaries',
    'You can return any JSX from an early return: return <p>Loading...</p>',
    'The order matters: check loading first, then error, then show the happy path',
  ],
  acceptance: [
    'Shows a loading message when loading is true',
    'Shows an error message when error is true (and loading is false)',
    'Shows weather data when both are false',
    'Buttons let you switch between all three states',
    'Each state shows a visually distinct UI',
  ],
}

export default function Challenge() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // TODO: Add early returns for loading and error states BEFORE the main return
  // if (loading) return ...
  // if (error) return ...

  return (
    <div>
      <div className="card" style={{ marginBottom: '1rem' }}>
        <span style={{ fontSize: '2rem' }}>☀️</span>
        <h3>San Francisco</h3>
        <p>72°F — Sunny</p>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => { setLoading(true); setError(false) }}>Simulate Loading</button>
        <button onClick={() => { setError(true); setLoading(false) }}>Simulate Error</button>
        <button onClick={() => { setLoading(false); setError(false) }}>Show Data</button>
      </div>
    </div>
  )
}
