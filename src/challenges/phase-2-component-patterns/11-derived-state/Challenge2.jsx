import { useState } from 'react'

export const description = {
  title: 'Search Filter',
  concept: 'Derived state · Array.filter() · Controlled input · Live search',
  task: 'Build a searchable list of programming languages. As the user types in the search box, the visible list filters instantly. The filtered list must be DERIVED during render — never store a filtered array in state. Show a count of matches below the input.',
  hints: [
    'Store only two things: the search query in state, and the full list as a constant outside the component',
    'Derive the filtered list: const filtered = LANGUAGES.filter(lang => lang.toLowerCase().includes(query.toLowerCase()))',
    'Never call setFiltered(...) — just compute filtered from query on every render',
    'Show match count: `{filtered.length} of {LANGUAGES.length} languages`',
    'If query is empty, filter returns all languages (includes("") is always true)',
  ],
  acceptance: [
    'Typing in the search box instantly filters the list',
    'The match count updates as you type',
    'Clearing the input shows the full list again',
    'Only query is stored in state — filtered is derived, not stored',
  ],
}

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Rust', 'Go',
  'Java', 'C#', 'C++', 'Ruby', 'Swift',
  'Kotlin', 'PHP', 'Dart', 'Scala', 'Haskell',
]

export default function Challenge() {
  const [query, setQuery] = useState('')

  // TODO: Derive filtered list from LANGUAGES and query — don't store it in state
  // const filtered = LANGUAGES.filter(...)

  return (
    <div style={{ maxWidth: '280px' }}>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search languages..."
        style={{ width: '100%', marginBottom: '0.75rem' }}
      />
      {/* TODO: Show match count using filtered.length */}
      <p style={{ fontSize: '0.8rem', color: '#555', marginBottom: '0.5rem' }}>
        {LANGUAGES.length} languages
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', maxHeight: '200px', overflowY: 'auto' }}>
        {/* TODO: map over filtered, not LANGUAGES */}
        {LANGUAGES.map(lang => (
          <li key={lang} style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', background: '#1a1a1a', fontSize: '0.9rem' }}>
            {lang}
          </li>
        ))}
      </ul>
    </div>
  )
}
