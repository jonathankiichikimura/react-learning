# 20 — Basic Routing

## What is client-side routing?

Traditional websites reload the entire page when you navigate. **Single Page Applications (SPAs)** like React apps only load HTML once — they swap out the content in JavaScript when the URL changes, without a full reload.

React Router intercepts URL changes, matches them against your route definitions, and renders the appropriate component.

## The key components

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
```

| Component | Role |
|-----------|------|
| `BrowserRouter` | Reads the real browser URL. Wrap your whole app in this once. |
| `MemoryRouter` | Same behavior but without a real URL. Used in these challenges. |
| `Routes` | Container that picks the first matching `Route`. |
| `Route` | Maps a path to a component. |
| `Link` | Renders an `<a>` tag that navigates without a full reload. |

## Basic setup

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/"      element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
```

## Link vs `<a href>`

Always use `<Link>` for internal navigation. A regular `<a href>` causes a full page reload, which destroys all React state.

```jsx
// ❌ Full page reload — resets all React state
<a href="/about">About</a>

// ✅ Client-side navigation — state is preserved
<Link to="/about">About</Link>
```

## MemoryRouter in these challenges

The challenge app is already a React app running in the browser. You can't have two `BrowserRouter`s on the same page. The routing challenges use `MemoryRouter` instead — it behaves identically to `BrowserRouter` but stores the history in memory instead of the browser's URL bar. Your code transfers directly to `BrowserRouter` in a real app.

## Nesting routes and layout routes

A common pattern is a "layout route" — a parent route that renders shared UI (nav bar, sidebar) and an `<Outlet />` where child routes render:

```jsx
function Layout() {
  return (
    <div>
      <Nav />
      <main>
        <Outlet />  {/* child route renders here */}
      </main>
    </div>
  )
}

<Routes>
  <Route element={<Layout />}>
    <Route path="/"      element={<Home />} />
    <Route path="/about" element={<About />} />
  </Route>
</Routes>
```

## 404 handling

Add a catch-all route at the bottom:

```jsx
<Route path="*" element={<NotFound />} />
```

## Common mistakes

- Using `<a href>` instead of `<Link>` — triggers a full reload
- Putting `<Routes>` outside of a `<Router>` — React Router throws an error
- Forgetting that each challenge wraps its own `<MemoryRouter>` — that's why routing works in the preview
