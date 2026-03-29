import { useState } from 'react'

export default function Solution() {
  const [lastKey, setLastKey] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <input
        placeholder="Click here and press any key"
        onKeyDown={e => setLastKey(e.key)}
      />
      <p style={{ fontSize: '1.2rem' }}>
        {lastKey
          ? <>Last key: <code style={{ background: '#2a2a2a', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>{lastKey}</code></>
          : 'Press a key...'}
      </p>
    </div>
  )
}
