import { useReducer, useState } from 'react'

export const description = {
  title: 'useReducer',
  concept: 'useReducer · Actions · Reducer pattern',
  task: 'Rebuild the todo list using useReducer instead of useState. The reducer should handle three action types: ADD_TODO, TOGGLE_TODO (checks/unchecks), and REMOVE_TODO. Completed todos should have a strikethrough style.',
  hints: [
    'useReducer takes a reducer function and initial state: const [state, dispatch] = useReducer(reducer, { todos: [] })',
    'A reducer: function reducer(state, action) { switch (action.type) { case "ADD_TODO": ... } }',
    'Dispatch an action: dispatch({ type: "ADD_TODO", payload: inputText })',
    'Never mutate state — return new objects: return { ...state, todos: [...state.todos, newTodo] }',
    'For TOGGLE: todos.map(t => t.id === action.payload ? { ...t, done: !t.done } : t)',
    'For REMOVE: todos.filter(t => t.id !== action.payload)',
    'useReducer shines when multiple actions affect the same state — it centralizes the logic',
  ],
  acceptance: [
    'Todos can be added via an input and button',
    'Clicking a todo toggles its done state',
    'Done todos have a strikethrough',
    'Each todo has a remove button',
    'All state changes go through dispatch — no useState for the list',
  ],
}

function reducer(state, action) {
  switch (action.type) {
    // TODO: Handle ADD_TODO, TOGGLE_TODO, REMOVE_TODO
    default:
      return state
  }
}

const initialState = { todos: [] }

export default function Challenge() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [input, setInput] = useState('')

  function handleAdd() {
    if (!input.trim()) return
    // TODO: dispatch ADD_TODO with the input text as payload
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
              onClick={() => {/* TODO: dispatch TOGGLE_TODO */}}
              style={{
                flex: 1,
                cursor: 'pointer',
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#555' : 'inherit',
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => {/* TODO: dispatch REMOVE_TODO */}}>×</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
