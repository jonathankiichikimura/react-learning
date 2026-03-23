import { useState } from 'react'
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom'

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    onLogin(email)
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '280px' }}>
        <h2>Log In</h2>
        <input placeholder="Email"    value={email}    onChange={e => setEmail(e.target.value)}    />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={!email || !password}>Log In</button>
      </div>
    </form>
  )
}

function Dashboard({ email, onLogout }) {
  const navigate = useNavigate()

  function handleLogout() {
    onLogout()
    navigate('/')
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {email}!</p>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  )
}

export default function Solution() {
  const [email, setEmail] = useState('')

  return (
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path="/"          element={<LoginPage onLogin={setEmail} />}                    />
        <Route path="/dashboard" element={<Dashboard email={email} onLogout={() => setEmail('')} />} />
      </Routes>
    </MemoryRouter>
  )
}
