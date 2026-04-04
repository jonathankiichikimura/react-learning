import { useState } from 'react'

export const description = {
  title: 'Multiple Event Types',
  concept: 'Events · onFocus · onBlur · onChange · onClick · Composing handlers',
  task: 'Build a password input field that uses four different event handlers simultaneously: onChange (update the value), onFocus / onBlur (track whether the field is currently active to change border color), and onClick on a toggle button to show/hide the password. Also show a strength label (Weak / Fair / Strong) derived from the password length.',
  hints: [
    'onFocus fires when the field gains focus; onBlur fires when it loses focus',
    'Store isFocused in state and use it to change the input border color',
    'Toggle between type="password" and type="text" using a showPassword boolean state',
    'Derive strength from length: < 6 → "Weak", < 10 → "Fair", ≥ 10 → "Strong"',
    'Only show the strength label when password.length > 0',
  ],
  acceptance: [
    'Typing in the field updates the stored value (onChange)',
    'The input\'s border changes color when focused vs unfocused (onFocus / onBlur)',
    'The show/hide toggle button switches between password dots and visible text (onClick)',
    'A strength label appears as you type: "Weak" < 6 chars, "Fair" < 10, "Strong" ≥ 10',
    'All four event types (onChange, onFocus, onBlur, onClick) are present',
  ],
}

const STRENGTH_COLORS = { Weak: '#f87171', Fair: '#fb923c', Strong: '#4ade80' }

export default function Challenge() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // TODO: Derive strength from password.length
  // null when empty, 'Weak' < 6, 'Fair' < 10, 'Strong' >= 10

  return (
    <div style={{ maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontSize: '0.85rem', color: '#aaa' }}>Password</label>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          // TODO: add onFocus and onBlur to track isFocused
          placeholder="Enter a password"
          style={{ flex: 1, borderColor: isFocused ? '#60a5fa' : '#3a3a3a', transition: 'border-color 0.2s' }}
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? '🙈' : '👁'}
        </button>
      </div>
      {/* TODO: Show strength label only when password.length > 0 */}
    </div>
  )
}
