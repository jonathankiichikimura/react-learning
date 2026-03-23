import { useReducer, useState } from 'react'

// ─── The custom hook ──────────────────────────────────────────────────────────

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':    return { todos: [...state.todos, { id: Date.now(), text: action.payload, done: false }] }
    case 'TOGGLE': return { todos: state.todos.map(t => t.id === action.payload ? { ...t, done: !t.done } : t) }
    case 'REMOVE': return { todos: state.todos.filter(t => t.id !== action.payload) }
    default:       return state
  }
}

function useTodos() {
  const [state, dispatch] = useReducer(reducer, { todos: [] })

  return {
    todos: state.todos,
    addTodo:    text => dispatch({ type: 'ADD',    payload: text }),
    toggleTodo: id   => dispatch({ type: 'TOGGLE', payload: id   }),
    removeTodo: id   => dispatch({ type: 'REMOVE', payload: id   }),
  }
}

// ─── The component (only JSX) ─────────────────────────────────────────────────

export default function Solution() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos()
  const [input, setInput] = useState('')

  function handleAdd() {
    if (!input.trim()) return
    addTodo(input.trim())
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
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ flex: 1, cursor: 'pointer', textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#555' : 'inherit' }}
            >
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
