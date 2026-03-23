import { useState } from 'react'
import { MemoryRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom'

function RequireAuth({ isLoggedIn }) {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />
}

function LoginPage({ onLogin }) {
  const navigate = useNavigate()
  return (
    <div>
      <h2>Login</h2>
      <p>You must be logged in to view the dashboard.</p>
      <button onClick={() => { onLogin(); navigate('/dashboard') }}>Log In</button>
    </div>
  )
}

function Dashboard({ onLogout }) {
  const navigate = useNavigate()
  return (
    <div>
      <h2>Dashboard</h2>
      <p>You are authenticated. Welcome!</p>
      <button onClick={() => { onLogout(); navigate('/login') }}>Log Out</button>
    </div>
  )
}

export default function Solution() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route element={<RequireAuth isLoggedIn={isLoggedIn} />}>
          <Route path="/dashboard" element={<Dashboard onLogout={() => setIsLoggedIn(false)} />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}
