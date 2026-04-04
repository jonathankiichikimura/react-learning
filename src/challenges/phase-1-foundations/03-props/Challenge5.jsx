import { useState } from 'react'

export const description = {
  title: 'Spreading Props',
  concept: 'Props · Destructuring · Rest syntax · Prop forwarding',
  task: 'Build a TextInput wrapper component. It has its own label and error props, but forwards ALL other props (placeholder, value, onChange, type, etc.) to the underlying <input> using the rest/spread pattern. Render a name field and an email field using the same TextInput component to prove every native input prop flows through.',
  hints: [
    'Destructure your own props and collect the rest: function TextInput({ label, error, ...rest })',
    '...rest collects every prop that wasn\'t explicitly destructured',
    'Spread them onto the native input: <input {...rest} />',
    'This way placeholder, value, onChange, type all pass through automatically',
    'Test it: passing type="email" on TextInput should make the browser validate the email format',
  ],
  acceptance: [
    'TextInput shows a label above the input and an optional error in red below',
    'All other props (value, onChange, placeholder, type) are forwarded to the native <input>',
    'The name field and email field both use the same TextInput component',
    'Typing in either field updates the displayed values below',
    'The email field shows an error when "@" is missing (error is passed from the parent)',
  ],
}

// TODO: Build a TextInput component:
//   Props: label, error (optional), and ...rest
//   Renders: <label> text, <input {...rest} />, and an error message if error is truthy

export default function Challenge() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const emailError = email && !email.includes('@') ? 'Must be a valid email' : ''

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '280px' }}>
      {/* TODO: Replace these plain inputs with TextInput components */}
      <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} />

      <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
        Name: {name || '—'} · Email: {email || '—'}
      </p>
    </div>
  )
}
