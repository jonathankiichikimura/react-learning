import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return { items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) }
      }
      return { items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case 'CLEAR_CART':
      return { items: [] }
    default:
      return state
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

function CartSummary() {
  const { state, dispatch } = useContext(CartContext)
  const count = state.items.reduce((sum, item) => sum + item.qty, 0)
  return (
    <div style={{ padding: '0.75rem 1rem', background: '#1a1a1a', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>Cart: {count} item{count !== 1 ? 's' : ''}</span>
      {count > 0 && <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>Clear</button>}
    </div>
  )
}

const products = [
  { id: 1, name: 'React Book',    price: 29  },
  { id: 2, name: 'Keyboard',      price: 120 },
  { id: 3, name: 'Monitor Stand', price: 45  },
  { id: 4, name: 'USB Hub',       price: 35  },
]

function ProductList() {
  const { dispatch } = useContext(CartContext)
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {products.map(p => (
        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{p.name} — ${p.price}</span>
          <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}

export default function Solution() {
  return (
    <CartProvider>
      <div style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
        <CartSummary />
        <ProductList />
      </div>
    </CartProvider>
  )
}
