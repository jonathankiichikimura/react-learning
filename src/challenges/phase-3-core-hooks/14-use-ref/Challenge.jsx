import { useState, useRef } from 'react'

export const description = {
  title: 'useRef',
  concept: 'useRef · DOM access · Values without re-renders',
  task: 'Build a search box with two behaviors: (1) A "Focus" button that programmatically focuses the text input using a ref. (2) A render counter that tracks how many times the component has re-rendered — displayed via a "Check renders" button — without the counter itself causing extra re-renders.',
  hints: [
    'Create a ref for the input: const inputRef = useRef(null)',
    'Attach it: <input ref={inputRef} />',
    'Focus it: inputRef.current.focus()',
    'useRef also stores arbitrary mutable values: const renderCount = useRef(0)',
    'Incrementing a ref does NOT cause a re-render: renderCount.current += 1',
    'To display a ref value on demand, read it inside an event handler (not directly in JSX, since it won\'t update the display)',
    'Put renderCount.current += 1 directly in the component body (outside effects) to count every render',
  ],
  acceptance: [
    'Clicking "Focus Input" moves the cursor into the text input',
    'Typing in the search box triggers re-renders (each keystroke = one re-render)',
    'Clicking "Check Renders" shows the current render count via alert()',
    'The render counter itself does not add any extra re-renders',
  ],
}

export default function Challenge() {
  const [query, setQuery] = useState('')

  // TODO:
  // 1. Create a ref for the input element
  // 2. Create a ref to count renders (starts at 0)
  // 3. Increment the render count ref on every render (directly in the component body)
  // 4. Wire the "Focus Input" button to focus the input
  // 5. Wire the "Check Renders" button to alert the current render count

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '300px' }}>
      <input
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button>Focus Input</button>
        <button>Check Renders</button>
      </div>
    </div>
  )
}
