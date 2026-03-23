import { createContext, useContext, useState } from 'react'

export const description = {
  title: 'useContext',
  concept: 'createContext · Provider · useContext · Avoiding prop drilling',
  task: 'Build a theme toggle (light/dark). The app has a Header component and a Page component. The toggle button lives in Header, but the theme affects the whole Page background. Connect them via Context — no theme prop should be passed through any component.',
  hints: [
    'Step 1: Create context: const ThemeContext = createContext("light")',
    'Step 2: Provide it at the top: <ThemeContext.Provider value={{ theme, setTheme }}>',
    'Step 3: Consume anywhere: const { theme, setTheme } = useContext(ThemeContext)',
    'Context solves "prop drilling" — passing props through components that don\'t use them, just to get them somewhere deeper',
    'The Provider\'s value can be anything — usually an object with state and setters',
  ],
  acceptance: [
    'A ThemeContext is created with createContext',
    'A Provider wraps both Header and Page at the top level',
    'Header reads the theme from context and renders a toggle button',
    'Page reads the theme and changes its background/text color accordingly',
    'No theme prop is passed between components',
  ],
}

// TODO:
// 1. Create ThemeContext with createContext
// 2. In Challenge, wrap everything in ThemeContext.Provider with { theme, setTheme } as the value
// 3. In Header, use useContext(ThemeContext) to get setTheme and render a toggle button
// 4. In Page, use useContext(ThemeContext) to get theme and style accordingly

const ThemeContext = createContext(null)

function Header() {
  // TODO: get setTheme from context, render a toggle button
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #333' }}>
      <strong>My App</strong>
      {/* Add toggle button here */}
    </header>
  )
}

function Page() {
  // TODO: get theme from context, apply background + text color
  return (
    <main style={{ padding: '1.5rem' }}>
      <h2>Welcome</h2>
      <p>This page reflects the current theme.</p>
    </main>
  )
}

export default function Challenge() {
  const [theme, setTheme] = useState('dark')

  // TODO: Wrap Header and Page in ThemeContext.Provider
  return (
    <div style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
      <Header />
      <Page />
    </div>
  )
}
