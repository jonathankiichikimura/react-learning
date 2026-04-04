import { useState } from 'react'

export const description = {
  title: 'Array State',
  concept: 'useState · Arrays · Immutability · Spread · Filter',
  task: 'Build a tag input where users type a tag name, press Enter (or click Add), and it appears as a colored pill. Clicking × on any pill removes it. Core rule: NEVER mutate the array. Add using spread ([...tags, newTag]) and remove using .filter(). Pressing Enter in the input should also add the tag. Silently ignore blank or duplicate tags.',
  hints: [
    'Initialize with an empty array: const [tags, setTags] = useState([])',
    'Add: setTags([...tags, newTag.trim()]) — spread creates a brand new array',
    'Remove: setTags(tags.filter(t => t !== tag)) — filter also returns a new array',
    'Clear the text input after adding: setInput("")',
    'Guard against duplicates: if (!input.trim() || tags.includes(input.trim())) return',
    'Detect Enter key: onKeyDown={e => e.key === "Enter" && handleAdd()}',
  ],
  acceptance: [
    'Typing and clicking Add (or pressing Enter) creates a new tag pill',
    'Each pill has a × button that removes only that tag',
    'Adding a blank or duplicate tag is silently ignored',
    'The text input clears after a tag is successfully added',
    'Tags are stored in an array — not mutated directly',
  ],
}

export default function Challenge() {
  const [tags, setTags] = useState([])
  const [input, setInput] = useState('')

  function handleAdd() {
    // TODO: trim input, guard against empty/duplicate, add to tags, clear input
  }

  function handleRemove(tag) {
    // TODO: filter out the tag
  }

  return (
    <div style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Add a tag..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {tags.map(tag => (
          <span
            key={tag}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.2rem 0.6rem', background: '#1a2f4a', color: '#60a5fa', borderRadius: '999px', fontSize: '0.85rem', border: '1px solid #3b82f6' }}
          >
            {tag}
            <button
              onClick={() => handleRemove(tag)}
              style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', padding: 0, lineHeight: 1, fontSize: '1rem' }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {tags.length === 0 && <p style={{ color: '#555', fontSize: '0.85rem' }}>No tags yet. Type one above.</p>}
    </div>
  )
}
