import { useState } from 'react'

function TextInput({ label, error, ...rest }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <label style={{ fontSize: '0.8rem', color: '#aaa' }}>{label}</label>
      <input {...rest} />
      {error && <p style={{ color: '#f87171', fontSize: '0.78rem', margin: 0 }}>{error}</p>}
    </div>
  )
}

export default function Solution() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const emailError = email && !email.includes('@') ? 'Must be a valid email' : ''

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '280px' }}>
      <TextInput
        label="Your name"
        placeholder="e.g. Alice"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextInput
        label="Email address"
        placeholder="e.g. alice@example.com"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={emailError}
      />
      <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
        Name: {name || '—'} · Email: {email || '—'}
      </p>
    </div>
  )
}
