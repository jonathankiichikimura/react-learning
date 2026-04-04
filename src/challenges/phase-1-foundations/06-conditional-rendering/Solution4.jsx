import { useState } from 'react'

function Controls({ setStatus }) {
  return (
    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
      <button onClick={() => setStatus('loading')}>Load</button>
      <button onClick={() => setStatus('error')}>Error</button>
      <button onClick={() => setStatus('success')}>Success</button>
      <button onClick={() => setStatus('idle')} style={{ background: '#2a2a2a' }}>Reset</button>
    </div>
  )
}

export default function Solution() {
  const [status, setStatus] = useState('idle')

  if (status === 'loading') {
    return (
      <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#60a5fa' }}>⏳ Loading data...</p>
        <Controls setStatus={setStatus} />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#f87171' }}>⚠ Something went wrong. Please try again.</p>
        <Controls setStatus={setStatus} />
      </div>
    )
  }

  if (status === 'idle') {
    return (
      <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: '#777' }}>Click "Load" to fetch data.</p>
        <Controls setStatus={setStatus} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div className="card">
        <h3 style={{ margin: '0 0 0.3rem' }}>Data loaded!</h3>
        <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>42 records fetched successfully.</p>
      </div>
      <Controls setStatus={setStatus} />
    </div>
  )
}
