export const description = {
  title: 'Extract Components',
  concept: 'Components · Refactoring · Single responsibility · Component boundaries',
  task: 'The Challenge component below contains all the JSX in one big block — a nav, a hero section, and a footer. Your task: extract NavBar, Hero, and Footer as three separate component functions at module scope. Then replace the inline JSX in Challenge with <NavBar />, <Hero />, and <Footer />. The output should look identical — only the code organization improves.',
  hints: [
    'Define NavBar, Hero, and Footer as function declarations above Challenge (at module scope)',
    'Cut the nav JSX out of Challenge, paste it into a new NavBar function, then render <NavBar /> in its place',
    'Do the same for Hero (the heading/paragraph/button section) and Footer',
    'Components with no data dependencies need zero props — they are self-contained',
    'Naming rule: component functions must start with a capital letter',
  ],
  acceptance: [
    'NavBar, Hero, and Footer are each a separate function defined at module scope',
    'Challenge renders only <NavBar />, <Hero />, and <Footer /> — no raw nav/section/footer JSX remains',
    'The preview output looks exactly the same as the starting state',
    'No component is defined inside another component',
  ],
}

// TODO: Extract NavBar, Hero, and Footer as separate component functions above Challenge.
// Then replace the inlined JSX below with <NavBar />, <Hero />, and <Footer />.

export default function Challenge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>

      {/* Extract this into NavBar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#1a1a1a', borderRadius: '8px' }}>
        <span style={{ fontWeight: 700, color: '#60a5fa' }}>★ MyApp</span>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
          <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Home</a>
          <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</a>
        </div>
      </nav>

      {/* Extract this into Hero */}
      <section style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Welcome to MyApp</h1>
        <p style={{ color: '#aaa', maxWidth: '280px', margin: '0 auto' }}>
          The best app for doing things. Get started today and see the difference.
        </p>
        <button style={{ marginTop: '1.25rem', padding: '0.5rem 1.25rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Get Started
        </button>
      </section>

      {/* Extract this into Footer */}
      <footer style={{ padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.8rem', color: '#555', borderTop: '1px solid #222' }}>
        © 2025 MyApp · Privacy · Terms
      </footer>

    </div>
  )
}
