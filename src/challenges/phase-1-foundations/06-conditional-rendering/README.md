# 06 — Conditional Rendering

## The core idea

React components are just JavaScript functions, so you can use any JavaScript logic to decide what to render. There are three main patterns.

## Pattern 1: Ternary (if/else)

Use when you want to show one thing OR another:

```jsx
{isLoggedIn ? <Dashboard /> : <Login />}
```

This is the most versatile pattern. It works for both returning full components and small inline differences:

```jsx
// Swap between two components
return isLoggedIn ? <Dashboard /> : <Login />

// Swap between two pieces of text
<p>{isLoading ? 'Loading...' : `${count} results`}</p>

// Swap between two styles
<div style={{ color: isError ? 'red' : 'green' }}>
```

## Pattern 2: `&&` (show or nothing)

Use when you only want to show something if a condition is true, and show nothing otherwise:

```jsx
{isAdmin && <AdminPanel />}
{error && <p className="error">{error}</p>}
{items.length > 0 && <ItemList items={items} />}
```

**Warning:** Be careful with falsy numbers. `{0 && <Component />}` renders `0` in the DOM, not nothing. Guard against it:

```jsx
// ❌ Renders "0" if count is 0
{count && <Badge count={count} />}

// ✅ Safe
{count > 0 && <Badge count={count} />}
```

## Pattern 3: `if` before the return

For more complex conditions, use regular `if` statements before the JSX:

```jsx
function StatusMessage({ status }) {
  if (status === 'loading') return <Spinner />
  if (status === 'error')   return <ErrorPage />
  return <Content />
}
```

This is called an "early return." It keeps complex logic out of the JSX itself.

## Returning `null`

A component that returns `null` renders nothing — no DOM node, no space:

```jsx
function Notification({ message }) {
  if (!message) return null
  return <div className="notification">{message}</div>
}
```

## Comparing the patterns

| Pattern | Use when |
|---------|---------|
| Ternary `? :` | Two different things to show |
| `&&` | Show something or nothing |
| `if` early return | Multiple conditions, complex logic |
| Return `null` | Component should render nothing |

## Common mistakes

- Using `&&` with a number that could be `0` — renders the number literally
- Nesting ternaries more than one level deep — quickly becomes unreadable, use `if` early returns instead
- Forgetting that JSX can't contain `if` statements *inside* the markup (only expressions) — move the logic above the `return` instead
