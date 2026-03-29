export const description = {
  title: 'Props of Different Types',
  concept: 'Props · Strings · Numbers · Booleans · Conditional display',
  task: 'Build a ProductCard component that accepts name (string), price (number), and inStock (boolean) props. Show "In Stock ✓" in green when inStock is true, or "Out of Stock ✗" in red when false. Render two cards with different data.',
  hints: [
    'Strings pass without braces: name="Widget", but numbers and booleans need braces: price={29.99} inStock={true}',
    'For booleans, just the prop name means true: <ProductCard inStock /> is the same as inStock={true}',
    'Use a ternary to conditionally show the stock status: {inStock ? "In Stock ✓" : "Out of Stock ✗"}',
    'Apply conditional color with inline style: style={{ color: inStock ? "green" : "red" }}',
  ],
  acceptance: [
    'ProductCard accepts name, price, and inStock as props',
    'Two ProductCards render with different data',
    'In-stock card shows "In Stock ✓"',
    'Out-of-stock card shows "Out of Stock ✗"',
    'The stock status text is a different color for each state',
  ],
}

// TODO: Build a ProductCard component that accepts name, price, inStock props
function ProductCard({ name, price, inStock }) {
  return(
    <div className="card">
      <h3>{name}</h3>
      <p>Price: {price}</p>
      <p style={inStock ? { "color": "green" } : { "color": "red" }}>{inStock ? "In Stock ✓" : "Out of Stock ✗"}</p>
    </div>
  )
}


export default function Challenge() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {/* TODO: Render two ProductCard components with different data */}
      <ProductCard name="PSU" price={200} inStock={true} />
      <ProductCard name="RAM" price={9999} inStock={false} />
    </div>
  )
}
