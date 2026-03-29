import { useState } from 'react'

const initialTodos = [
  { id: 1, text: 'Buy groceries' },
  { id: 2, text: 'Walk the dog' },
  { id: 3, text: 'Write some code' },
  { id: 4, text: 'Read a book' },
]

export default function Solution() {
  const [todos, setTodos] = useState(initialTodos)

  function handleDelete(id) {
    setTodos(todos.filter(t => t.id !== id))
  }

  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: '300px' }}>
      {todos.map(todo => (
        <li
          key={todo.id}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '6px', background: '#1a1a1a' }}
        >
          <span>{todo.text}</span>
          <button
            onClick={() => handleDelete(todo.id)}
            style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '1rem', padding: '0 0.25rem' }}
          >
            ×
          </button>
        </li>
      ))}
      {todos.length === 0 && (
        <li style={{ color: '#555', padding: '0.5rem 0' }}>All done! 🎉</li>
      )}
    </ul>
  )
}
