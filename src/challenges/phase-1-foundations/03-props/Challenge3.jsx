import { useState } from 'react'

export const description = {
  title: 'Function Props',
  concept: 'Props · Functions as props · Callbacks · Parent-child communication',
  task: 'Build a ColorSwatch component that accepts color (string) and onSelect (function) props. Render 5 swatches in different colors. Clicking a swatch calls onSelect(color). Display the currently selected color name below the swatches.',
  hints: [
    'ColorSwatch receives color and onSelect: function ColorSwatch({ color, onSelect })',
    'The swatch is a div/button with backgroundColor: color set via inline style',
    'Call onSelect from the onClick: onClick={() => onSelect(color)}',
    'The parent (Challenge) manages selectedColor state and passes onSelect down',
    'Display selectedColor below: {selectedColor ? selectedColor : "None selected"}',
  ],
  acceptance: [
    'Five colored swatches are visible',
    'Clicking a swatch updates the displayed color name',
    'ColorSwatch accepts color and onSelect as props',
    'The selected color name appears below the swatches',
  ],
}

// TODO: Build a ColorSwatch component that accepts color and onSelect props

const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa']

export default function Challenge() {
  const [selectedColor, setSelectedColor] = useState(null)

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {/* TODO: Map over colors and render a ColorSwatch for each */}
        <p>Render swatches here</p>
      </div>
      <p>Selected: {selectedColor ?? 'None'}</p>
    </div>
  )
}
