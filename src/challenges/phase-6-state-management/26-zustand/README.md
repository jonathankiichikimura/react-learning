# 26 — Zustand

## Why third-party state management?

The Context + useReducer pattern works, but it has friction:
- You have to create a context, a provider, a reducer, a custom hook
- Every context consumer re-renders when any part of the state changes
- You have to wrap your app in Providers

Zustand eliminates all of this. It's a tiny library (~1kb) that stores state *outside* the React component tree.

## Creating a store

```jsx
import { create } from 'zustand'

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
  reset:     () => set({ count: 0 }),
}))
```

`create` takes a function that receives `set` and returns an object defining your state and actions. Calling `set()` merges the returned object into the current state and triggers re-renders in subscribed components.

## Using the store

```jsx
function Counter() {
  const count = useCounterStore(state => state.count)
  const increment = useCounterStore(state => state.increment)

  return <button onClick={increment}>{count}</button>
}
```

No Provider. No context. Any component can call `useCounterStore` and get direct access to the store.

## The selector pattern

The function you pass to `useCounterStore` is a **selector**. It picks which part of the store the component cares about. The component only re-renders when that specific piece changes:

```jsx
// Only re-renders when count changes
const count = useCartStore(state => state.count)

// Only re-renders when items changes
const items = useCartStore(state => state.items)

// Only re-renders when either changes
const { count, items } = useCartStore(state => ({
  count: state.count,
  items: state.items,
}))
```

This granular subscription is a performance advantage over Context, which re-renders all consumers when any part of the value changes.

## Updating arrays and objects

```jsx
const useCartStore = create((set) => ({
  items: [],

  addItem: (product) => set(state => {
    const existing = state.items.find(i => i.id === product.id)
    if (existing) {
      return {
        items: state.items.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
    }
    return { items: [...state.items, { ...product, qty: 1 }] }
  }),

  clearCart: () => set({ items: [] }),
}))
```

Note: `set` does a **shallow merge**, not a deep merge. `set({ items: [] })` only touches `items` — other state fields are preserved.

## Zustand vs Context + useReducer

| | Context + useReducer | Zustand |
|--|---------------------|---------|
| Setup | Context, Provider, Reducer, custom hook | Just `create()` |
| Provider | Required | None |
| Re-renders | All context consumers | Only subscribed selectors |
| File size | 0kb (built-in) | ~1kb |
| DevTools | Limited | Zustand DevTools available |
| Async actions | Complex | Simple (call set from async function) |

## When to use each

- **Local state:** `useState` or `useReducer`
- **Shared between a few siblings:** Lift state up
- **Wide sharing, simple data:** Context (theme, user, locale)
- **Complex global state:** Zustand

## Common mistakes

- Mutating state directly inside a `set` callback instead of returning new objects
- Calling `set` with the entire store instead of just what changed — though `set` does merge, be intentional
- Creating multiple stores for data that should be together — one store per domain is usually right
