import { useState } from 'react'

export const description = {
  title: 'Sorting Lists',
  concept: 'Arrays · .sort() · Immutable sort · Derived sorted list · State for sort order',
  task: 'Build a contact list that can be sorted three ways: by Name A→Z, by Name Z→A, or by "Recent" (original insertion order). The sort mode lives in state. The sorted list is derived fresh each render — never stored separately. CRITICAL: Array.sort() mutates the original — always sort a copy: [...contacts].sort(...)',
  hints: [
    'Spread first, then sort: [...CONTACTS].sort((a, b) => a.name.localeCompare(b.name))',
    'Sorting CONTACTS directly mutates the array, which causes subtle bugs — always copy first',
    'Derive sortedContacts each render with an if/ternary based on sortBy',
    'For Z→A: [...CONTACTS].sort((a, b) => b.name.localeCompare(a.name))',
    'For "recent": just [...CONTACTS] — no sort needed, original order is preserved',
    'localeCompare handles alphabetical ordering correctly',
  ],
  acceptance: [
    'Three sort buttons render: Recent, A→Z, Z→A',
    'Clicking A→Z sorts contacts alphabetically by name',
    'Clicking Z→A reverses the alphabetical order',
    'Clicking Recent restores the original order',
    'The CONTACTS array is never mutated — a new array is derived each render',
  ],
}

const CONTACTS = [
  { id: 1, name: 'Jordan Lee',    role: 'Designer' },
  { id: 2, name: 'Alice Chen',    role: 'Engineer' },
  { id: 3, name: 'Marcus Webb',   role: 'PM'       },
  { id: 4, name: 'Sara Kim',      role: 'Engineer' },
  { id: 5, name: 'Dan Thomas',    role: 'Designer' },
]

export default function Challenge() {
  const [sortBy, setSortBy] = useState('recent')

  // TODO: Derive sortedContacts from CONTACTS based on sortBy:
  // 'az'     → [...CONTACTS].sort((a, b) => a.name.localeCompare(b.name))
  // 'za'     → [...CONTACTS].sort((a, b) => b.name.localeCompare(a.name))
  // 'recent' → [...CONTACTS]  (no sort)
  const sortedContacts = CONTACTS // ← replace this

  return (
    <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {[['recent', 'Recent'], ['az', 'A → Z'], ['za', 'Z → A']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setSortBy(val)}
            style={{
              background: sortBy === val ? '#1a2f4a' : '#2a2a2a',
              color:      sortBy === val ? '#60a5fa' : '#ccc',
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
