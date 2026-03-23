import { MemoryRouter, Routes, Route, Link, useLocation } from 'react-router-dom'

export const description = {
  title: 'Basic Routing',
  concept: 'React Router · Routes · Route · Link',
  task: 'Build a mini site with three pages: Home, About, and Projects. Include a navigation bar on every page with links between them. Use React Router — all challenges use MemoryRouter so routing works self-contained in the preview.',
  hints: [
    'MemoryRouter is already wrapping your app below — it\'s identical to BrowserRouter but works without a real URL bar',
    'Define routes inside <Routes>: <Route path="/" element={<Home />} />',
    'Create links with <Link to="/about">About</Link> — NOT regular <a> tags (those trigger full reloads)',
    'Put the Nav and Routes inside a layout div so Nav is always visible',
    'Each page component is just a regular function that returns JSX',
  ],
  acceptance: [
    'Three pages exist: Home, About, Projects',
    'A nav bar with links to all three is visible on every page',
    'Clicking a link switches the displayed page without a full reload',
    'Each page shows unique content',
  ],
}

function Nav() {
  // TODO: Add <Link> elements to /, /about, /projects
  return (
    <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid #222', paddingBottom: '0.75rem' }}>
      {/* Add your links here */}
    </nav>
  )
}

function Home()     { return <div><h2>Home</h2><p>Welcome!</p></div> }
function About()    { return <div><h2>About</h2><p>About page content.</p></div> }
function Projects() { return <div><h2>Projects</h2><p>Projects page content.</p></div> }

export default function Challenge() {
  return (
    <MemoryRouter>
      <div>
        <Nav />
        {/* TODO: Add <Routes> with three <Route> entries */}
      </div>
    </MemoryRouter>
  )
}
