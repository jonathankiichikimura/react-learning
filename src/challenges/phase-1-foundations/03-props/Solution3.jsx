import { useState } from 'react'

function ColorSwatch({ color, onSelect }) {
  return (
    <div
      onClick={() => onSelect(color)}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: color,
        cursor: 'pointer',
        border: '2px solid transparent',
      }}
      title={color}
    />
  )
}

const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa']

export default function Solution() {
  const [selectedColor, setSelectedColor] = useState(null)

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {colors.map(color => (
          <ColorSwatch key={color} color={color} onSelect={setSelectedColor} />
        ))}
      </div>
      <p>Selected: <span style={{ color: selectedColor ?? 'inherit' }}>{selectedColor ?? 'None'}</span></p>
    </div>
  )
}
