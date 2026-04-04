import { useState } from 'react'

function Slider({ label, value, color, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
        <span style={{ color: '#aaa' }}>{label}</span>
        <span style={{ color: '#ddd', fontFamily: 'monospace' }}>{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={255}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ accentColor: color, width: '100%' }}
      />
    </div>
  )
}

export default function Solution() {
  const [r, setR] = useState(99)
  const [g, setG] = useState(102)
  const [b, setB] = useState(241)

  const rgbString = `rgb(${r}, ${g}, ${b})`
  const hexString = `#${[r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')}`

  return (
    <div style={{ maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Slider label="Red"   value={r} color="#f87171" onChange={setR} />
      <Slider label="Green" value={g} color="#4ade80" onChange={setG} />
      <Slider label="Blue"  value={b} color="#60a5fa" onChange={setB} />
      <div style={{ height: '80px', borderRadius: '8px', background: rgbString, transition: 'background 0.1s' }} />
      <p style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: '#aaa', textAlign: 'center', margin: 0 }}>
        {hexString} · {rgbString}
      </p>
    </div>
  )
}
