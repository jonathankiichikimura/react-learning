import { useState } from 'react'

export default function Solution() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function update(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setError('')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card" style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <h3 style={{ margin: '0 0 0.5rem' }}>Message sent!</h3>
        <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Name:</strong> {form.name}</p>
        <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Email:</strong> {form.email}</p>
        <p style={{ margin: 0, fontSize: '0.85rem' }}><strong>Subject:</strong> {form.subject}</p>
        <p style={{ margin: 0, fontSize: '0.85rem', color: '#aaa' }}>{form.message}</p>
        <button onClick={() => setSubmitted(false)} style={{ marginTop: '0.75rem', background: '#2a2a2a' }}>Edit</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <input placeholder="Your name"      value={form.name}    onChange={update('name')}    />
      <input placeholder="Email address" type="email" value={form.email} onChange={update('email')} />
      <select value={form.subject} onChange={update('subject')}>
        <option value="general">General Inquiry</option>
        <option value="support">Technical Support</option>
        <option value="billing">Billing</option>
      </select>
      <textarea
        placeholder="Your message..."
        value={form.message}
        onChange={update('message')}
        rows={4}
        style={{ padding: '0.6rem', background: '#1a1a1a', color: '#ddd', border: '1px solid #3a3a3a', borderRadius: '6px', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9rem' }}
      />
      {error && <p style={{ color: '#f87171', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
      <button type="submit">Send Message</button>
    </form>
  )
}
