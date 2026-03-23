import { createContext, useContext, useReducer } from 'react'

export const description = {
  title: 'Context + useReducer',
  concept: 'Global state · Context + useReducer · Cart pattern',
  task: 'Build a shopping cart where the cart data is accessible from any component without prop drilling. A ProductList shows 4 products with "Add to Cart" buttons. A CartSummary shows the item count in the header. Both components get their data and actions from CartContext.',
  hints: [
    'Combine Context and useReducer: the context value is { state, dispatch }',
    'Build a CartProvider component that holds the useReducer and wraps everything in CartContext.Provider',
    'Consume in any component: const { state, dispatch } = useContext(CartContext)',
    'Reducer actions: ADD_ITEM (add or increment), CLEAR_CART',
    'Item count: state.items.reduce((sum, item) => sum + item.qty, 0)',
    'This pattern is effectively a lightweight Redux — many teams use it for mid-size apps',
  ],
  acceptance: [
    'A CartContext exists with a CartProvider',
    'CartSummary shows the current item count, sourced from context',
    'Clicking "Add to Cart" on a product updates CartSummary immediately',
    'No cart props are passed between components',
  ],
}

// TODO:
// 1. Create CartContext
// 2. Build a CartProvider that holds useReducer with ADD_ITEM and CLEAR_CART actions
// 3. Build CartSummary that reads from context
// 4. Build ProductList that dispatches ADD_ITEM

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    // TODO: Handle ADD_ITEM and CLEAR_CART
    default: return state
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  // TODO: Provide { state, dispatch } via CartContext.Provider
  return children
}

function CartSummary() {
  // TODO: Read item count from context
  return <div style={{ padding: '0.75rem 1rem', background: '#1a1a1a', borderBottom: '1px solid #222' }}>Cart: 0 items</div>
}

const products = [
  { id: 1, name: 'React Book',    price: 29 },
  { id: 2, name: 'Keyboard',      price: 120 },
  { id: 3, name: 'Monitor Stand', price: 45 },
  { id: 4, name: 'USB Hub',       price: 35 },
]

function ProductList() {
  // TODO: Dispatch ADD_ITEM when "Add to Cart" is clicked
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {products.map(p => (
        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{p.name} — ${p.price}</span>
          <button>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}

export default function Challenge() {
  return (
    <CartProvider>
      <div style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
        <CartSummary />
        <ProductList />
      </div>
    </CartProvider>
  )
}
