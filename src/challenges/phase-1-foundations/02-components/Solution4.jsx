function NavBar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#1a1a1a', borderRadius: '8px' }}>
      <span style={{ fontWeight: 700, color: '#60a5fa' }}>★ MyApp</span>
      <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
        <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Home</a>
        <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>About</a>
        <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section style={{ padding: '2rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Welcome to MyApp</h1>
      <p style={{ color: '#aaa', maxWidth: '280px', margin: '0 auto' }}>
        The best app for doing things. Get started today and see the difference.
      </p>
      <button style={{ marginTop: '1.25rem', padding: '0.5rem 1.25rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        Get Started
      </button>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ padding: '0.75rem 1rem', textAlign: 'center', fontSize: '0.8rem', color: '#555', borderTop: '1px solid #222' }}>
      © 2025 MyApp · Privacy · Terms
    </footer>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
      <NavBar />
      <Hero />
      <Footer />
    </div>
  )
}
