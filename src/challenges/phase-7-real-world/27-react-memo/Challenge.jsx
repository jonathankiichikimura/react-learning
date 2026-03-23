import { useState, useRef, memo } from 'react'

export const description = {
  title: 'React.memo',
  concept: 'React.memo · Preventing unnecessary re-renders',
  task: 'A parent has two states: a counter and a name input. It renders an ExpensiveChild component. Without memo, ExpensiveChild re-renders on every keystroke in the name input — even though it only cares about the counter. Wrap it in React.memo to fix this.',
  hints: [
    'Wrap with memo: const ExpensiveChild = memo(function ExpensiveChild({ count }) { ... })',
    'memo does a shallow comparison of props — if props haven\'t changed, it skips the render',
    'A render counter ref inside ExpensiveChild makes the problem (and the fix) visible',
    'After adding memo: typing in the name input should NOT increment ExpensiveChild\'s render count',
    'The counter button SHOULD still cause ExpensiveChild to re-render (since count changes)',
    'memo is not free — only use it when you can measure a real benefit',
  ],
  acceptance: [
    'ExpensiveChild renders when the counter prop changes',
    'ExpensiveChild does NOT re-render when only the name input changes',
    'A render log or counter inside ExpensiveChild makes this visible',
  ],
}

// TODO: Wrap ExpensiveChild in memo() so it only re-renders when its props change

function ExpensiveChild({ count }) {
  const renders = useRef(0)
  renders.current += 1

  return (
    <div style={{ padding: '1rem', background: '#1a1a1a', borderRadius: '6px', marginTop: '1rem' }}>
      <p>Count prop: <strong>{count}</strong></p>
      <p style={{ color: '#888', fontSize: '0.8rem' }}>
        ExpensiveChild has rendered {renders.current} time{renders.current !== 1 ? 's' : ''}.
        (Without memo, this goes up on every keystroke.)
      </p>
    </div>
  )
}

export default function Challenge() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        <button onClick={() => setCount(c => c + 1)}>Counter: {count}</button>
        <input
          placeholder="Type here (unrelated state)..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <ExpensiveChild count={count} />
    </div>
  )
}
