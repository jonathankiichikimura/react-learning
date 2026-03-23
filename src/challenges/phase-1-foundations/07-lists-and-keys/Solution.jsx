import { useState } from 'react'

const initialTodos = [
  { id: 1, text: 'Learn React basics' },
  { id: 2, text: 'Build a counter' },
  { id: 3, text: 'Understand props' },
]

export default function Solution() {
  const [todos, setTodos] = useState(initialTodos)
  const [input, setInput] = useState('')

  function handleAdd() {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input.trim() }])
    setInput('')
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="New todo..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  )
}
