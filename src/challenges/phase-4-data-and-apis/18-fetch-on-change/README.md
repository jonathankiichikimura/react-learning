# 18 — Fetch on Dependency Change

## The pattern

When you want to re-fetch data every time a variable changes, put that variable in the `useEffect` dependency array. The effect re-runs automatically on every change:

```jsx
const [userId, setUserId] = useState(1)
const [posts, setPosts] = useState([])

useEffect(() => {
  fetch(`/api/users/${userId}/posts`)
    .then(res => res.json())
    .then(data => setPosts(data))
}, [userId])  // re-runs whenever userId changes
```

## Reset state before each fetch

When the dependency changes and a new fetch starts, reset the previous data and loading state so you don't flash stale data from the previous selection:

```jsx
useEffect(() => {
  setPosts([])       // clear old data immediately
  setLoading(true)   // show loading indicator

  fetch(`/api/users/${userId}/posts`)
    .then(...)
}, [userId])
```

## The race condition problem

There's a subtle bug in naive re-fetching code. If the user selects user 1, then quickly selects user 2, two fetches are in flight simultaneously. If user 1's response arrives *after* user 2's, you'll display user 1's posts for user 2's selection:

```
Select user 2 → fetch starts
Select user 1 → fetch starts
User 1 response arrives → setPosts(user1posts)  ← wrong! we selected user 2
User 2 response arrives → setPosts(user2posts)  ← correct, but may never arrive
```

## Fixing it with a cancelled flag

The simplest solution is a local `cancelled` boolean in the cleanup function:

```jsx
useEffect(() => {
  let cancelled = false

  async function load() {
    setLoading(true)
    const data = await fetch(url).then(r => r.json())
    if (!cancelled) setPosts(data)  // only update if still relevant
  }

  load()

  return () => { cancelled = true }  // cleanup: ignore any pending response
}, [userId])
```

When the dependency changes, the cleanup function runs first, setting `cancelled = true`. The previous fetch may still complete, but it won't update state.

The more robust solution is `AbortController`, shown in challenge 17's solution.

## This pattern appears everywhere

Any time a fetch result depends on user input — search queries, selected filters, pagination, dropdown selections — you use this pattern. It's one of the most common things you'll write in React.

## Common mistakes

- Not resetting loading/data at the start of a new fetch — shows stale data from the previous request
- Not handling the race condition — subtle bug that only appears on fast interactions or slow networks
- Including a function defined inside the component in the deps array without `useCallback` — causes infinite refetching (covered in challenge 19)
