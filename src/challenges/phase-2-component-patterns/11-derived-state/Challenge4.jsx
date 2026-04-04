import { useState } from 'react'

export const description = {
  title: 'Filter + Sort Combined',
  concept: 'Derived state · Multiple state sources · Composing transformations · Single source of truth',
  task: 'Build a product list with two independent controls: a search input (filters by name) and a "Sort by price" dropdown (low→high, high→low, or none). Each control has its own state variable. The DISPLAYED list is derived each render by first filtering PRODUCTS, then sorting. Never store the filtered/sorted result in state.',
  hints: [
    'Two state vars: const [search, setSearch] = useState("") and const [sort, setSort] = useState("none")',
    'Filter first: const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))',
    'Then sort a COPY: const displayed = sort === "asc" ? [...filtered].sort((a, b) => a.price - b.price) : filtered',
    '.sort() mutates! Always spread before sorting: [...filtered].sort(...)',
    'For "none": just use filtered as-is — no sort step needed',
  ],
  acceptance: [
    'Typing in the search input filters products by name (case-insensitive)',
    'The sort dropdown changes the order of the already-filtered results',
    'Clearing the search restores all products in the current sort order',
    'PRODUCTS is never mutated — a new array is derived each render',
    'Two separate state variables control the two controls independently',
  ],
}

const PRODUCTS = [
  { id: 1, name: 'Mechanical Keyboard',  price: 89 },
  { id: 2, name: 'USB-C Hub',            price: 35 },
  { id: 3, name: 'Monitor Stand',        price: 55 },
  { id: 4, name: 'Webcam HD',            price: 72 },
  { id: 5, name: 'Desk Mat',             price: 28 },
  { id: 6, name: 'Cable Management Kit', price: 18 },
]

export default function Challenge() {
  const [search, setSearch] = useState('')
  const [sort,   setSort]   = useState('none')

  // TODO: Derive the displayed list by:
  // 1. filtering PRODUCTS where name includes search (case-insensitive)
  // 2. sorting by price based on sort state ('asc' / 'desc' / 'none')
  // Remember: .sort() mutates — spread the filtered array first!
  const displayed = PRODUCTS // ← replace this

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
