import { useState } from 'react'

export const description = {
  title: 'Real-time Validation',
  concept: 'Controlled inputs · Validation · Derived error state · UX',
  task: 'Build a "choose a username" field that validates as you type. Rules: 3–20 characters, only letters, numbers, and underscores. Show specific error messages below the input while the rules are violated. The submit button stays disabled until the username is valid. On submit, show a success message.',
  hints: [
    'Derive error messages from state — don\'t store them separately',
    'const tooShort = username.length > 0 && username.length < 3',
    'const invalidChars = /[^a-zA-Z0-9_]/.test(username)',
    'Only show errors after the user has started typing (username.length > 0)',
    'The button is disabled when username is invalid: disabled={!isValid}',
  ],
  acceptance: [
    'Typing fewer than 3 characters shows a "too short" error',
    'Typing invalid characters shows a character error',
    'A valid username (3–20 chars, letters/numbers/underscores) shows no errors',
    'Submit is disabled while invalid',
    'On valid submit, shows "Username @[name] is available!"',
  ],
}

export default function Challenge() {
  const [username, setUsername] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // TODO: Derive validation state — never store errors as separate state
  // const tooShort    = username.length > 0 && username.length < 3
  // const tooLong     = username.length > 20
  // const invalidChars = username.length > 0 && /[^a-zA-Z0-9_]/.test(username)
  // const isValid     = username.length >= 3 && !tooLong && !invalidChars

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
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
      />
      {/* TODO: show error messages conditionally */}
      <button type="submit" disabled={true /* TODO: use isValid */}>
        Check availability
      </button>
    </form>
  )
}
