import { useState } from 'react'

export const description = {
  title: 'The Event Object',
  concept: 'onClick · onKeyDown · Event object · e.key · e.target',
  task: 'Build a "Key Inspector" — a text input that displays the name of the last key pressed. Use the onKeyDown event. Show "Press a key..." as the initial message. When the user types, show the key name (e.g. "a", "Enter", "Shift").',
  hints: [
    'Use onKeyDown on the input, not onChange — onKeyDown fires for every key including non-printable ones',
    'The event object is passed automatically: onKeyDown={e => setLastKey(e.key)}',
    'e.key gives the name of the key: "a", "A", "Enter", "Backspace", "ArrowLeft", etc.',
    'Initialize state as null and show the placeholder when null',
  ],
  acceptance: [
    'A text input is on screen',
    'Pressing any key updates the displayed key name',
    'Shows "Press a key..." initially (before any key is pressed)',
    'Non-printable keys like Enter, Shift, and Backspace display their names correctly',
  ],
}

export default function Challenge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
      {/* TODO: Add state for the last key pressed, wire up onKeyDown on the input,
               and display the key name (or "Press a key..." if none yet) */}
    </div>
  )
}
