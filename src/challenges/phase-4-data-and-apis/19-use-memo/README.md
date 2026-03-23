# 19 — useMemo & useCallback

## Why memoization exists

Every time a component re-renders, its entire function body runs from scratch. Variables are recalculated, functions are recreated, expressions are re-evaluated. Most of the time this is fast and fine.

But two things can cause unnecessary work:

1. **Expensive computations** — filtering 10,000 items on every keystroke, even when the filter input didn't change
2. **Unstable function references** — a function defined inside a component is a *new object* on every render, which can cause child components to re-render unnecessarily

`useMemo` and `useCallback` are the tools for both problems.

## useMemo — cache a computed value

```jsx
// Without useMemo: runs on every render
const filtered = items.filter(item => item.includes(search))

// With useMemo: only runs when search or items changes
const filtered = useMemo(
  () => items.filter(item => item.includes(search)),
  [items, search]
)
```

The dependency array works identically to `useEffect` — recalculate only when these values change.

## useCallback — cache a function reference

```jsx
// Without useCallback: new function object on every render
const handleSearch = (e) => setSearch(e.target.value)

// With useCallback: same function reference unless deps change
const handleSearch = useCallback(
  (e) => setSearch(e.target.value),
  []  // setSearch is stable, so no deps needed
)
```

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. They're the same idea applied to two different types of values.

## When to actually use them

**Don't add useMemo/useCallback everywhere by default.** They have a cost:
- More code to read and maintain
- Memory to store the cached value
- Work on every render to check if deps changed

Use them when you can **measure** a real problem:

```jsx
// ✅ Good use: filter runs 10,000 comparisons
const filtered = useMemo(() =>
  bigList.filter(n => n.toString().includes(search))
, [search])

// ❌ Unnecessary: this is instant, memo adds more overhead than it saves
const name = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])
```

## Referential equality

The reason `useCallback` matters for child components:

```jsx
function Parent() {
  const handleClick = () => doSomething()  // new function every render
  return <Child onClick={handleClick} />
}

const Child = React.memo(function Child({ onClick }) {
  // Even with React.memo, Child re-renders because onClick is always a new reference
  return <button onClick={onClick}>Click</button>
})
```

`React.memo` (challenge 27) does a shallow comparison of props. If the function reference changes every render, the comparison always fails and memo is useless. `useCallback` fixes this by keeping the same reference.

## The order to reach for things

1. First: just write the code without memoization
2. If you notice a performance problem, measure it in DevTools
3. Then reach for `useMemo` or `useCallback`

## Common mistakes

- Memoizing everything preemptively — adds complexity without benefit
- Putting an object literal in the deps array — `{}` is always a new reference, causing memo to never cache. Convert it to a primitive first.
- Forgetting that `useMemo` does not prevent re-renders — it only caches the computed value. Use `React.memo` (challenge 27) to prevent component re-renders.
