import { useState } from 'react'

function CelsiusInput({ value, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input type="number" value={value} onChange={onChange} style={{ width: '80px' }} />
      °C
    </label>
  )
}

function FahrenheitInput({ value, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input type="number" value={value} onChange={onChange} style={{ width: '80px' }} />
      °F
    </label>
  )
}

export default function Solution() {
  // Store Celsius as the single source of truth
  const [celsius, setCelsius] = useState(0)

  const fahrenheit = (celsius * 9) / 5 + 32

  function handleCelsiusChange(e) {
    setCelsius(parseFloat(e.target.value) || 0)
  }

  function handleFahrenheitChange(e) {
    const f = parseFloat(e.target.value) || 0
    setCelsius(((f - 32) * 5) / 9)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <CelsiusInput value={celsius} onChange={handleCelsiusChange} />
      <FahrenheitInput value={fahrenheit.toFixed(2)} onChange={handleFahrenheitChange} />
    </div>
  )
}
