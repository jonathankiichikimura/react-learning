import { useState } from 'react'

export const description = {
  title: 'Derived State',
  concept: 'Computed values · Avoid redundant state · .reduce()',
  task: 'Build a mini shopping cart with 3 products. Each product has + and - buttons to adjust its quantity. The subtotal per item and the cart total must be computed from the quantities — not stored as separate state. If you find yourself writing setTotal(), you\'re doing it wrong.',
  hints: [
    'Store only what changes: an array of items, each with { id, name, price, qty }',
    'Compute the total in render: items.reduce((sum, item) => sum + item.price * item.qty, 0)',
    'Each item\'s subtotal is just item.price * item.qty — calculate it directly in JSX',
    'To update a quantity: setItems(items.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item))',
    'Clamp qty at 0 — prevent negative quantities: Math.max(0, item.qty - 1)',
  ],
  acceptance: [
    'Three items render with name, price, quantity controls, and subtotal',
    'Changing a quantity updates the subtotal and cart total immediately',
    'Quantities cannot go below 0',
    'No setTotal or setSubtotal anywhere — they are derived values',
  ],
}

const initialItems = [
  { id: 1, name: 'React Book',  price: 29,  qty: 1 },
  { id: 2, name: 'Mechanical Keyboard', price: 120, qty: 1 },
  { id: 3, name: 'Monitor Stand', price: 45, qty: 1 },
]

export default function Challenge() {
  const [items, setItems] = useState(initialItems)

  // TODO:
  // 1. Write increment and decrement functions that update the matching item's qty
  // 2. Compute the total from items (no setTotal allowed)
  // 3. Display each item's subtotal inline (no setSubtotal allowed)

  return (
    <div style={{ maxWidth: '400px' }}>
      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #222' }}>
          <span style={{ flex: 1 }}>{item.name}</span>
          <span style={{ color: '#888', marginRight: '1rem' }}>${item.price}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button>-</button>
            <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
            <button>+</button>
          </div>
          <span style={{ marginLeft: '1rem', minWidth: '50px', textAlign: 'right' }}>
            ${item.price * item.qty}
          </span>
        </div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '1rem', fontWeight: 'bold' }}>
        Total: $0
      </div>
    </div>
  )
}
