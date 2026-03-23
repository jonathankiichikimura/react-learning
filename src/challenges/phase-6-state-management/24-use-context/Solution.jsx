import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext(null)

function Header() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #333', background: theme === 'dark' ? '#1a1a1a' : '#e5e7eb', color: theme === 'dark' ? '#e0e0e0' : '#111' }}>
      <strong>My App</strong>
      <button
        style={{ marginLeft: '1rem' }}
        onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      >
        Switch to {theme === 'dark' ? 'Light' : 'Dark'}
      </button>
    </header>
  )
}

function Page() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'
  return (
    <main style={{ padding: '1.5rem', background: isDark ? '#0f0f0f' : '#f9fafb', color: isDark ? '#e0e0e0' : '#111', minHeight: '120px' }}>
      <h2>Welcome</h2>
      <p>This page reflects the current theme: <strong>{theme}</strong></p>
    </main>
  )
}

export default function Solution() {
  const [theme, setTheme] = useState('dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
        <Header />
        <Page />
      </div>
    </ThemeContext.Provider>
  )
}
