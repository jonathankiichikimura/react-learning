import { useState } from 'react'

const CONTACTS = [
  { id: 1, name: 'Jordan Lee',    role: 'Designer' },
  { id: 2, name: 'Alice Chen',    role: 'Engineer' },
  { id: 3, name: 'Marcus Webb',   role: 'PM'       },
  { id: 4, name: 'Sara Kim',      role: 'Engineer' },
  { id: 5, name: 'Dan Thomas',    role: 'Designer' },
]

export default function Solution() {
  const [sortBy, setSortBy] = useState('recent')

  const sortedContacts =
    sortBy === 'az' ? [...CONTACTS].sort((a, b) => a.name.localeCompare(b.name)) :
    sortBy === 'za' ? [...CONTACTS].sort((a, b) => b.name.localeCompare(a.name)) :
    [...CONTACTS]

  return (
    <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {[['recent', 'Recent'], ['az', 'A → Z'], ['za', 'Z → A']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setSortBy(val)}
            style={{
              background:  sortBy === val ? '#1a2f4a' : '#2a2a2a',
              color:       sortBy === val ? '#60a5fa' : '#ccc',
              borderColor: sortBy === val ? '#3b82f6' : '#3a3a3a',
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {sortedContacts.map(c => (
          <li key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: '#1a1a1a', borderRadius: '6px' }}>
            <span>{c.name}</span>
            <span style={{ color: '#777', fontSize: '0.85rem' }}>{c.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
