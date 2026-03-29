import { useState } from 'react'

export const description = {
  title: 'Lists & Keys',
  concept: 'Array.map() · key prop · Dynamic lists',
  task: 'Render a todo list from an array using .map(). Then wire up the input and "Add" button so the user can append new todos. The input should clear after adding.',
  hints: [
    'Use .map() to turn the array into JSX: todos.map(todo => <li key={todo.id}>{todo.text}</li>)',
    'Every mapped element needs a unique key prop — React uses it to track items efficiently',
    'Keep todos in state: const [todos, setTodos] = useState(initialTodos)',
    'Keep the input value in state: const [input, setInput] = useState("")',
    'Sync the input: <input value={input} onChange={e => setInput(e.target.value)} />',
    'Append a new item: setTodos([...todos, { id: Date.now(), text: input.trim() }])',
    'Clear the input after adding: setInput("")',
  ],
  acceptance: [
    'The three initial todos render on screen',
    'Each todo is rendered with .map() — not hardcoded <li> tags',
    'Typing in the input and clicking "Add" appends a new todo',
    'The input field clears after adding',
    'No console warning about missing "key" props',
  ],
}

const initialTodos = [
  { id: 1, text: 'Learn React basics' },
  { id: 2, text: 'Build a counter' },
  { id: 3, text: 'Understand props' },
]

export default function Challenge() {
  // TODO:
  // 1. Add state for the todo list and the current input value
  // 2. Render the list dynamically — don't forget the key prop
  // 3. Wire up the input to track what the user is typing
  // 4. Wire up the button to add new todos and clear the input

  return (
    <div>
      <ul>
        {/* TODO: Replace this with todos.map(...) */}
        <li>Item one</li>
        <li>Item two</li>
        <li>Item three</li>
      </ul>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <input placeholder="New todo..." />
        <button>Add</button>
      </div>
    </div>
  )
}
