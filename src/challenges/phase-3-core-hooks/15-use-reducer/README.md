# 15 — useReducer

## When useState isn't enough

`useState` works great for simple, independent values. It starts to strain when:

- Multiple state values change together
- The next state depends on the previous state in complex ways
- You have many related `setState` calls spread across the component
- You want to describe *what happened* rather than *what the state should be*

```jsx
// Multiple setState calls that should be atomic
function handleDelete(id) {
  setItems(items.filter(i => i.id !== id))
  setSelectedId(null)
  setDeleteCount(n => n + 1)
  // What if one of these has a bug? State is now partially updated.
}
```

`useReducer` groups all state transitions into one place and makes them testable.

## The pattern

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

- `state` — the current state object
- `dispatch(action)` — sends an action to the reducer
- `reducer(state, action)` — pure function that returns the next state
- `initialState` — the starting state

## Writing a reducer

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, done: false }]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        )
      }
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      }
    default:
      return state  // always return state for unknown actions
  }
}
```

**The reducer must be a pure function:**
- Never mutate `state` directly — always return a new object
- No side effects (no fetch calls, no `console.log` in production, no random values)
- Same inputs → always the same output

## Dispatching actions

```jsx
// An action is just a plain object with a `type` and optional `payload`
dispatch({ type: 'ADD_TODO', payload: 'Buy milk' })
dispatch({ type: 'TOGGLE_TODO', payload: 42 })
dispatch({ type: 'REMOVE_TODO', payload: 42 })
```

`type` describes *what happened*. `payload` carries the data needed to make the change.

## useReducer vs useState

| | useState | useReducer |
|---|---------|-----------|
| Complexity | Simple values | Complex / related state |
| Transitions | Spread across handlers | Centralized in reducer |
| Testing | Test the component | Test the reducer function in isolation |
| Debugging | Hard to trace | Action types make a clear history |

## Connection to Redux

`useReducer` is the same pattern as Redux, minus the store and middleware. If you understand `useReducer`, you understand the core of Redux.

## Common mistakes

- Mutating `state` inside the reducer instead of returning new objects
- Forgetting the `default` case in the switch — causes state to become `undefined`
- Putting side effects inside the reducer — reducers must be pure
