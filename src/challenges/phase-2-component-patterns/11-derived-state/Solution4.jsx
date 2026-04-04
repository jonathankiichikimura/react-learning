import { useState } from 'react'

const PRODUCTS = [
  { id: 1, name: 'Mechanical Keyboard',  price: 89 },
  { id: 2, name: 'USB-C Hub',            price: 35 },
  { id: 3, name: 'Monitor Stand',        price: 55 },
  { id: 4, name: 'Webcam HD',            price: 72 },
  { id: 5, name: 'Desk Mat',             price: 28 },
  { id: 6, name: 'Cable Management Kit', price: 18 },
]

export default function Solution() {
  const [search, setSearch] = useState('')
  const [sort,   setSort]   = useState('none')

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const displayed =
    sort === 'asc'  ? [...filtered].sort((a, b) => a.price - b.price) :
    sort === 'desc' ? [...filtered].sort((a, b) => b.price - a.price) :
    filtered

  return (
    <div style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          style={{ flex: 1 }}
        />
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="none">Sort</option>
          <option value="asc">Price ↑</option>
          <option value="desc">Price ↓</option>
        </select>
      </div>
      {displayed.length === 0
        ? <p style={{ color: '#555' }}>No products found.</p>
        : (
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {displayed.map(p => (
              <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: '#1a1a1a', borderRadius: '6px' }}>
                <span>{p.name}</span>
                <span style={{ color: '#60a5fa', fontFamily: 'monospace' }}>${p.price}</span>
              </li>
            ))}
          </ul>
        )
      }
      <p style={{ fontSize: '0.8rem', color: '#555', margin: 0 }}>
        {displayed.length} result{displayed.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
