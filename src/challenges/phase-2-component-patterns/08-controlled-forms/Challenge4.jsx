import { useState } from 'react'

export const description = {
  title: 'Checkboxes & Radio Buttons',
  concept: 'Controlled inputs · Checkbox · Radio · checked attribute · Input types',
  task: 'Build a "Notification Settings" form with three controlled checkboxes (Email, SMS, Push) and a controlled radio group (Digest frequency: Daily, Weekly, Never). All inputs are fully controlled. Show a live summary below that updates as you change settings. On submit, show a confirmation card.',
  hints: [
    'Checkboxes use checked={value} not value={value}: <input type="checkbox" checked={emailOn} onChange={e => setEmailOn(e.target.checked)} />',
    'Radio buttons: checked={frequency === "daily"} onChange={() => setFrequency("daily")}',
    'e.target.checked gives you the boolean for checkboxes (not e.target.value)',
    'Radio buttons in the same group share a name attribute for accessibility',
    'Derive the enabledChannels array: [emailOn && "Email", smsOn && "SMS", pushOn && "Push"].filter(Boolean)',
  ],
  acceptance: [
    'Three checkboxes toggle independently',
    'Three radio buttons — only one can be selected at a time',
    'All inputs are controlled (values come from React state)',
    'A live summary updates as checkboxes and the radio group change',
    'Submitting shows a confirmation with the selected settings',
  ],
}

export default function Challenge() {
  const [emailOn, setEmailOn] = useState(true)
  const [smsOn,   setSmsOn]   = useState(false)
  const [pushOn,  setPushOn]  = useState(true)
  const [frequency, setFrequency] = useState('weekly')
  const [submitted, setSubmitted] = useState(false)

  const enabledChannels = [
    emailOn && 'Email',
    smsOn   && 'SMS',
    pushOn  && 'Push',
  ].filter(Boolean)

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
        {/* TODO: Three controlled checkboxes — Email, SMS, Push Notifications */}
        {/* Use checked={emailOn} onChange={e => setEmailOn(e.target.checked)} etc. */}
      </fieldset>

      <fieldset style={{ border: '1px solid #333', borderRadius: '6px', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <legend style={{ color: '#aaa', fontSize: '0.85rem', padding: '0 0.5rem' }}>Digest Frequency</legend>
        {/* TODO: Three controlled radio buttons — Daily, Weekly, Never */}
        {/* Use checked={frequency === "daily"} onChange={() => setFrequency("daily")} etc. */}
      </fieldset>

      <p style={{ fontSize: '0.8rem', color: '#777', margin: 0 }}>
        {enabledChannels.length ? `Notifying via: ${enabledChannels.join(', ')}` : 'No channels selected'} · {frequency}
      </p>
      <button type="submit">Save Settings</button>
    </form>
  )
}
