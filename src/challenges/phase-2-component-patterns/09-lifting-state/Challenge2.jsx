import { useState } from 'react'

export const description = {
  title: 'Shared Display Components',
  concept: 'Lifting state · Sibling sync · Single source of truth',
  task: 'Build a counter with two separate display components: NumberDisplay (shows the count as a large number) and BarDisplay (shows a filled progress bar scaled to the count). Both displays must read from the SAME state living in the parent. A single pair of +/- buttons controls the count.',
  hints: [
    'State lives ONLY in the parent (Challenge) — not inside NumberDisplay or BarDisplay',
    'Both display components receive count as a prop',
    'NumberDisplay just renders: <p style={{ fontSize: "3rem" }}>{count}</p>',
    'BarDisplay renders a bar: width = Math.min(count * 5, 100) + "%" (capped at 100%)',
    'The +/- buttons live in the parent and call setCount directly',
  ],
  acceptance: [
    'NumberDisplay and BarDisplay are defined as separate components',
    'Both receive count as a prop — neither has its own state',
    'Clicking + or - updates both displays simultaneously',
    'The bar width grows with the count and caps at 100%',
  ],
}

function NumberDisplay({ count }) {
  // This component is done — don't change it
  return (
    <p style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', margin: '0.5rem 0' }}>
      {count}
    </p>
  )
}

function BarDisplay({ count }) {
  // This component is done — don't change it
  const width = Math.min(count * 5, 100)
  return (
    <div style={{ background: '#1a1a1a', borderRadius: '4px', height: '16px', overflow: 'hidden', margin: '0.5rem 0' }}>
      <div style={{ width: `${width}%`, height: '100%', background: '#3b82f6', transition: 'width 0.2s' }} />
    </div>
  )
}

export default function Challenge() {
  // TODO: Add count state here and pass it to both display components

  return (
    <div style={{ maxWidth: '280px' }}>
      <NumberDisplay count={0} />
      <BarDisplay count={0} />
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1rem' }}>
        {/* TODO: wire up onClick on both buttons */}
        <button>-</button>
        <button>+</button>
      </div>
    </div>
  )
}
