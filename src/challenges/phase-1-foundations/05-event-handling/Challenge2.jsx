import { useState } from 'react'

export const description = {
  title: 'The Event Object',
  concept: 'onClick · onKeyDown · Event object · e.key · e.target',
  task: 'Build a "Key Inspector" — a text input that displays the name of the last key pressed. Use the onKeyDown event. Show "Press a key..." as the initial message. When the user types, show the key name (e.g. "a", "Enter", "Shift").',
  hints: [
    'Use onKeyDown on the input, not onChange — onKeyDown fires for every key including non-printable ones',
    'The event object is passed automatically: onKeyDown={e => setLastKey(e.key)}',
    'e.key gives the name of the key: "a", "A", "Enter", "Backspace", "ArrowLeft", etc.',
    'e.target.value gives the current value of the input field',
    'Initialize state as null or empty string and show the placeholder when null',
  ],
  acceptance: [
    'A text input is on screen',
    'Pressing any key updates the displayed key name',
    'Shows "Press a key..." initially (before any key is pressed)',
    'Non-printable keys like Enter, Shift, and Backspace display their names correctly',
  ],
}

export default function Challenge() {
  // TODO: Create state to store the last key pressed
  // const [lastKey, setLastKey] = useState(null)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      <input
        placeholder="Click here and press any key"
        // TODO: Add onKeyDown handler that reads e.key
      />
      {/* TODO: Display lastKey or "Press a key..." if no key yet */}
      <p style={{ fontSize: '1.2rem' }}>Press a key...</p>
    </div>
  )
}
