# 16 — Custom Hooks

## What is a custom hook?

A custom hook is a **JavaScript function whose name starts with `use`** that calls other hooks inside it. That's it — no special API, no registration, nothing magical.

```jsx
function useTodos() {
  const [todos, setTodos] = useState([])

  function addTodo(text) {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }])
  }

  return { todos, addTodo }
}
```

You use it exactly like a built-in hook:

```jsx
function TodoApp() {
  const { todos, addTodo } = useTodos()
  // ...
}
```

## Why custom hooks?

**1. Extract complexity out of components**

Components should be about UI. When they're full of `useReducer`, `useEffect`, and business logic, they become hard to read. Custom hooks let you move that logic out:

```jsx
// ❌ Component doing too much
function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch('/api/user').then(...)
  }, [])
  // ...100 more lines
}

// ✅ Separation of concerns
function UserProfile() {
  const { user, loading, error } = useUser()
  if (loading) return <Spinner />
  return <ProfileCard user={user} />
}
```

**2. Reuse logic across components**

If two components need the same behavior, extract it into a custom hook:

```jsx
// useWindowSize can be used by any component
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}
```

## The rules of hooks

Custom hooks enforce the same rules as built-in hooks:

1. **Only call hooks at the top level** — not inside `if`, loops, or nested functions
2. **Only call hooks from React functions** — components or other custom hooks

```jsx
// ❌ Conditional hook call
function useData(shouldFetch) {
  if (shouldFetch) {
    useState(null)  // breaks the rules
  }
}

// ✅ Conditional logic inside the hook
function useData(shouldFetch) {
  const [data, setData] = useState(null)
  useEffect(() => {
    if (!shouldFetch) return
    fetch('/api/data').then(...)
  }, [shouldFetch])
  return data
}
```

## Naming conventions

- Always start with `use` — this is how React (and its linter) identifies hooks
- Name it after what it does: `useTodos`, `useWindowSize`, `useLocalStorage`, `useAuth`, `useForm`

## What to return

Return whatever the component needs — usually an object with data and handlers:

```jsx
return {
  todos,           // state
  addTodo,         // action
  removeTodo,      // action
  isLoading,       // derived state
}
```

## Common mistakes

- Naming the function without `use` — you lose the rules enforcement and linter warnings
- Returning too much — only return what components actually need
- Making custom hooks that are too specific — they should be reusable across at least two components
