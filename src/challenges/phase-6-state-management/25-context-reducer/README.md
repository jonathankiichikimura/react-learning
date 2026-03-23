# 25 — Context + useReducer

## Why combine them?

`useContext` solves the delivery problem — how to get data anywhere in the tree without prop drilling. `useReducer` solves the management problem — how to handle complex state with multiple actions in a predictable way.

Combined, they form a lightweight global state pattern that's used in many mid-size React apps:

```jsx
// useReducer manages the logic
const [state, dispatch] = useReducer(cartReducer, { items: [] })

// Context delivers it everywhere
<CartContext.Provider value={{ state, dispatch }}>
  <App />
</CartContext.Provider>
```

## The CartProvider pattern

Encapsulate the reducer and context setup in a dedicated Provider component:

```jsx
const CartContext = createContext(null)

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
```

This keeps all cart logic in one file. Components just call `useContext(CartContext)`.

## A custom hook for consumption

A nice ergonomic improvement: wrap the `useContext` call in a custom hook:

```jsx
function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}

// In components:
const { state, dispatch } = useCart()
```

The error check gives you a clear message instead of a cryptic `Cannot read properties of null`.

## How this compares to Redux

This pattern is essentially Redux without the library:

| | Context + useReducer | Redux |
|--|---------------------|----|
| Store | CartContext | Redux store |
| Reducer | Same | Same |
| Actions | Same | Same |
| Dispatch | Same | Same |
| Provider | CartProvider | `<Provider store={store}>` |
| useSelector | `useContext` | `useSelector` |

Redux adds middleware, DevTools, and performance optimizations. For apps that don't need those, this pattern is lighter.

## Dispatch through context

The key insight: you put `dispatch` in the context value so any component can dispatch actions without prop drilling:

```jsx
// In any component, anywhere in the tree:
const { state, dispatch } = useContext(CartContext)

dispatch({ type: 'ADD_ITEM', payload: product })
dispatch({ type: 'CLEAR_CART' })
```

## Performance consideration

Every time `state` changes, every component using this context re-renders. For a cart with many action types and a large tree of components reading from it, this can be a problem. Solutions include:

- Splitting into multiple contexts (CartItemsContext, CartActionsContext)
- Using Zustand instead (challenge 26), which has more granular subscription

For most apps, this doesn't matter.

## Common mistakes

- Providing just the state without dispatch — components can read but not update
- Forgetting to wrap the app in CartProvider — useContext returns null, crashes immediately
- Mutating state in the reducer instead of returning new objects
