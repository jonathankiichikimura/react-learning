import { useState } from 'react'

export const description = {
  title: 'Early Return Pattern',
  concept: 'Conditional rendering · Early returns · Guard clauses · Loading/error/empty/success states',
  task: 'Build a DataView component that handles four distinct states: "idle" (prompt to load), "loading" (spinner text), "error" (error message), and "success" (a data card). Use early returns — one guard clause per state — rather than a deeply nested ternary. Four buttons let you switch between states to test each one.',
  hints: [
    'Early return: if (status === "loading") return <p>Loading...</p>',
    'Check the specific states first, then fall through to the "success" return at the bottom',
    'This avoids deeply nested ternaries: if/if/if is much more readable than ? ? :',
    'Each if-block exits the function — no else clause needed',
    'The controls (buttons) should appear in every state — consider a helper or just repeat them',
  ],
  acceptance: [
    'Clicking "Load" shows a loading indicator (early return)',
    'Clicking "Error" shows an error message in red (early return)',
    'Clicking "Reset" shows the idle prompt (early return)',
    'Clicking "Success" falls through to the main return and shows a data card',
    'The early return pattern is used — not a single deeply nested ternary',
  ],
}

export default function Challenge() {
  const [status, setStatus] = useState('idle')

  // TODO: Add early returns for 'loading', 'error', and 'idle' BEFORE the main return
  // Each early return should show the appropriate UI + the control buttons below

  return (
    <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Success state — this is the main return */}
      <div className="card">
        <h3 style={{ margin: '0 0 0.3rem' }}>Data loaded!</h3>
        <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>42 records fetched successfully.</p>
      </div>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        <button onClick={() => setStatus('loading')}>Load</button>
        <button onClick={() => setStatus('error')}>Error</button>
        <button onClick={() => setStatus('success')}>Success</button>
        <button onClick={() => setStatus('idle')} style={{ background: '#2a2a2a' }}>Reset</button>
      </div>
    </div>
  )
}
