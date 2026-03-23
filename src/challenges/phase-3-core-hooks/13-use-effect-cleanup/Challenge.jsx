import { useState, useEffect } from 'react'

export const description = {
  title: 'useEffect Cleanup',
  concept: 'Cleanup functions · setInterval · Memory leaks',
  task: 'Build a stopwatch that counts up in seconds. It has Start and Stop buttons. When started, use setInterval inside useEffect to tick every second. The effect MUST return a cleanup function that clears the interval — otherwise intervals stack up and the count goes haywire.',
  hints: [
    'useEffect can return a cleanup function: useEffect(() => { ...; return () => clearInterval(id) }, [isRunning])',
    'setInterval returns an ID: const id = setInterval(() => setSeconds(s => s + 1), 1000)',
    'Use a functional update for setSeconds — setSeconds(s => s + 1) — so you don\'t need seconds in the deps array',
    'Only start the interval when isRunning is true: if (!isRunning) return',
    'The cleanup runs when isRunning changes (before the next effect) AND when the component unmounts',
    'Without cleanup: clicking Start twice creates two intervals running simultaneously',
  ],
  acceptance: [
    'Clicking Start begins counting up in seconds',
    'Clicking Stop pauses the counter',
    'Clicking Start again resumes from where it stopped',
    'Clicking Start multiple times does NOT make it count faster',
    'Add a Reset button that stops and resets to 0',
  ],
}

export default function Challenge() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // TODO:
  // Add a useEffect that:
  // 1. If isRunning is false, do nothing (return early)
  // 2. Creates a setInterval that increments seconds every 1000ms
  // 3. Returns a cleanup function that calls clearInterval

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
