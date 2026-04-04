import { useState } from 'react'

export const description = {
  title: 'RGB Color Mixer',
  concept: 'Lifting state · Multiple siblings · Range inputs · Computed output from lifted state',
  task: 'Build an RGB color mixer with three Slider components — one each for Red (0–255), Green (0–255), and Blue (0–255). All three sliders lift their values to the parent (Challenge), which derives the rgb(r, g, b) color string and the hex code. No Slider component holds state — all three values live in the parent.',
  hints: [
    'Parent: const [r, setR] = useState(99) and similarly for g and b',
    'Each Slider receives: label, value, color (accent color), and onChange props',
    'Range input: <input type="range" min={0} max={255} value={value} onChange={e => onChange(Number(e.target.value))} />',
    'RGB string: `rgb(${r}, ${g}, ${b})`',
    'Hex: `#${[r,g,b].map(n => n.toString(16).padStart(2,"0")).join("")}`',
  ],
  acceptance: [
    'Three Slider components render — none has its own state',
    'All three values are lifted to and controlled by the parent',
    'Dragging any slider updates the color preview in real time',
    'The preview box shows the correct rgb() color',
    'The hex code below the preview updates correctly',
  ],
}

function Slider({ label, value, color, onChange }) {
  // TODO: Render label (with current value), a range input 0–255, and the numeric value
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {/* TODO */}
    </div>
  )
}

export default function Challenge() {
  const [r, setR] = useState(99)
  const [g, setG] = useState(102)
  const [b, setB] = useState(241)

  // TODO: Derive rgbString = `rgb(${r}, ${g}, ${b})`
  // TODO: Derive hexString using .toString(16).padStart(2, "0")

  return (
    <div style={{ maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* TODO: <Slider label="Red"   value={r} color="#f87171" onChange={setR} /> */}
      {/* TODO: <Slider label="Green" value={g} color="#4ade80" onChange={setG} /> */}
      {/* TODO: <Slider label="Blue"  value={b} color="#60a5fa" onChange={setB} /> */}
      {/* TODO: Color preview box (80px tall, background = rgbString) */}
      {/* TODO: hex + rgb label below */}
    </div>
  )
}
