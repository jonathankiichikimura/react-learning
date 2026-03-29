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
  // 1. Add a state variable for the count
  // 2. Display the count value instead of the hardcoded "0"
  // 3. Wire up both buttons to update the count

  return (
    <div>
      <p style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', margin: '1rem 0' }}>
        0
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button>-</button>
        <button>+</button>
      </div>
    </div>
  )
}
