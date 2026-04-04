import { useState } from 'react'

export const description = {
  title: 'Full Form Flow',
  concept: 'Controlled inputs · Multi-field form · Object state · Submit · Confirmation view',
  task: 'Build a "Contact Us" form with four controlled fields all stored in ONE state object: name (text), email (text), subject (select with 3 options), and message (textarea). Validate on submit — if any field is empty, show an error. On valid submit, switch to a confirmation card showing all four values. The confirmation has an "Edit" button that returns to the filled-in form.',
  hints: [
    'Single state object: const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" })',
    'Update one field: setForm({ ...form, name: e.target.value })',
    'Select: <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>',
    'Textarea: <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />',
    'Validate on submit: if (!form.name.trim() || !form.email.trim() || !form.message.trim()) — show error and return',
  ],
  acceptance: [
    'All four fields are controlled — typing updates the UI immediately',
    'All four fields share ONE state object — not four separate useState calls',
    'Submitting with an empty field shows a validation error message',
    'A valid submit shows a confirmation card with all four values displayed',
    'The "Edit" button returns to the form with the previously entered values still present',
  ],
}

export default function Challenge() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Validate — if name, email, or message is empty, setError(...) and return
    // If valid: setError('') and setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card" style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Message sent!</h3>
        {/* TODO: Show name, email, subject, and message from form state */}
        <button onClick={() => setSubmitted(false)} style={{ marginTop: '0.75rem', background: '#2a2a2a' }}>Edit</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <input
        placeholder="Your name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email address"
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      {/* TODO: Add a controlled <select> with options: General Inquiry, Technical Support, Billing */}
      {/* TODO: Add a controlled <textarea> rows={4} for the message */}
      {error && <p style={{ color: '#f87171', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
      <button type="submit">Send Message</button>
    </form>
  )
}
