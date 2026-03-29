import { useState } from 'react'

const CATEGORIES = ['Bug Report', 'Feature Request', 'General Feedback']

export default function Solution() {
  const [category, setCategory] = useState(CATEGORIES[0])
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card" style={{ maxWidth: '320px', textAlign: 'left' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Feedback received!</h3>
        <p style={{ color: '#60a5fa', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{category}</p>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{message}</p>
        <button style={{ marginTop: '1rem' }} onClick={() => { setSubmitted(false); setMessage('') }}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px' }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: '#aaa' }}>
        Category
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: '0.4rem', background: '#1a1a1a', color: '#ddd', border: '1px solid #3a3a3a', borderRadius: '5px' }}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: '#aaa' }}>
        Message
        <textarea
          rows={4}
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Describe your feedback..."
          style={{ padding: '0.4rem 0.6rem', background: '#1a1a1a', color: '#ddd', border: '1px solid #3a3a3a', borderRadius: '5px', resize: 'vertical', fontFamily: 'inherit' }}
        />
        <span style={{ color: '#555', fontSize: '0.75rem' }}>{message.length} characters</span>
      </label>

      <button type="submit" disabled={!message.trim()}>Send Feedback</button>
    </form>
  )
}
