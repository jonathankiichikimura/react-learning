import { useState } from 'react'

export const description = {
  title: 'Product Configurator',
  concept: 'Lifting state · Multiple siblings · Callback props · Composition',
  task: 'Build a product configurator with two selector components: ColorPicker and SizePicker. Each receives its current value and an onChange callback as props. The parent (Challenge) owns both selections and renders a live preview card showing the chosen size and color. Clicking different options updates the preview.',
  hints: [
    'selectedColor and selectedSize both live in the parent — not in the child components',
    'ColorPicker receives: selectedColor and onColorChange props',
    'SizePicker receives: selectedSize and onSizeChange props',
    'Pass the setter directly: <ColorPicker selectedColor={color} onColorChange={setColor} />',
    'The preview card reads both values from parent state',
  ],
  acceptance: [
    'ColorPicker and SizePicker are defined as separate components',
    'Neither selector has its own state — both are controlled by the parent',
    'Selecting a color or size immediately updates the preview',
    'The preview shows both the selected color name and size',
  ],
}

const COLORS = [
  { name: 'Coral',    hex: '#f87171' },
  { name: 'Amber',   hex: '#fb923c' },
  { name: 'Sky',     hex: '#60a5fa' },
  { name: 'Emerald', hex: '#4ade80' },
]
const SIZES = ['XS', 'S', 'M', 'L', 'XL']

function ColorPicker({ selectedColor, onColorChange }) {
  // This component is done — don't change it
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
  // This component is done — don't change it
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

export default function Challenge() {
  // TODO: Add selectedColor (object with name+hex) and selectedSize (string) state
  // TODO: Pass them down to ColorPicker and SizePicker with their onChange callbacks

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '320px' }}>
      <ColorPicker selectedColor={null} onColorChange={() => {}} />
      <SizePicker selectedSize={null} onSizeChange={() => {}} />
      {/* TODO: Show a preview card with the selected color and size */}
      <div className="card">
        <p style={{ color: '#555' }}>Select a color and size above</p>
      </div>
    </div>
  )
}
