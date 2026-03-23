import { create } from 'zustand'

export const description = {
  title: 'Zustand',
  concept: 'Zustand · create() · Global state without Provider',
  task: 'Rebuild the shopping cart from challenge 25 using Zustand instead. Create a store with useCartStore that holds items and exposes addItem and clearCart actions. Notice: no Provider, no Context, no prop drilling — any component just calls the hook.',
  hints: [
    'import { create } from "zustand"',
    'Create a store: const useCartStore = create((set) => ({ items: [], addItem: (product) => set((state) => ({ ... })), clearCart: () => set({ items: [] }) }))',
    'set() receives the current state and returns the partial state to merge',
    'Use in any component: const { items, addItem } = useCartStore()',
    'No Provider needed — Zustand stores state outside React\'s tree entirely',
    'You can select only what you need: const count = useCartStore(state => state.items.length)',
  ],
  acceptance: [
    'A Zustand store (useCartStore) is defined with items, addItem, and clearCart',
    'CartSummary reads the item count from the store',
    'ProductList dispatches addItem from the store',
    'No Context or Provider exists anywhere',
    'Clicking "Add to Cart" updates CartSummary',
  ],
}

// TODO:
// 1. Create useCartStore with { items, addItem, clearCart }
// 2. In CartSummary, use useCartStore to get the item count and clearCart
// 3. In ProductList, use useCartStore to get addItem

const useCartStore = create((set) => ({
  items: [],
  // TODO: addItem(product) — add or increment the product in items
  // TODO: clearCart()      — reset items to []
}))

const products = [
  { id: 1, name: 'React Book',    price: 29  },
  { id: 2, name: 'Keyboard',      price: 120 },
  { id: 3, name: 'Monitor Stand', price: 45  },
  { id: 4, name: 'USB Hub',       price: 35  },
]

function CartSummary() {
  // TODO: Read items from store, show count, add clear button
  return (
    <div style={{ padding: '0.75rem 1rem', background: '#1a1a1a', borderBottom: '1px solid #222' }}>
      Cart: 0 items
    </div>
  )
}

function ProductList() {
  // TODO: Get addItem from store, wire up buttons
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
    <div style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
      <CartSummary />
      <ProductList />
    </div>
  )
}
