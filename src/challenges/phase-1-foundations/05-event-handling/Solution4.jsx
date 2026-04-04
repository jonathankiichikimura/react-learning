import { useState } from 'react'

const STRENGTH_COLORS = { Weak: '#f87171', Fair: '#fb923c', Strong: '#4ade80' }

export default function Solution() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const strength =
    password.length === 0  ? null
    : password.length < 6  ? 'Weak'
    : password.length < 10 ? 'Fair'
    : 'Strong'

  return (
    <div style={{ maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Password</label>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter a password"
          style={{ flex: 1, borderColor: isFocused ? '#60a5fa' : '#3a3a3a', transition: 'border-color 0.2s' }}
        />
        <button onClick={() => setShowPassword(prev => !prev)}>
          {showPassword ? '🙈' : '👁'}
        </button>
      </div>
      {strength && (
        <p style={{ fontSize: '0.8rem', color: STRENGTH_COLORS[strength], margin: 0 }}>
          Strength: <strong>{strength}</strong>
        </p>
      )}
    </div>
  )
}
