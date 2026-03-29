import { useState } from 'react'

export const description = {
  title: 'Controlled Forms',
  concept: 'Controlled inputs · onSubmit · e.preventDefault()',
  task: 'Build a sign-up form with three fields: Name, Email, and Password. All inputs must be controlled (React owns their values). The Submit button should be disabled until all three fields are non-empty. On submit, prevent the page from reloading and show "Welcome, [name]!" in place of the form.',
  hints: [
    'A controlled input needs both value and onChange: <input value={name} onChange={e => setName(e.target.value)} />',
    'Use three separate state variables (or one object) for the field values',
    'Disable the button when any field is empty: <button disabled={!name || !email || !password}>',
    'Handle submit on the <form> tag: <form onSubmit={handleSubmit}>',
    'Inside handleSubmit, call e.preventDefault() first — otherwise the browser reloads the page',
    'Use a submitted boolean state to swap between showing the form and the success message',
  ],
  acceptance: [
    'All three inputs are controlled — typing updates state',
    'The Submit button is disabled when any field is empty',
    'Submitting shows "Welcome, [name]!" and hides the form',
    'The page does not reload on submit',
  ],
}

export default function Challenge() {
  // TODO:
  // 1. Add state for each field and track whether the form was submitted
  // 2. Show a success message instead of the form after submission
  // 3. Wire each input as a controlled component
  // 4. Disable the button when any field is empty
  // 5. Handle form submission — prevent the default browser behavior

  return (
    <form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '300px' }}>
        <input placeholder="Name" />
        <input placeholder="Email" type="email" />
        <input placeholder="Password" type="password" />
        <button type="submit">Sign Up</button>
      </div>
    </form>
  )
}
