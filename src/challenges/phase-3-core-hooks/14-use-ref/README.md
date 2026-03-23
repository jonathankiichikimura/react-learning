# 14 — useRef

## What is useRef?

`useRef` gives you a **mutable box** — an object with a `.current` property that you can read and write freely. Unlike state, changing a ref does **not** cause a re-render.

```jsx
const myRef = useRef(initialValue)
// myRef.current === initialValue

myRef.current = 'new value'  // no re-render
```

## Two distinct use cases

### 1. Accessing DOM elements

The most common use: attach a ref to a DOM element to programmatically focus it, measure it, or interact with it in ways React doesn't expose as props.

```jsx
const inputRef = useRef(null)

return (
  <>
    <input ref={inputRef} />
    <button onClick={() => inputRef.current.focus()}>
      Focus the input
    </button>
  </>
)
```

When React mounts the element, it sets `inputRef.current` to the DOM node. When it unmounts, it sets it back to `null`.

Common DOM operations via ref:
```jsx
inputRef.current.focus()         // focus
inputRef.current.blur()          // unfocus
inputRef.current.scrollIntoView() // scroll to it
inputRef.current.getBoundingClientRect() // measure it
```

### 2. Persisting values without re-rendering

Refs can store any mutable value that should survive re-renders but shouldn't *trigger* re-renders:

```jsx
const renderCount = useRef(0)

// In the component body:
renderCount.current += 1
// This increments on every render but never causes an extra render

// Read it on demand:
<button onClick={() => alert(`Rendered ${renderCount.current} times`)}>
  Check
</button>
```

Other uses:
```jsx
// Store the previous value of a prop
const prevCount = useRef(count)
useEffect(() => { prevCount.current = count })

// Store a timeout ID
const timeoutRef = useRef(null)
timeoutRef.current = setTimeout(fn, 1000)
// clear it: clearTimeout(timeoutRef.current)
```

## Ref vs state — when to use which

| | `useState` | `useRef` |
|---|-----------|---------|
| Triggers re-render | ✅ Yes | ❌ No |
| Visible in the UI | ✅ Yes | Only if you read it in an event |
| Persists across renders | ✅ Yes | ✅ Yes |
| Use for | UI data | DOM access, timers, counters |

**The test:** Does the UI need to update when this value changes? If yes, use state. If no, use a ref.

## Common mistakes

- Reading `ref.current` directly in JSX — since refs don't trigger re-renders, the display won't update when the ref changes
- Trying to set a ref with a handler like `setRef` — just assign directly: `myRef.current = newValue`
- Forgetting that `ref.current` is `null` until the component mounts — always check `if (myRef.current)` before calling methods on it
