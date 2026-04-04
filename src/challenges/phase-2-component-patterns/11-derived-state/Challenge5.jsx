import { useState } from 'react'

export const description = {
  title: 'Derived Cart Totals',
  concept: 'Derived state · .reduce() · Chained derivations · Never storing computed values',
  task: 'Build a shopping cart with quantity + / − controls. From the cart array state, derive FOUR values every render: subtotal, discount (10% off if subtotal ≥ $50), tax (8% on the discounted subtotal), and total. All four must be computed — never stored as state. A breakdown table shows all four with the discount row appearing only when it applies.',
  hints: [
    'Only one piece of state: const [cart, setCart] = useState(INITIAL_CART)',
    'subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)',
    'discount = subtotal >= 50 ? subtotal * 0.1 : 0',
    'tax = (subtotal - discount) * 0.08',
    'total = subtotal - discount + tax',
    'Update qty: setCart(cart.map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))',
  ],
  acceptance: [
    'Each cart item has + and − quantity buttons; qty cannot go below 0',
    'Subtotal updates correctly as quantities change',
    'The 10% discount row appears only when subtotal ≥ $50 and disappears below that threshold',
    'Tax and total recalculate automatically with every change',
    'No setSubtotal, setTax, setTotal, or setDiscount calls anywhere — all four are derived',
  ],
}

const INITIAL_CART = [
  { id: 1, name: 'Coffee Beans', price: 14.99, qty: 1 },
  { id: 2, name: 'French Press', price: 29.99, qty: 1 },
  { id: 3, name: 'Ceramic Mug',  price: 12.99, qty: 2 },
]

export default function Challenge() {
  const [cart, setCart] = useState(INITIAL_CART)

  function updateQty(id, delta) {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ))
  }

  // TODO: Derive all four values from cart — do NOT store them in state
  // subtotal = cart.reduce(...)
  // discount = subtotal >= 50 ? subtotal * 0.1 : 0
  // tax      = (subtotal - discount) * 0.08
  // total    = subtotal - discount + tax

  return (
    <div style={{ maxWidth: '340px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {cart.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: '#1a1a1a', borderRadius: '6px' }}>
          <span style={{ flex: 1 }}>{item.name}</span>
          <span style={{ color: '#aaa', fontSize: '0.85rem', marginRight: '0.75rem' }}>${item.price}</span>
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
          <span>$0.00</span>{/* TODO: replace with derived subtotal */}
        </div>
        {/* TODO: conditionally show a "Discount (10%)" row — only when discount > 0 */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#777' }}>Tax (8%)</span>
          <span>$0.00</span>{/* TODO: replace with derived tax */}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: '0.25rem', paddingTop: '0.25rem', borderTop: '1px solid #333' }}>
          <span>Total</span>
          <span style={{ color: '#60a5fa' }}>$0.00</span>{/* TODO: replace with derived total */}
        </div>
      </div>
    </div>
  )
}
