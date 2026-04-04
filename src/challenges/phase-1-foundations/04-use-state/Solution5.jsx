import { useState } from 'react'

export default function Solution() {
  const [count, setCount] = useState(0)
  const [log, setLog] = useState([])

  function addLog(label) {
    const entry = `${label} at ${new Date().toLocaleTimeString()}`
    setLog(prev => [...prev.slice(-4), entry])
  }

  function handlePlusOne() {
    setCount(prev => prev + 1)
    addLog('+1')
  }

  function handleRapidPlus10() {
    for (let i = 0; i < 10; i++) {
      setCount(prev => prev + 1)
    }
    addLog('+10 rapid')
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
