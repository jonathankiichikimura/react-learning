import { useState } from 'react'

const lights = ['red', 'yellow', 'green']
const emojis = { red: '🔴', yellow: '🟡', green: '🟢' }

export default function Solution() {
  const [index, setIndex] = useState(0)
  const light = lights[index]

  function advance() {
    setIndex((index + 1) % lights.length)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontSize: '4rem' }}>{emojis[light]}</p>
      <p style={{ textTransform: 'capitalize', marginBottom: '0.75rem' }}>{light}</p>
      <button onClick={advance}>Next</button>
    </div>
  )
}
