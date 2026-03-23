# 02 — Your First Component

## What is a component?

A component is a **reusable, self-contained piece of UI**. Think of them like LEGO bricks — you build complex interfaces by composing small, focused pieces.

```jsx
function Avatar() {
  return <img src="profile.jpg" alt="avatar" />
}

function UserCard() {
  return (
    <div>
      <Avatar />       {/* ← use it like a custom HTML tag */}
      <p>Alice Chen</p>
    </div>
  )
}
```

## Why components?

- **Reusability** — define once, use anywhere. Render the same `Button` 20 times.
- **Isolation** — each component manages its own logic and markup.
- **Readability** — `<UserCard />` is more meaningful than 30 nested divs.
- **Testability** — a component is just a function; you can test it in isolation.

## The component tree

Every React app is a tree of components. There's always one root (`App`), and everything else is nested beneath it:

```
App
├── Header
│   └── Nav
├── Main
│   ├── UserCard
│   ├── UserCard
│   └── UserCard
└── Footer
```

## Rules for components

**1. Name must start with a capital letter**

React uses this to distinguish components from HTML tags:

```jsx
<userCard />   // React thinks this is an HTML tag named "usercard" — wrong
<UserCard />   // React knows this is your component — correct
```

**2. Must return JSX (or `null`)**

Returning `null` renders nothing — useful for conditional rendering.

**3. Functions, not classes**

Modern React uses function components exclusively. You may encounter class components in older codebases, but you won't write them.

## Where to define components

Components can live in the same file or be imported from another file. The convention is one component per file for anything you'll reuse across the app:

```jsx
// UserCard.jsx
export default function UserCard() {
  return <div className="card">...</div>
}

// App.jsx
import UserCard from './UserCard'
```

For this challenge, defining everything in one file is fine.

## Common mistakes

- Starting a component name with lowercase → treated as an HTML tag, not a component
- Defining a component *inside* another component's render — this works but is a performance anti-pattern (React recreates it on every render). Define them at module scope.
