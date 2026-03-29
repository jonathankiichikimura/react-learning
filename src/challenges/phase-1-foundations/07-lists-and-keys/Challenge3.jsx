import { useState } from 'react'

export const description = {
  title: 'Removing Items',
  concept: 'Array.filter() · Immutable deletion · Keys',
  task: 'Build a todo list with a delete button (×) on each item. Clicking × removes that item from the list. The deletion must be immutable — use .filter() to create a new array without the deleted item. Never mutate the existing array.',
  hints: [
    'Remove an item with: setTodos(todos.filter(t => t.id !== id))',
    '.filter() returns a NEW array — it never changes the original',
    'Pass the id to a handleDelete function: onClick={() => handleDelete(todo.id)}',
    'Place the × button inside the <li>, next to the text',
    'Use a flex container on the <li> to put text and button side by side',
  ],
  acceptance: [
    'Each todo item has a × button on the right',
    'Clicking × removes only that item',
    'The remaining items stay in the correct order',
    'The list re-renders immediately after deletion',
  ],
}

const initialTodos = [
  { id: 1, text: 'Buy groceries' },
  { id: 2, text: 'Walk the dog' },
  { id: 3, text: 'Write some code' },
  { id: 4, text: 'Read a book' },
]

export default function Challenge() {
  const [todos, setTodos] = useState(initialTodos)

  // TODO: Write a function to remove a todo by its id

  return (
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', maxWidth: '300px' }}>
      {todos.map(todo => (
        <li
          key={todo.id}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '6px', background: '#1a1a1a' }}
        >
          <span>{todo.text}</span>
          {/* TODO: Add a × delete button for this item */}
          <button>×</button>
        </li>
      ))}
    </ul>
  )
}
