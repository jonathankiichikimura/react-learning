import { useState } from 'react'

export const description = {
  title: 'Multiple State Variables',
  concept: 'useState · Multiple state · State transitions',
  task: 'Build a traffic light that cycles through three states on button click: Red → Yellow → Green → Red. Show the light as a large emoji (🔴 🟡 🟢) and display the color name below it. Use a single state variable to track the current light.',
  hints: [
    'Store the current light as a string: useState("red")',
    'Use an object or if/else to look up the next light: red→yellow, yellow→green, green→red',
    'Or use an array and cycle the index: const lights = ["red", "yellow", "green"]',
    'The emoji can be derived from state: const emoji = { red: "🔴", yellow: "🟡", green: "🟢" }[light]',
  ],
  acceptance: [
    'A large emoji is displayed representing the current light',
    'The color name is shown below the emoji',
    'Clicking the button advances to the next color',
    'After green, it cycles back to red',
  ],
}

export default function Challenge() {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* TODO: Add state for the current light, show its emoji and name,
               and wire up the button to cycle to the next light */}
    </div>
  )
}
