function ProductCard({ name, price, inStock }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${price.toFixed(2)}</p>
      <p style={{ color: inStock ? '#4ade80' : '#f87171' }}>
        {inStock ? 'In Stock ✓' : 'Out of Stock ✗'}
      </p>
    </div>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ProductCard name="Mechanical Keyboard" price={129.99} inStock={true} />
      <ProductCard name="USB-C Hub" price={49.99} inStock={false} />
    </div>
  )
}
