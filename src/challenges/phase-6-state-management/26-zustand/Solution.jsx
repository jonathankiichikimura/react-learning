import { create } from 'zustand'

const useCartStore = create((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find(i => i.id === product.id)
      if (existing) {
        return { items: state.items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) }
      }
      return { items: [...state.items, { ...product, qty: 1 }] }
    }),
  clearCart: () => set({ items: [] }),
}))

const products = [
  { id: 1, name: 'React Book',    price: 29  },
  { id: 2, name: 'Keyboard',      price: 120 },
  { id: 3, name: 'Monitor Stand', price: 45  },
  { id: 4, name: 'USB Hub',       price: 35  },
]

function CartSummary() {
  const items    = useCartStore(state => state.items)
  const clearCart = useCartStore(state => state.clearCart)
  const count = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div style={{ padding: '0.75rem 1rem', background: '#1a1a1a', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>Cart: {count} item{count !== 1 ? 's' : ''}</span>
      {count > 0 && <button onClick={clearCart}>Clear</button>}
    </div>
  )
}

function ProductList() {
  const addItem = useCartStore(state => state.addItem)
  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {products.map(p => (
        <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{p.name} — ${p.price}</span>
          <button onClick={() => addItem(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}

export default function Solution() {
  return (
    <div style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
      <CartSummary />
      <ProductList />
    </div>
  )
}
