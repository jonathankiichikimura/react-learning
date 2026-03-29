# 06 — Conditional Rendering

React components are just JavaScript functions. Because of that, you can use any JavaScript logic — `if`, `&&`, ternaries, variables — to decide what gets rendered. There is no special React templating syntax for conditionals: it is all plain JavaScript.

---

## 1. Why Conditional Rendering?

Most real UIs are not static. The same component might look completely different based on:

- Whether the user is logged in or not
- Whether data is still loading
- Whether an error occurred
- Whether a feature flag is enabled
- Whether a list is empty

Conditional rendering is the mechanism for all of this. You write logic that returns different JSX depending on state or props.

---

## 2. Three Patterns — Overview

| Pattern | Best for |
|---|---|
| Ternary `? :` | Two distinct options — show A or show B |
| `&&` operator | Show something or show nothing |
| Early return (`if` before `return`) | Multiple branches, complex logic, keeping JSX clean |

All three are valid React. The choice is mostly about readability for the specific situation.

---

## 3. The Ternary Operator

The ternary is JavaScript's inline `if/else`. It evaluates a condition and picks one of two expressions.

**Basic form:**

```jsx
{condition ? <WhenTrue /> : <WhenFalse />}
```

**Inline text swap:**

```jsx
<p>Status: {isOnline ? 'Online' : 'Offline'}</p>
```

**Full component swap:**

```jsx
function App() {
  return isLoggedIn ? <Dashboard /> : <Login />
}
```

**Multi-line JSX in a ternary** — use parentheses to keep it readable:

```jsx
function UserProfile({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <div className="card">
          <h2>Welcome back, {user.name}</h2>
          <p>Last seen: {user.lastLogin}</p>
          <button>Log out</button>
        </div>
      ) : (
        <div className="card">
          <h2>Please log in</h2>
          <p>You need an account to continue.</p>
          <button>Log in</button>
        </div>
      )}
    </div>
  )
}
```

**Ternary for dynamic values** — not just swapping elements, but choosing values:

```jsx
<div style={{ color: hasError ? '#f87171' : '#4ade80' }}>
  {hasError ? 'Something went wrong' : 'All good!'}
</div>
```

**Avoid nested ternaries.** Once you need `?:` inside another `?:`, switch to early returns instead:

```jsx
// Hard to read — avoid this
{isLoading ? <Spinner /> : isError ? <ErrorMessage /> : <Content />}

// Much better — use early returns (see section 5)
```

---

## 4. The && Operator

`&&` is JavaScript's logical AND. It short-circuits: if the left side is falsy, it returns the left side and skips the right side entirely.

```jsx
{condition && <Component />}
```

When `condition` is truthy, `<Component />` renders. When `condition` is falsy, nothing renders (React ignores `false`, `null`, and `undefined`).

**Common uses:**

```jsx
{isAdmin && <AdminPanel />}
{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
{items.length > 0 && <p>Showing {items.length} results</p>}
{user.isPremium && <PremiumBadge />}
```

### The 0 Gotcha

This is a notorious React pitfall. When your condition is a number that could be `0`, using it directly with `&&` renders the literal `0` on the page:

```jsx
// BROKEN — renders "0" when count is 0
{count && <Badge count={count} />}
```

Why? When `count` is `0`, `&&` returns `0` (the falsy left side). React renders `0` because it is a valid number — unlike `false`, `null`, or `undefined`, which React renders as nothing.

**The fix: always use a boolean expression on the left side of `&&`:**

```jsx
// Safe — count > 0 evaluates to false (not 0) when count is 0
{count > 0 && <Badge count={count} />}

// Also safe — Boolean() converts to true/false
{Boolean(count) && <Badge count={count} />}

// Also safe — double negation converts to boolean
{!!count && <Badge count={count} />}
```

The same issue applies to any number or string that could be falsy (`0`, `""`, `NaN`). When in doubt, use `> 0` or `Boolean()`.

---

## 5. Early Returns

For multi-branch logic, put your `if` statements *before* the main `return` statement. This is called an early return pattern.

**Basic early returns:**

```jsx
function StatusMessage({ status }) {
  if (status === 'loading') return <p>Loading...</p>
  if (status === 'error') return <p>Something went wrong.</p>
  return <p>Everything is fine!</p>
}
```

