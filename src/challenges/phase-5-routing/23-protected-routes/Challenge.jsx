import { useState } from 'react'
import { MemoryRouter, Routes, Route, Link, Navigate, Outlet, useNavigate } from 'react-router-dom'

export const description = {
  title: 'Protected Routes',
  concept: 'Route guards · Navigate · Outlet',
  task: 'Build a route guard. The /dashboard route should only be accessible if the user is logged in. If they try to visit it while logged out, redirect them to /login automatically. Use the Navigate component for the redirect and Outlet to render the protected content.',
  hints: [
    '<Navigate to="/login" /> renders nothing and immediately redirects — use it inside a condition',
    'A "guard" component checks auth and either renders <Outlet /> (let through) or <Navigate /> (redirect)',
    'Wrap protected routes: <Route element={<RequireAuth />}><Route path="/dashboard" ... /></Route>',
    '<Outlet /> renders whatever child route matched — it\'s the slot for nested routes',
    'Pass isLoggedIn into RequireAuth via props, or use Context (covered in Phase 6)',
  ],
  acceptance: [
    'Visiting /dashboard while logged out redirects to /login',
    'Logging in and visiting /dashboard shows the dashboard',
    'The dashboard has a Log Out button that redirects back to /login',
    'The guard uses Navigate for redirects — no manual window.location changes',
  ],
}

// TODO: Build a RequireAuth component that:
// - Accepts isLoggedIn as a prop
// - Renders <Outlet /> if logged in
// - Renders <Navigate to="/login" replace /> if not logged in

function RequireAuth({ isLoggedIn }) {
  // TODO
  return <Outlet />
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
      <p>You are authenticated.</p>
      <button onClick={() => { onLogout(); navigate('/login') }}>Log Out</button>
    </div>
  )
}

export default function Challenge() {
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
