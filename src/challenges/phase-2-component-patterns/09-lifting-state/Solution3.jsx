import { useState } from 'react'

const COLORS = [
  { name: 'Coral',    hex: '#f87171' },
  { name: 'Amber',   hex: '#fb923c' },
  { name: 'Sky',     hex: '#60a5fa' },
  { name: 'Emerald', hex: '#4ade80' },
]
const SIZES = ['XS', 'S', 'M', 'L', 'XL']

function ColorPicker({ selectedColor, onColorChange }) {
  return (
    <div>
      <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '0.4rem' }}>Color</p>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {COLORS.map(c => (
          <div
            key={c.name}
            onClick={() => onColorChange(c)}
            title={c.name}
            style={{
              width: '28px', height: '28px', borderRadius: '50%',
              backgroundColor: c.hex, cursor: 'pointer',
              outline: selectedColor?.name === c.name ? '3px solid white' : 'none',
              outlineOffset: '2px',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function SizePicker({ selectedSize, onSizeChange }) {
  return (
    <div>
      <p style={{ fontSize: '0.8rem', color: '#aaa', marginBottom: '0.4rem' }}>Size</p>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {SIZES.map(s => (
          <button
            key={s}
            onClick={() => onSizeChange(s)}
            style={{
              padding: '0.2rem 0.6rem',
              background: selectedSize === s ? '#1a2f4a' : '#222',
              color: selectedSize === s ? '#60a5fa' : '#ddd',
              borderColor: selectedSize === s ? '#3b82f6' : '#3a3a3a',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Solution() {
  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [selectedSize, setSelectedSize]   = useState('M')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '320px' }}>
      <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} />
      <SizePicker  selectedSize={selectedSize}   onSizeChange={setSelectedSize}  />
      <div className="card" style={{ textAlign: 'left' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: selectedColor.hex, marginBottom: '0.75rem' }} />
        <h3 style={{ marginBottom: '0.25rem' }}>Classic Tee</h3>
        <p style={{ color: '#aaa', fontSize: '0.85rem' }}>
          Size <strong style={{ color: '#ddd' }}>{selectedSize}</strong> in{' '}
          <strong style={{ color: selectedColor.hex }}>{selectedColor.name}</strong>
        </p>
      </div>
    </div>
  )
}
