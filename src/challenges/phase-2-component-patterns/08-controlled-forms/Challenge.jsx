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
  // 1. Create state for name, email, password (and maybe a submitted flag)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // 2. Wire each input's value and onChange
  // 3. Disable the button when any field is empty
  const isValid = !name || !email || !password
  // 4. Handle form submission: prevent default, then show the success message

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <form onSubmit={(e) => {
              handleSubmit(e)
              setName("")
              setEmail("")
              setPassword("")
            }
          }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '300px' }}>
        <input placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button type="submit" disabled={isValid}>Sign Up</button>
        {console.log(isValid)}
      </div>
    </form>
  )
}
