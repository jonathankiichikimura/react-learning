function Logo() {
  return <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>★ ReactApp</span>
}

function Nav() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#aaa' }}>
      <a href="#">Home</a>
      <a href="#">About</a>
    </nav>
  )
}

function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Logo />
      <Nav />
    </header>
  )
}

function ProfileCard() {
  return (
    <div className="card">
      <span style={{ fontSize: '3rem' }}>🧑‍💻</span>
      <h3 style={{ margin: '0.5rem 0 0.25rem' }}>Jonathan Picard</h3>
      <p style={{ margin: 0, color: '#aaa', fontSize: '0.9rem' }}>Learning React from scratch.</p>
    </div>
  )
}

function Main() {
  return (
    <main>
      <ProfileCard />
    </main>
  )
}

function Footer() {
  return <footer style={{ textAlign: 'center', color: '#555', fontSize: '0.8rem' }}>© 2025</footer>
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '360px' }}>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}
