import { useState } from 'react'
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom'

export const description = {
  title: 'Programmatic Navigation',
  concept: 'useNavigate · Navigate after events',
  task: 'Build a mock login flow. The /login page has email and password fields. When submitted with both fields filled, "authenticate" the user and programmatically navigate to /dashboard. The /dashboard should greet the user by email.',
  hints: [
    'Import and call useNavigate inside a component: const navigate = useNavigate()',
    'Navigate after logic: navigate("/dashboard")',
    'useNavigate must be called inside a component that is rendered inside a <Router>',
    'Pass the email to the dashboard via navigate state: navigate("/dashboard", { state: { email } })',
    'Read it on the other side: const { state } = useLocation()',
    'Or just keep it simple — store the email in a shared state at the router level',
  ],
  acceptance: [
    'A /login page with email and password inputs',
    'Submitting with both fields filled navigates to /dashboard',
    'The /dashboard displays a welcome message',
    'Submit button is disabled when either field is empty',
  ],
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: Call onLogin(email), then navigate to '/dashboard'
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '280px' }}>
        <h2>Log In</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={!email || !password}>Log In</button>
      </div>
    </form>
  )
}

function Dashboard({ email }) {
  const navigate = useNavigate()
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {email || 'user'}!</p>
      <button onClick={() => navigate('/')}>Log Out</button>
    </div>
  )
}

export default function Challenge() {
  const [email, setEmail] = useState('')

  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/"          element={<LoginPage onLogin={setEmail} />} />
        <Route path="/dashboard" element={<Dashboard email={email} />}     />
      </Routes>
    </MemoryRouter>
  )
}
