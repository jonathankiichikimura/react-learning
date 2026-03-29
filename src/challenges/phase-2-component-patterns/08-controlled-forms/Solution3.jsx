import { useState } from 'react'

function ErrorMsg({ children }) {
  return <p style={{ color: '#f87171', fontSize: '0.8rem', margin: 0 }}>{children}</p>
}

export default function Solution() {
  const [username, setUsername] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const tooShort     = username.length > 0 && username.length < 3
  const tooLong      = username.length > 20
  const invalidChars = username.length > 0 && /[^a-zA-Z0-9_]/.test(username)
  const isValid      = username.length >= 3 && !tooLong && !invalidChars

  function handleSubmit(e) {
    e.preventDefault()
    if (isValid) setSubmitted(true)
  }

  if (submitted) {
    return <p style={{ color: '#4ade80' }}>Username @{username} is available!</p>
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '280px' }}>
      <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Username</label>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="e.g. cool_dev_42"
        style={{
          borderColor: isValid && username
            ? '#4ade80'
            : username.length > 0 && !isValid
            ? '#f87171'
            : '#3a3a3a',
        }}
      />
      {tooShort     && <ErrorMsg>Must be at least 3 characters</ErrorMsg>}
      {tooLong      && <ErrorMsg>Must be 20 characters or fewer</ErrorMsg>}
      {invalidChars && <ErrorMsg>Only letters, numbers, and underscores allowed</ErrorMsg>}
      {isValid && username && <p style={{ color: '#4ade80', fontSize: '0.8rem', margin: 0 }}>Looks good!</p>}
      <button type="submit" disabled={!isValid} style={{ marginTop: '0.25rem' }}>
        Check availability
      </button>
    </form>
  )
}
