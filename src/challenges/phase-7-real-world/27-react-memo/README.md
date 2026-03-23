# 27 — React.memo

## Why React re-renders

React re-renders a component when:
1. Its own state changes
2. Its parent re-renders (by default, every child re-renders when the parent does)
3. Its context value changes

The second point is what this challenge addresses. When a parent re-renders, it re-renders all its children — even children whose props didn't change.

```jsx
function Parent() {
  const [name, setName] = useState('')  // unrelated to Child

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <Child count={0} />  {/* re-renders on every keystroke, even though count didn't change */}
    </>
  )
}
```

## React.memo

Wrapping a component in `memo` tells React: "only re-render this component if its props actually changed":

```jsx
const Child = memo(function Child({ count }) {
  return <p>Count: {count}</p>
})

// or wrapping an existing component:
export default memo(Child)
```

Now `Child` only re-renders when `count` changes. Typing in the name input no longer causes `Child` to re-render.

## How memo compares props

`memo` uses **shallow equality** to compare props. For primitives (strings, numbers, booleans), this is straightforward:

```jsx
// Previous render: count = 5
// Current render:  count = 5
// Same value → component skips re-render ✅
```

For objects and arrays, shallow equality compares **references**, not contents:

```jsx
// Previous render: user = { name: 'Alice' }  (reference A)
// Current render:  user = { name: 'Alice' }  (reference B — new object!)
// Different references → component re-renders, even though content is the same ❌
```

This is why functions defined inside a component break `memo` — they're new objects on every render. Use `useCallback` (challenge 19) to stabilize function references.

## Detecting re-renders

During development, use a `useRef` counter inside the component to visualize re-renders:

```jsx
const Child = memo(function Child({ count }) {
  const renders = useRef(0)
  renders.current += 1
  console.log(`Child rendered ${renders.current} times`)
  return <p>Count: {count} | Renders: {renders.current}</p>
})
```

React DevTools also has a "Highlight updates when components render" option.

## When memo actually helps

`memo` is worth using when:
- The component renders frequently due to parent re-renders
- The component's render is expensive (complex calculations, large JSX tree)
- You can verify the performance improvement in DevTools

`memo` is NOT worth using when:
- The component renders rarely anyway
- The component's render is cheap
- The props change on almost every render (memo never skips, adds overhead)

## memo vs useMemo vs useCallback

| | What it memoizes |
|--|-----------------|
| `memo` | An entire component — skips re-render |
| `useMemo` | A computed value inside a component |
| `useCallback` | A function reference inside a component |

They're complementary. A common combo: `memo` on a child component, `useCallback` on the function props you pass into it.

## Common mistakes

- Wrapping every component in `memo` by default — adds complexity without benefit
- Passing object/array/function props to a memo'd component without stabilizing them — memo never skips
- Using `memo` instead of fixing the root cause — if a component re-renders too often, consider restructuring the state
