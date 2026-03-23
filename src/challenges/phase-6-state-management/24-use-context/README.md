# 24 — useContext

## The problem: prop drilling

As your component tree grows, passing data down through many levels becomes painful. Consider a theme that affects components at every level of the tree:

```
App (theme state lives here)
└── Layout
    └── Sidebar
        └── Nav
            └── NavItem  ← needs theme, but it's 4 levels down
```

To get `theme` from `App` to `NavItem`, you'd have to pass it as a prop through `Layout`, `Sidebar`, and `Nav` — none of which actually use it. This is called **prop drilling**, and it makes components brittle and hard to refactor.

## Context as a solution

Context lets you teleport data past intermediate components. Any component in the tree can read the context directly without props from its parent.

## Three steps

**1. Create the context**
```jsx
import { createContext } from 'react'
const ThemeContext = createContext('light')  // default value
```

**2. Provide it** (wrap the components that need access)
```jsx
function App() {
  const [theme, setTheme] = useState('dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout />  {/* everything inside can access ThemeContext */}
    </ThemeContext.Provider>
  )
}
```

**3. Consume it** (anywhere inside the Provider)
```jsx
function NavItem() {
  const { theme } = useContext(ThemeContext)
  return <div style={{ color: theme === 'dark' ? 'white' : 'black' }}>...</div>
}
```

## What to put in the Provider's value

The value can be anything — a string, a number, an object, a function. Typically it's an object with state and setters:

```jsx
<ThemeContext.Provider value={{ theme, setTheme }}>
<UserContext.Provider value={{ user, login, logout }}>
<CartContext.Provider value={{ state, dispatch }}>
```

## When Context re-renders

Every component that calls `useContext(SomeContext)` re-renders when the Provider's `value` changes. If you put a new object literal in `value` on every render, everything re-renders constantly.

```jsx
// ❌ New object every render — causes unnecessary re-renders
<Context.Provider value={{ theme, setTheme }}>

// ✅ Memoize if performance matters
const contextValue = useMemo(() => ({ theme, setTheme }), [theme])
<Context.Provider value={contextValue}>
```

For most apps this doesn't matter. Optimize when you measure a problem.

## When NOT to use Context

Context is not a state management system. It's a dependency injection system for state that already exists elsewhere. Don't reach for it by default:

| Use Context for | Don't use Context for |
|-----------------|----------------------|
| Theme (dark/light) | Server data that should be cached |
| Current user / auth | Frequently updated state (causes many re-renders) |
| Locale / language | State that only a few components share |
| Feature flags | Complex state with many actions |

For complex global state, use Context + useReducer (challenge 25) or Zustand (challenge 26).

## Common mistakes

- Forgetting to wrap with the Provider — `useContext` returns the default value (passed to `createContext`) which is often `null`, causing a crash
- Putting too much in one context — split into multiple focused contexts (UserContext, ThemeContext, CartContext)
- Using context as a replacement for lifting state up — for sibling communication, lifting state is still simpler
