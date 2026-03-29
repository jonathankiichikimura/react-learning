# Components — Building UI from Functions

A React component is just a JavaScript function that returns JSX. That simple idea is the foundation of everything in React. Once you understand how components work, compose, and relate to each other, the rest of React makes sense.

---

## 1. What is a Component?

A component is a **reusable, self-contained piece of UI**. It is a plain JavaScript function that:

1. Has a name starting with a capital letter
2. Returns JSX (or `null`)
3. Can be used as a custom HTML-like tag anywhere else in your app

```jsx
function Greeting() {
  return <h1>Hello, React!</h1>
}

// Use it like a tag:
<Greeting />
```

When React sees `<Greeting />`, it calls your `Greeting` function, gets the JSX back, and renders it to the DOM.

Components make UIs **composable** — you build complex screens by assembling small, focused pieces, the same way you build with LEGO.

---

## 2. Your First Component

Here is a complete, minimal component:

```jsx
function UserCard() {
  return (
    <div className="card">
      <h2>Jonathan Picard</h2>
      <p>Learning React from scratch.</p>
    </div>
  )
}
```

Breaking it down:

| Part | Explanation |
|------|-------------|
| `function UserCard()` | A regular JS function. Capital letter is required. |
| `return (...)` | Parentheses let you split the JSX across multiple lines. |
| `<div className="card">` | JSX — compiles to `React.createElement('div', { className: 'card' }, ...)` |
| `<h2>Jonathan Picard</h2>` | A child element. Hardcoded for now; later you'll use props. |

To render it, include it in another component:

```jsx
function App() {
  return (
    <div>
      <UserCard />
    </div>
  )
}
```

---

## 3. Component Composition

The power of components is that you can **compose** them — build complex UIs out of simple, focused pieces.

### ASCII component tree

```
App
├── Header
│   └── Logo
├── Main
│   ├── ProfileCard
│   │   ├── Avatar
│   │   ├── DisplayName
│   │   └── Bio
│   └── StatsRow
│       ├── Stat (Repos)
│       ├── Stat (Followers)
│       └── Stat (Following)
└── Footer
```

### Code example of the same structure

```jsx
function Avatar() {
  return <img src="/avatar.jpg" alt="User avatar" style={{ borderRadius: '50%', width: '64px' }} />
}

function DisplayName() {
  return <h2>Jonathan Picard</h2>
}

function Bio() {
  return <p>Learning React one challenge at a time.</p>
}

function ProfileCard() {
  return (
    <div className="card">
      <Avatar />
      <DisplayName />
      <Bio />
    </div>
  )
}

function App() {
  return (
    <main>
      <ProfileCard />
    </main>
  )
}
```

Each component is small and single-purpose. `ProfileCard` does not care how `Avatar` works internally — it just uses it. This separation makes each piece easy to understand, change, and reuse.

---

## 4. The Component Tree

Every React app has a **root component** (usually `App`) that sits at the top. All other components are nested somewhere beneath it.

```jsx
function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header>
      <Logo />
      <Nav />
    </header>
  )
}

function Main() {
  return (
    <main>
      <UserCard />
      <UserCard />
      <UserCard />
    </main>
  )
}

function Footer() {
  return <footer>© 2025</footer>
}
```

Visualized:

```
App
├── Header
│   ├── Logo
│   └── Nav
├── Main
│   ├── UserCard
│   ├── UserCard
│   └── UserCard
└── Footer
```

When React re-renders, it walks this tree and re-renders only the components whose state or props changed. That is how React stays efficient.

---

## 5. Rules

### Rule 1 — Name must start with a capital letter

React uses the first letter to decide whether it is looking at an HTML element or a component:

```jsx
// React sees: document.createElement('greeting') — wrong, no such HTML tag
<greeting />

// React sees: call your Greeting() function — correct
<Greeting />
```

### Rule 2 — Must return JSX or null

A component must always return something. Returning `null` is valid and renders nothing:

```jsx
function ConditionalBanner({ show }) {
  if (!show) return null
  return <div className="banner">Important message!</div>
}
```

### Rule 3 — No side effects directly in the render body

Do not call `fetch`, modify the DOM, or set timers directly inside the component function body. These belong inside event handlers or the `useEffect` hook (covered later).

```jsx
// WRONG — side effect directly in render
function BadComponent() {
  fetch('/api/data')  // runs on EVERY render — very bad
  return <p>Hello</p>
}

// RIGHT — side effect in useEffect (covered in a later challenge)
function GoodComponent() {
  useEffect(() => {
    fetch('/api/data').then(...)
  }, [])
  return <p>Hello</p>
}
```

---

## 6. One File vs. Multiple Files

### When to keep everything in one file

- Quick experiments or challenge exercises
- Small sub-components used only by one parent
- Helper components that are tightly coupled to one feature

```jsx
// ProfileCard.jsx — all related pieces in one file
function Avatar() { ... }
function DisplayName() { ... }
function Bio() { ... }

export default function ProfileCard() {
  return (
    <div className="card">
      <Avatar />
      <DisplayName />
      <Bio />
    </div>
  )
}
```

### When to split into separate files

- Components used in more than one place across the app
- Components that are complex enough to deserve their own focus
- When the file is getting long and hard to navigate

```
src/
  components/
    Avatar.jsx       ← exported, used anywhere
    Button.jsx       ← exported, used anywhere
  pages/
    ProfilePage.jsx  ← imports Avatar and Button
```

A good rule of thumb: **start in one file, extract when it gets crowded.**

---

## 7. Common Mistakes

### Mistake 1 — Lowercase component name

```jsx
// WRONG — React treats this as an unknown HTML tag
function userCard() {
  return <div>...</div>
}
<usercard />

// RIGHT
function UserCard() {
  return <div>...</div>
}
<UserCard />
```

### Mistake 2 — Defining a component inside another component

```jsx
// WRONG — React recreates InnerComponent on every render of Outer
// This destroys and remounts its DOM and state every time
function Outer() {
  function InnerComponent() {   // defined inside — bad
    return <p>Inner</p>
  }
  return <InnerComponent />
}

// RIGHT — define at module scope
function InnerComponent() {
  return <p>Inner</p>
}

function Outer() {
  return <InnerComponent />
}
```

### Mistake 3 — Calling the component as a function

```jsx
// WRONG — calling it as a function bypasses React's rendering system
function App() {
  return UserCard()  // no hooks tracking, no reconciliation
}

// RIGHT — use JSX syntax
function App() {
  return <UserCard />
}
```

### Mistake 4 — Returning multiple root elements

```jsx
// WRONG — components must have one root
function Stats() {
  return (
    <p>Repos: 42</p>
    <p>Stars: 108</p>
  )
}

// RIGHT — use a Fragment
function Stats() {
  return (
    <>
      <p>Repos: 42</p>
      <p>Stars: 108</p>
    </>
  )
}
```

### Mistake 5 — Forgetting to export

```jsx
// The component exists but nothing can import it
function Button() {
  return <button>Click</button>
}

// RIGHT — add the export
export default function Button() {
  return <button>Click</button>
}

// OR add export after definition
function Button() {
  return <button>Click</button>
}
export default Button
```
