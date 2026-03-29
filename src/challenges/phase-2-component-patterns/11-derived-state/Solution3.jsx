import { useState } from 'react'

export default function Solution() {
  const [text, setText] = useState('')

  const charCount     = text.length
  const wordCount     = text.trim() ? text.trim().split(/\s+/).length : 0
  const sentenceCount = (text.match(/[.!?]+/g) || []).length
  const readingTime   = wordCount === 0 ? 0 : Math.ceil(wordCount / 200)

  const stats = [
    { label: 'Characters', value: charCount },
    { label: 'Words',      value: wordCount },
    { label: 'Sentences',  value: sentenceCount },
    { label: 'Read time',  value: `${readingTime} min` },
  ]

  return (
    <div style={{ maxWidth: '380px' }}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={6}
        placeholder="Start typing to analyze your text..."
        style={{
          width: '100%',
          padding: '0.6rem',
          background: '#1a1a1a',
          color: '#ddd',
          border: '1px solid #3a3a3a',
          borderRadius: '6px',
          resize: 'vertical',
          fontFamily: 'inherit',
          fontSize: '0.9rem',
          marginBottom: '0.75rem',
        }}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        {stats.map(({ label, value }) => (
          <div key={label} className="card" style={{ padding: '0.6rem 0.75rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{value}</span>
            <p style={{ fontSize: '0.75rem', color: '#777', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
