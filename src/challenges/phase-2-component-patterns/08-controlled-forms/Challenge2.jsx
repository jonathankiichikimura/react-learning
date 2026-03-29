import { useState } from 'react'

export const description = {
  title: 'Select & Textarea',
  concept: 'Controlled inputs · select · textarea · onChange',
  task: 'Build a feedback form with a category dropdown (select) and a message textarea. Both must be controlled. Show a live character count below the textarea. On submit, show a confirmation card with the selected category and message.',
  hints: [
    'A controlled <select> uses value and onChange just like <input>',
    '<select value={category} onChange={e => setCategory(e.target.value)}>',
    'A controlled <textarea> also uses value and onChange — not defaultValue',
    'Character count is derived: message.length — never store it as state',
    'Disable submit when message is empty',
  ],
  acceptance: [
    'The category <select> is controlled — changing it updates state',
    'The <textarea> is controlled — typing updates state',
    'A live character count is displayed below the textarea',
    'Submitting shows a confirmation with the chosen category and message',
    'The page does not reload on submit',
  ],
}

const CATEGORIES = ['Bug Report', 'Feature Request', 'General Feedback']

export default function Challenge() {
  const [category, setCategory] = useState(CATEGORIES[0])
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // TODO: write handleSubmit — call e.preventDefault() and set submitted to true

  if (submitted) {
    // TODO: show a confirmation with category and message
    return <p>Submitted!</p>
  }

  return (
    <form
      // TODO: wire up onSubmit
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px' }}
    >
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: '#aaa' }}>
        Category
        {/* TODO: wire up value and onChange */}
        <select style={{ padding: '0.4rem', background: '#1a1a1a', color: '#ddd', border: '1px solid #3a3a3a', borderRadius: '5px' }}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.85rem', color: '#aaa' }}>
        Message
        {/* TODO: wire up value and onChange */}
        <textarea
          rows={4}
          placeholder="Describe your feedback..."
          style={{ padding: '0.4rem 0.6rem', background: '#1a1a1a', color: '#ddd', border: '1px solid #3a3a3a', borderRadius: '5px', resize: 'vertical', fontFamily: 'inherit' }}
        />
        {/* TODO: show character count derived from message.length */}
        <span style={{ color: '#555', fontSize: '0.75rem' }}>0 characters</span>
      </label>

      {/* TODO: disable when message is empty */}
      <button type="submit">Send Feedback</button>
    </form>
  )
}
