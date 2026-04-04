import { useState } from 'react'

function Checkbox({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      {label}
    </label>
  )
}

function RadioOption({ label, value, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
      <input type="radio" name="frequency" value={value} checked={checked} onChange={() => onChange(value)} />
      {label}
    </label>
  )
}

export default function Solution() {
  const [emailOn, setEmailOn] = useState(true)
  const [smsOn,   setSmsOn]   = useState(false)
  const [pushOn,  setPushOn]  = useState(true)
  const [frequency, setFrequency] = useState('weekly')
  const [submitted, setSubmitted] = useState(false)

  const enabledChannels = [emailOn && 'Email', smsOn && 'SMS', pushOn && 'Push'].filter(Boolean)

  if (submitted) {
    return (
      <div className="card" style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <p style={{ color: '#4ade80', margin: 0 }}>✓ Settings saved!</p>
        <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
          Channels: {enabledChannels.length ? enabledChannels.join(', ') : 'None'} · {frequency}
        </p>
        <button onClick={() => setSubmitted(false)} style={{ marginTop: '0.5rem', background: '#2a2a2a' }}>Edit</button>
      </div>
    )
  }

  return (
    <form
      onSubmit={e => { e.preventDefault(); setSubmitted(true) }}
      style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      <fieldset style={{ border: '1px solid #333', borderRadius: '6px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <legend style={{ color: '#aaa', fontSize: '0.85rem', padding: '0 0.5rem' }}>Channels</legend>
        <Checkbox label="Email"              checked={emailOn} onChange={setEmailOn} />
        <Checkbox label="SMS"                checked={smsOn}   onChange={setSmsOn}   />
        <Checkbox label="Push Notifications" checked={pushOn}  onChange={setPushOn}  />
      </fieldset>
      <fieldset style={{ border: '1px solid #333', borderRadius: '6px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <legend style={{ color: '#aaa', fontSize: '0.85rem', padding: '0 0.5rem' }}>Digest Frequency</legend>
        <RadioOption label="Daily"  value="daily"  checked={frequency === 'daily'}  onChange={setFrequency} />
        <RadioOption label="Weekly" value="weekly" checked={frequency === 'weekly'} onChange={setFrequency} />
        <RadioOption label="Never"  value="never"  checked={frequency === 'never'}  onChange={setFrequency} />
      </fieldset>
      <p style={{ fontSize: '0.8rem', color: '#777', margin: 0 }}>
        {enabledChannels.length ? `Notifying via: ${enabledChannels.join(', ')}` : 'No channels selected'} · {frequency}
      </p>
      <button type="submit">Save Settings</button>
    </form>
  )
}
