import { useState } from 'react'

export const description = {
  title: 'useState',
  concept: 'State · Hooks · Re-rendering',
  task: 'Build a counter. It should display the current count and have two buttons: one to increment (+) and one to decrement (-). The count starts at 0 and updates instantly when clicked.',
  hints: [
    'Declare state at the top of the component: const [count, setCount] = useState(0)',
    'useState returns [currentValue, setterFunction] — destructure it with array destructuring',
    'Call the setter to update state: setCount(count + 1)',
    'React automatically re-renders the component whenever state changes',
    'Never mutate state directly (count++ won\'t work) — always use the setter',
  ],
  acceptance: [
    'The current count is visible on screen',
    'Clicking + increases the count by 1',
    'Clicking - decreases the count by 1',
    'The display updates immediately after each click',
  ],
}

export default function Challenge() {
  // TODO:
  // 1. Declare state: const [count, setCount] = useState(0)
  // 2. Replace the hardcoded "0" below with {count}
  // 3. Wire the + button: onClick={() => setCount(count + 1)}
  // 4. Wire the - button: onClick={() => setCount(count - 1)}
  const [count, setCount] = useState(0)

  return (
    <div>
      <p style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', margin: '1rem 0' }}>
        {count}
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  )
}
