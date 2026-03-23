import { useState } from 'react'

const initialItems = [
  { id: 1, name: 'React Book',          price: 29,  qty: 1 },
  { id: 2, name: 'Mechanical Keyboard', price: 120, qty: 1 },
  { id: 3, name: 'Monitor Stand',       price: 45,  qty: 1 },
]

export default function Solution() {
  const [items, setItems] = useState(initialItems)

  function updateQty(id, delta) {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, qty: Math.max(0, item.qty + delta) }
        : item
    ))
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div style={{ maxWidth: '400px' }}>
      {items.map(item => (
        <div
          key={item.id}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #222' }}
        >
          <span style={{ flex: 1 }}>{item.name}</span>
          <span style={{ color: '#888', marginRight: '1rem' }}>${item.price}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button onClick={() => updateQty(item.id, -1)}>-</button>
            <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
            <button onClick={() => updateQty(item.id, +1)}>+</button>
          </div>
          <span style={{ marginLeft: '1rem', minWidth: '50px', textAlign: 'right' }}>
            ${item.price * item.qty}
          </span>
        </div>
      ))}
      <div style={{ textAlign: 'right', marginTop: '1rem', fontWeight: 'bold' }}>
        Total: ${total}
      </div>
    </div>
  )
}
