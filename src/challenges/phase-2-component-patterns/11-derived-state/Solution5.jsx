import { useState } from 'react'

const INITIAL_CART = [
  { id: 1, name: 'Coffee Beans', price: 14.99, qty: 1 },
  { id: 2, name: 'French Press', price: 29.99, qty: 1 },
  { id: 3, name: 'Ceramic Mug',  price: 12.99, qty: 2 },
]

function fmt(n) { return `$${n.toFixed(2)}` }

export default function Solution() {
  const [cart, setCart] = useState(INITIAL_CART)

  function updateQty(id, delta) {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const discount = subtotal >= 50 ? subtotal * 0.1 : 0
  const tax      = (subtotal - discount) * 0.08
  const total    = subtotal - discount + tax

  return (
    <div style={{ maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {cart.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: '#1a1a1a', borderRadius: '6px' }}>
          <span style={{ flex: 1 }}>{item.name}</span>
          <span style={{ color: '#aaa', fontSize: '0.85rem', marginRight: '0.75rem' }}>{fmt(item.price)}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <button onClick={() => updateQty(item.id, -1)} style={{ width: '28px', padding: 0 }}>−</button>
            <span style={{ minWidth: '20px', textAlign: 'center', fontFamily: 'monospace' }}>{item.qty}</span>
            <button onClick={() => updateQty(item.id, +1)} style={{ width: '28px', padding: 0 }}>+</button>
          </div>
        </div>
      ))}

      <div style={{ borderTop: '1px solid #333', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#777' }}>Subtotal</span>
          <span>{fmt(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4ade80' }}>
            <span>Discount (10%)</span>
            <span>−{fmt(discount)}</span>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#777' }}>Tax (8%)</span>
          <span>{fmt(tax)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: '0.25rem', paddingTop: '0.25rem', borderTop: '1px solid #333' }}>
          <span>Total</span>
          <span style={{ color: '#60a5fa' }}>{fmt(total)}</span>
        </div>
      </div>
    </div>
  )
}
