import { useState, useEffect } from 'react'

export default function Solution() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const id = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [isRunning])

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
        {String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button onClick={() => setIsRunning(true)}>Start</button>
        <button onClick={() => setIsRunning(false)}>Stop</button>
        <button onClick={() => { setIsRunning(false); setSeconds(0) }}>Reset</button>
      </div>
    </div>
  )
}
