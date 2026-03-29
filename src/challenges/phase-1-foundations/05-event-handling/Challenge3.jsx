import { useState } from 'react'

export const description = {
  title: 'Passing Args to Handlers',
  concept: 'onClick · Arrow functions · Passing arguments · Dynamic handlers',
  task: 'Render 6 colored swatches as clickable buttons. Clicking a swatch sets a preview box to that color. Use the pattern onClick={() => handleSelect(color)} to pass the specific color to the handler. Show the selected color\'s hex value below.',
  hints: [
    'Use onClick={() => handleSelect(color)} — the arrow function lets you pass the value',
    'Do NOT write onClick={handleSelect(color)} — that calls the function immediately on render!',
    'Each swatch is a div with backgroundColor set via inline style',
    'Store the selected color in state and apply it to a preview box\'s background',
  ],
  acceptance: [
    'Six colored swatches are visible',
    'Clicking a swatch changes the preview box\'s background color',
    'The selected color\'s hex value is shown below',
    'The handler receives the correct color value for each swatch',
  ],
}

const COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#c084fc']

export default function Challenge() {
  const [selected, setSelected] = useState(COLORS[0])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {COLORS.map(color => (
          <div
            key={color}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              backgroundColor: color,
              cursor: 'pointer',
          }}
          // TODO: Add onClick that calls handleSelect with this color
          />
        ))}
      </div>
      <div style={{ width: '100%', height: '80px', borderRadius: '8px', backgroundColor: selected, transition: 'background-color 0.2s' }} />
      <p style={{ fontFamily: 'monospace' }}>{selected}</p>
    </div>
  )
}
