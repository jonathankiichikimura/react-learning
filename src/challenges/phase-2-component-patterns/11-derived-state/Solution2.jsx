import { useState } from 'react'

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Rust', 'Go',
  'Java', 'C#', 'C++', 'Ruby', 'Swift',
  'Kotlin', 'PHP', 'Dart', 'Scala', 'Haskell',
]

export default function Solution() {
  const [query, setQuery] = useState('')

  const filtered = LANGUAGES.filter(lang =>
    lang.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div style={{ maxWidth: '280px' }}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search languages..."
        style={{ width: '100%', marginBottom: '0.75rem' }}
      />
      <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '0.5rem' }}>
        {filtered.length} of {LANGUAGES.length} languages
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', maxHeight: '200px', overflowY: 'auto' }}>
        {filtered.length > 0
          ? filtered.map(lang => (
              <li key={lang} style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', background: '#1a1a1a', fontSize: '0.9rem' }}>
                {lang}
              </li>
            ))
          : <li style={{ color: '#555', padding: '0.3rem 0.5rem' }}>No matches</li>
        }
      </ul>
    </div>
  )
}
