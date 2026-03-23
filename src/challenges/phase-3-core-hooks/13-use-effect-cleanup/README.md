# 13 — useEffect Cleanup

## Why cleanup matters

Some effects "subscribe" to something — they start a timer, open a WebSocket, or register an event listener. If you don't clean these up when the component unmounts (or before the effect re-runs), they keep running in the background forever. This is called a **memory leak**.

## The cleanup function

Return a function from your effect. React calls it:
1. Before the component unmounts
2. Before the effect runs again (when dependencies change)

```jsx
useEffect(() => {
  // Set something up
  const id = setInterval(() => {
    setSeconds(s => s + 1)
  }, 1000)

  // Clean it up
  return () => clearInterval(id)
}, [isRunning])
```

## The lifecycle with cleanup

```
1. Component mounts
2. Effect runs → setInterval starts (interval ID = 42)

3. isRunning changes
4. Cleanup runs → clearInterval(42) ← the OLD interval is cleared
5. Effect runs again → new setInterval starts (interval ID = 43)

6. Component unmounts
7. Cleanup runs → clearInterval(43) ← final cleanup
```

Without step 4, changing `isRunning` would stack up a second interval on top of the first, causing double-speed counting. Each re-run of the effect without cleanup stacks another timer.

## Common patterns that require cleanup

```jsx
// setInterval
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)
}, [])

// setTimeout
useEffect(() => {
  const id = setTimeout(showNotification, 3000)
  return () => clearTimeout(id)
}, [])

// Event listener
useEffect(() => {
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

// WebSocket or subscription
useEffect(() => {
  const subscription = dataSource.subscribe(handleData)
  return () => subscription.unsubscribe()
}, [])
```

## Cancelling fetch requests

Fetch requires a slightly different approach using `AbortController`:

```jsx
useEffect(() => {
  const controller = new AbortController()

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => {
      if (err.name === 'AbortError') return  // cancelled, ignore
      setError(err.message)
    })

  return () => controller.abort()
}, [url])
```

A simpler (but less clean) approach: a `cancelled` boolean flag — see the solution for challenge 18.

## React StrictMode runs effects twice

In development, React intentionally runs effects twice (mount → cleanup → mount again) to help you catch missing cleanups. If your effect breaks when run twice, you're missing a cleanup.

## Common mistakes

- Not cleaning up `setInterval` → intervals stack up, causing the counter to accelerate
- Not removing event listeners → listeners pile up across re-renders
- Assuming cleanup only happens on unmount — it happens before every re-run too
