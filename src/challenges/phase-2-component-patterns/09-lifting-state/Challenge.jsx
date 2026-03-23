import { useState } from 'react'

export const description = {
  title: 'Lifting State Up',
  concept: 'Shared state · Single source of truth · Sibling communication',
  task: 'Build a temperature converter with two inputs: Celsius and Fahrenheit. Typing in either input should update the other automatically. The two inputs are siblings — their shared state must live in the parent (Challenge), and each input receives its value and onChange as props.',
  hints: [
    'Keep ONE temperature value in state — not one per input',
    'Each input derives its displayed value from that single state',
    'Celsius → Fahrenheit: (c * 9/5) + 32',
    'Fahrenheit → Celsius: (f - 32) * 5/9',
    'When the Celsius input changes, convert to Fahrenheit and store that. Or store Celsius — pick one unit as the source of truth.',
    'Use parseFloat() to convert the string from e.target.value to a number',
  ],
  acceptance: [
    'Typing in the Celsius input updates the Fahrenheit input in real time',
    'Typing in the Fahrenheit input updates the Celsius input in real time',
    '0°C shows 32°F — 100°C shows 212°F',
    'Both inputs stay in sync',
  ],
}

// TODO:
// 1. Keep a single temperature value in state (pick either Celsius or Fahrenheit as the stored unit)
// 2. Pass the converted value and an onChange handler into each input below
// 3. Each onChange should convert from its unit to the stored unit, then call setState

function CelsiusInput({ value, onChange }) {
  // This component is done — don't change it
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        type="number"
        value={value}
        onChange={onChange}
        style={{ width: '80px' }}
      />
      °C
    </label>
  )
}

function FahrenheitInput({ value, onChange }) {
  // This component is done — don't change it
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        type="number"
        value={value}
        onChange={onChange}
        style={{ width: '80px' }}
      />
      °F
    </label>
  )
}

export default function Challenge() {
  // TODO: Add state here and wire up the two inputs below

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CelsiusInput value={0} onChange={() => {}} />
      <FahrenheitInput value={32} onChange={() => {}} />
    </div>
  )
}
