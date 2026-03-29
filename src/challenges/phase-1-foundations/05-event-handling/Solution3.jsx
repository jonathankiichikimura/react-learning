import { useState } from 'react'

const COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#c084fc']

export default function Solution() {
  const [selected, setSelected] = useState(COLORS[0])

  function handleSelect(color) {
    setSelected(color)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {COLORS.map(color => (
          <div
            key={color}
            onClick={() => handleSelect(color)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: color,
              cursor: 'pointer',
              outline: color === selected ? '3px solid white' : 'none',
              outlineOffset: '2px',
            }}
          />
        ))}
      </div>
      <div style={{
        width: '100%',
        height: '80px',
        borderRadius: '8px',
        backgroundColor: selected,
        transition: 'background-color 0.2s',
      }} />
      <p style={{ fontFamily: 'monospace' }}>{selected}</p>
    </div>
  )
}
