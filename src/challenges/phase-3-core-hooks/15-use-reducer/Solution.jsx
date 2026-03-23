import { useReducer, useState } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        todos: [...state.todos, { id: Date.now(), text: action.payload, done: false }],
      }
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, done: !t.done } : t
        ),
      }
    case 'REMOVE_TODO':
      return {
        todos: state.todos.filter(t => t.id !== action.payload),
      }
    default:
      return state
  }
}

const initialState = { todos: [] }

export default function Solution() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [input, setInput] = useState('')

  function handleAdd() {
    if (!input.trim()) return
    dispatch({ type: 'ADD_TODO', payload: input.trim() })
    setInput('')
  }

  return (
    <div style={{ maxWidth: '360px' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="New todo..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {state.todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span
              onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
              style={{
                flex: 1,
                cursor: 'pointer',
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#555' : 'inherit',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'REMOVE_TODO', payload: todo.id })}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
