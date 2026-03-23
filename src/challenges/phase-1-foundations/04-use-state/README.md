# 04 — useState

## Why you can't use regular variables

This is the most important thing to understand about React state:

```jsx
function Counter() {
  let count = 0
  return <button onClick={() => count++}>{count}</button>
}
```

This doesn't work. `count` increments in memory, but **React has no idea it changed** — the screen never updates. React only re-renders a component when you explicitly tell it something changed, and the only way to do that is with a state setter.

## How useState works

```jsx
const [value, setValue] = useState(initialValue)
```

- `value` — the current value, for this render
- `setValue(newValue)` — updates value **and schedules a re-render**
- `initialValue` — used exactly once, on the first render only

The array destructuring is just a naming convention. You can call them anything:

```jsx
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [isOpen, setIsOpen] = useState(false)
```

## The re-render cycle

```
1. Component renders for the first time → count = 0
2. User clicks the button
3. setCount(1) is called
4. React schedules a re-render
5. Component function runs again from the top
6. useState(0) is called again — but React ignores the 0 and returns 1
7. JSX is re-evaluated with count = 1
8. Only the changed DOM node is updated
```

Your component function runs **from scratch** on every render. State is the memory that persists between runs.

## Immutability — never mutate state directly

```jsx
// ❌ Mutating directly — React doesn't see the change
count++
todos.push(newTodo)
user.name = 'Alice'

// ✅ Create new values
setCount(count + 1)
setTodos([...todos, newTodo])
setUser({ ...user, name: 'Alice' })
```

React compares values by reference. If you mutate an object in place, the reference doesn't change, and React thinks nothing happened.

## Functional updates

When your new state depends on the previous value, use the callback form:

```jsx
// ❌ Can be stale if React batches updates
setCount(count + 1)

// ✅ Always gets the latest value
setCount(prev => prev + 1)
```

This matters most inside `useEffect` or event handlers that close over stale values.

## Multiple state variables vs one object

```jsx
// Fine for independent values
const [name, setName] = useState('')
const [age, setAge] = useState(0)

// Better for related values that change together
const [form, setForm] = useState({ name: '', age: 0 })
// Update: setForm({ ...form, name: 'Alice' })
```

## Common mistakes

- Calling `setState` inside render (not inside an event handler or effect) → infinite loop
- Expecting state to update immediately after calling the setter — state is applied on the *next* render
- Mutating arrays/objects in state instead of creating new ones
