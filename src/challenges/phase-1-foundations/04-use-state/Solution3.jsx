import { useState } from 'react'

export default function Solution() {
  const [profile, setProfile] = useState({ name: '', bio: '' })

  function handleChange(field, value) {
    setProfile({ ...profile, [field]: value })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px' }}>
      <input
        placeholder="Your name"
        value={profile.name}
        onChange={e => handleChange('name', e.target.value)}
      />
      <input
        placeholder="Short bio"
        value={profile.bio}
        onChange={e => handleChange('bio', e.target.value)}
      />
      <div className="card" style={{ marginTop: '0.5rem', textAlign: 'left' }}>
        <h3>{profile.name || 'Your Name'}</h3>
        <p style={{ color: '#aaa', fontSize: '0.85rem' }}>{profile.bio || 'Your bio will appear here...'}</p>
      </div>
    </div>
  )
}
