import { useState } from 'react'

export default function Solution() {
  const [tags, setTags] = useState([])
  const [input, setInput] = useState('')

  function handleAdd() {
    const trimmed = input.trim()
    if (!trimmed || tags.includes(trimmed)) return
    setTags(prev => [...prev, trimmed])
    setInput('')
  }

  function handleRemove(tag) {
    setTags(prev => prev.filter(t => t !== tag))
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