**Loading/error/data pattern** — the most common real-world use:

```jsx
function WeatherCard({ loading, error, data }) {
  if (loading) {
    return (
      <div className="card">
        <p>Fetching weather data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card" style={{ borderColor: 'red' }}>
        <p>Failed to load: {error.message}</p>
      </div>
    )
  }

  // Happy path — only reached when not loading and no error
  return (
    <div className="card">
      <h2>{data.city}</h2>
      <p>{data.temp}°F — {data.condition}</p>
    </div>
  )
}
```

**Why early returns over nested ternaries:**

```jsx
// Ternary version — hard to read with 3+ branches
return isLoading
  ? <Spinner />
  : isError
    ? <ErrorPage />
    : isEmpty
      ? <EmptyState />
      : <Content />

// Early return version — each branch is clear and separate
if (isLoading) return <Spinner />
if (isError) return <ErrorPage />
if (isEmpty) return <EmptyState />
return <Content />
```

**Order matters.** React hits the first matching `if` and returns immediately. Check the most restrictive conditions first.

---

## 6. Returning null

A component can return `null` to render nothing at all — no DOM node, no whitespace, no placeholder.

```jsx
function Notification({ message }) {
  if (!message) return null
  return (
    <div className="notification">
      {message}
    </div>
  )
}
```

`null` is different from an empty fragment `<></>`. Both render nothing visually, but `null` is semantically clearer when the intent is "this component has nothing to show."

**Use cases for returning null:**

- A component that only shows conditionally (tooltip, modal, banner)
- A debug component that is disabled in production
- A component waiting for required data before it can render

---

## 7. Storing JSX in Variables

You can store JSX in a regular JavaScript variable and use it in your return statement. This is useful for computing complex JSX once and reusing it, or for avoiding repetition.

```jsx
function App({ isLoggedIn }) {
  const content = isLoggedIn ? <Dashboard /> : <Login />

  return (
    <div>
      <Header />
      {content}
      <Footer />
    </div>
  )
}
```

**More complex example — computing JSX based on multiple conditions:**

```jsx
function Alert({ type, message }) {
  let icon
  let color

  if (type === 'success') {
    icon = '✓'
    color = '#4ade80'
  } else if (type === 'warning') {
    icon = '⚠'
    color = '#facc15'
  } else {
    icon = '✕'
    color = '#f87171'
  }

  return (
    <div style={{ color, border: `1px solid ${color}`, padding: '0.5rem' }}>
      {icon} {message}
    </div>
  )
}
```

Storing JSX in variables works because JSX is just JavaScript — it evaluates to a value that can be stored, passed around, and returned.

---

## 8. Common Mistakes

**Mistake 1: Using `&&` with a number (the 0 bug)**

```jsx
// Renders literal "0" when count is 0
{count && <Badge />}

// Fix: use a boolean expression
{count > 0 && <Badge />}
```

**Mistake 2: Nesting ternaries more than one level**

```jsx
// Unreadable — do not do this
{a ? <A /> : b ? <B /> : c ? <C /> : <D />}

// Use early returns instead
if (a) return <A />
if (b) return <B />
if (c) return <C />
return <D />
```

**Mistake 3: Trying to put `if` inside JSX markup**

```jsx
// Syntax error — if is a statement, not an expression
return (
  <div>
    {if (isLoggedIn) { <Dashboard /> }}  // INVALID
  </div>
)

// Fix: move the if above the return, or use ternary / &&
```

JSX accepts *expressions*, not *statements*. `if` is a statement. Use ternary (`? :`), `&&`, or early returns instead.

**Mistake 4: Forgetting parentheses on multi-line JSX in a ternary**

```jsx
// Wrong — JSX after a line break without parens causes a parse error
{isLoggedIn ?
  <div>
    <h1>Welcome</h1>
  </div>
: <Login />}

// Right — wrap multi-line JSX in parentheses
{isLoggedIn ? (
  <div>
    <h1>Welcome</h1>
  </div>
) : (
  <Login />
)}
```

**Mistake 5: Checking `undefined` instead of a meaningful condition**

```jsx
// Fragile — what if user is {} (empty object)?
{user && <Profile user={user} />}

// Better — check for what you actually need
{user?.name && <Profile user={user} />}
{user !== null && user !== undefined && <Profile user={user} />}
```
