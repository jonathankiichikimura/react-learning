import { useState } from 'react'

export default function Solution() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  if (loading) {
    return (
      <div>
        <div className="card" style={{ marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>⏳</span>
          <p style={{ color: '#aaa' }}>Fetching weather data...</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => { setLoading(true); setError(false) }}>Simulate Loading</button>
          <button onClick={() => { setError(true); setLoading(false) }}>Simulate Error</button>
          <button onClick={() => { setLoading(false); setError(false) }}>Show Data</button>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className="card" style={{ marginBottom: '1rem', borderColor: '#7f1d1d' }}>
          <span style={{ fontSize: '2rem' }}>⚠️</span>
          <p style={{ color: '#f87171' }}>Failed to load weather. Try again.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => { setLoading(true); setError(false) }}>Simulate Loading</button>
          <button onClick={() => { setError(true); setLoading(false) }}>Simulate Error</button>
          <button onClick={() => { setLoading(false); setError(false) }}>Show Data</button>
        </div>
      </div>
    )
  }

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
