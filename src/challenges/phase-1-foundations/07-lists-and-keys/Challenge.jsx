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
  // 1. Create state for todos: const [todos, setTodos] = useState(initialTodos)
  // 2. Create state for the input: const [input, setInput] = useState("")
  // 3. Render todos with .map() — don't forget the key prop!
  // 4. Wire the input's onChange to update input state
  // 5. Wire the "Add" button to append a new todo and clear the input

  return (
    <div>
      <ul>
        {/* Replace this with a .map() over your todos state */}
        {initialTodos.map(todo => (
          <li>{todo.text}</li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <input placeholder="New todo..." />
        <button>Add</button>
      </div>
    </div>
  )
}
