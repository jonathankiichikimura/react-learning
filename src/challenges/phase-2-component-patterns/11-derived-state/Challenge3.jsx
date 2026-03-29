import { useState } from 'react'

export const description = {
  title: 'Text Analyzer',
  concept: 'Derived state · Multiple derived values · Single state source',
  task: 'Build a text analyzer with a single textarea. From that one piece of text state, derive four stats: character count, word count, sentence count, and estimated reading time (at 200 wpm). All four must be computed — never stored as separate state variables.',
  hints: [
    'Only one piece of state: const [text, setText] = useState("")',
    'charCount = text.length',
    'wordCount = text.trim() ? text.trim().split(/\\s+/).length : 0',
    'sentenceCount = (text.match(/[.!?]+/g) || []).length',
    'readingTime = Math.ceil(wordCount / 200) — but return 0 when wordCount is 0',
  ],
  acceptance: [
    'Typing in the textarea updates all four stats instantly',
    'Character count matches text.length exactly',
    'Word count is 0 for empty or whitespace-only text',
    'Reading time is 0 for empty text, 1 for 1–200 words',
    'No setWordCount, setCharCount, etc. — all four are derived',
  ],
}

export default function Challenge() {
  const [text, setText] = useState('')

  // TODO: Derive all four stats from text — do not store them in state
  // const charCount     = text.length
  // const wordCount     = text.trim() ? text.trim().split(/\s+/).length : 0
  // const sentenceCount = (text.match(/[.!?]+/g) || []).length
  // const readingTime   = wordCount === 0 ? 0 : Math.ceil(wordCount / 200)

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
        {/* TODO: Replace the 0s with your derived values */}
        {[
          { label: 'Characters', value: 0 },
          { label: 'Words',      value: 0 },
          { label: 'Sentences',  value: 0 },
          { label: 'Read time',  value: '0 min' },
        ].map(({ label, value }) => (
          <div key={label} className="card" style={{ padding: '0.6rem 0.75rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{value}</span>
            <p style={{ fontSize: '0.75rem', color: '#777', margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
