# 17 — Fetching Data

## The data fetching lifecycle

Every data fetch in a React component follows the same pattern: start loading, get data (or an error), stop loading. You always need all three states.

```jsx
const [data, setData] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
```

Skipping any of these leads to a bad user experience — a blank screen instead of a spinner, a frozen UI instead of an error message.

## Where to fetch: inside useEffect

Fetch inside `useEffect`, not directly in the render function. Rendering must be pure (no side effects). An empty `[]` dependency array means "fetch once on mount":

```jsx
useEffect(() => {
  fetch('https://api.example.com/users')
    .then(res => res.json())
    .then(data => {
      setData(data)
      setLoading(false)
    })
    .catch(err => {
      setError(err.message)
      setLoading(false)
    })
}, [])
```

## Using async/await

The effect callback itself can't be async (React doesn't use its return value for anything except cleanup). Instead, define an inner async function:

```jsx
useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)  // runs whether fetch succeeded or failed
    }
  }

  fetchData()
}, [])
```

The `finally` block ensures `loading` is always set to `false`, even if an error is thrown.

## Always check `res.ok`

`fetch` only rejects on network failures (no internet, DNS error). A 404 or 500 response still resolves successfully — you have to check `res.ok` manually:

```jsx
const res = await fetch(url)
if (!res.ok) throw new Error(`Server error: ${res.status}`)
```

## Conditional rendering with the three states

```jsx
if (loading) return <p>Loading...</p>
if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>
return <UserList users={data} />
```

## The fetch in production

In real apps, you'll rarely write raw `fetch` + `useEffect`. The standard tool is **TanStack Query** (formerly React Query), which handles caching, background refetching, loading states, and error handling for you. Understanding the manual pattern first makes TanStack Query trivial to pick up.

## Common mistakes

- Not handling errors → a failed fetch leaves the component in a perpetual loading state
- Not checking `res.ok` → a 404 silently returns `null` or broken data
- Making the `useEffect` callback itself `async` → React warns and the cleanup return value is lost
- Not setting `loading = false` in the error path → the spinner never stops
