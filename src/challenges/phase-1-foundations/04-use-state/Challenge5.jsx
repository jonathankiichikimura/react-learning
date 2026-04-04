import { useState } from 'react'

export const description = {
  title: 'Functional Updates',
  concept: 'useState · Functional updates · prev callback · Stale closures',
  task: 'Build a counter with two buttons: "+ 1" and "+ 10 rapid". The rapid button calls setCount TEN times inside a loop. If you use setCount(count + 1), all ten calls read the same stale count and only add 1 total. Fix it using the functional form: setCount(prev => prev + 1). Also maintain a log of the last 5 operations with timestamps.',
  hints: [
    'The bug: setCount(count + 1) × 10 captures the same count in the closure → only +1',
    'The fix: setCount(prev => prev + 1) — React queues each update with the latest value',
    'Functional form guarantees: each call in the loop sees the result of the previous call',
    'For the log array: setLog(prev => [...prev.slice(-4), newEntry])',
    'Use Date.now() or new Date().toLocaleTimeString() for the timestamp',
  ],
  acceptance: [
    '"+ 1" increments by exactly 1 each click',
    '"+ 10 rapid" increments by exactly 10 each click (not 1)',
    'The rapid button uses the functional update form inside its loop',
    'A log shows the last 5 operations with labels ("+1" or "+10 rapid") and timestamps',
    'The counter display is always correct after every operation',
  ],
}

export default function Challenge() {
  const [count, setCount] = useState(0)
  const [log, setLog] = useState([])

  function handlePlusOne() {
    setCount(count + 1)
    // TODO: append "+1 at HH:MM:SS" to log (keep only last 5 entries)
  }

  function handleRapidPlus10() {
    // BUG: all 10 calls read the same stale `count` — they cancel each other out
    // TODO: change to functional form: setCount(prev => prev + 1)
    for (let i = 0; i < 10; i++) {
      setCount(count + 1)
    }
    // TODO: append "+10 rapid at HH:MM:SS" to log
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '260px' }}>
      <div style={{ fontSize: '3rem', fontWeight: 700, textAlign: 'center' }}>{count}</div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={handlePlusOne} style={{ flex: 1 }}>+ 1</button>
        <button onClick={handleRapidPlus10} style={{ flex: 1, background: '#1a2f4a', borderColor: '#3b82f6', color: '#60a5fa' }}>
          + 10 rapid
        </button>
      </div>
      <button onClick={() => { setCount(0); setLog([]) }} style={{ background: '#2a2a2a' }}>Reset</button>
      <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
        <p style={{ color: '#777', marginBottom: '0.25rem' }}>Last 5 operations:</p>
        {log.length === 0
          ? <p style={{ color: '#444' }}>—</p>
          : log.map((entry, i) => <p key={i} style={{ margin: '0.1rem 0', color: '#555' }}>{entry}</p>)
        }
      </div>
    </div>
  )
}
