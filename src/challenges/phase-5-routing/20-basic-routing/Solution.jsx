import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'

function Nav() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #222', paddingBottom: '0.75rem' }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/projects">Projects</Link>
    </nav>
  )
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to my site! Navigate using the links above.</p>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About</h2>
      <p>I'm a developer learning React. This page was rendered by React Router.</p>
    </div>
  )
}

function Projects() {
  return (
    <div>
      <h2>Projects</h2>
      <ul>
        <li>React Challenge App</li>
        <li>Temperature Converter</li>
        <li>Todo List</li>
      </ul>
    </div>
  )
}

export default function Solution() {
  return (
    <MemoryRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/"         element={<Home />}     />
          <Route path="/about"    element={<About />}    />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </div>
    </MemoryRouter>
  )
}
