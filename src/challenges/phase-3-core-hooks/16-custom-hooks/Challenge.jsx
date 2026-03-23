import { useReducer, useState } from 'react'

export const description = {
  title: 'Custom Hooks',
  concept: 'Custom hooks · Reusable logic · Separation of concerns',
  task: 'Extract all the todo logic from challenge 15 into a custom hook called useTodos. The hook should return { todos, addTodo, toggleTodo, removeTodo }. The Challenge component should contain only JSX — no reducer or dispatch calls visible in it.',
  hints: [
    'A custom hook is just a function whose name starts with "use": function useTodos() { ... }',
    'Move the reducer, initialState, and useReducer call inside useTodos',
    'Return the data and action functions: return { todos: state.todos, addTodo, toggleTodo, removeTodo }',
    'In the component: const { todos, addTodo, toggleTodo, removeTodo } = useTodos()',
    'The component now has zero knowledge of useReducer — it just calls functions',
    'Custom hooks can live in their own file (e.g. hooks/useTodos.js) — keeping components clean',
  ],
  acceptance: [
    'A useTodos hook is defined (in this file or imported)',
    'useTodos contains all reducer/dispatch logic',
    'The Challenge component calls useTodos() and contains only JSX',
    'All todo functionality still works: add, toggle, remove',
  ],
}

// TODO:
// 1. Define useTodos() here — move all the reducer logic into it
//    Return: { todos, addTodo, toggleTodo, removeTodo }
//
// 2. In Challenge, replace all the state logic with:
//    const { todos, addTodo, toggleTodo, removeTodo } = useTodos()

export default function Challenge() {
  // This component should only contain UI code after you're done.
  // For now, copy in the reducer solution from challenge 15 as a starting point,
  // then extract the logic into useTodos above.

  return (
    <div>
      <p style={{ color: '#666' }}>Implement useTodos and wire it up here.</p>
    </div>
  )
}
