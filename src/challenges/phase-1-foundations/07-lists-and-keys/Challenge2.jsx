import { useState } from 'react'

export const description = {
  title: 'Filtering Lists',
  concept: 'Array.filter() · Array.map() · Derived state · Active filters',
  task: 'Render a list of tasks. Each task has an id, text, and done boolean. Add three filter tabs: "All", "Active" (not done), and "Done". Clicking a task toggles its done state. The displayed list updates based on the selected filter.',
  hints: [
    'Store the full list in state — never a filtered version. Derive the filtered list for display.',
    'Filter tabs just update a "filter" state: useState("all")',
    'Derive the visible list: const visible = filter === "all" ? tasks : tasks.filter(t => ...)',
    'Toggle done with an immutable update: setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))',
    'A done task can show strikethrough: style={{ textDecoration: t.done ? "line-through" : "none" }}',
  ],
  acceptance: [
    '"All" tab shows every task',
    '"Active" tab shows only tasks where done is false',
    '"Done" tab shows only tasks where done is true',
    'Clicking a task toggles its done state',
    'The filter tabs update the list immediately',
  ],
}

const initialTasks = [
  { id: 1, text: 'Learn JSX', done: true },
  { id: 2, text: 'Understand components', done: true },
  { id: 3, text: 'Master props', done: false },
  { id: 4, text: 'Learn useState', done: false },
  { id: 5, text: 'Handle events', done: false },
]

export default function Challenge() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')

  // TODO: Derive the visible list based on filter
  const visible = tasks // replace this

  // TODO: Add a toggleDone function

  return (
    <div style={{ maxWidth: '340px' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {/* TODO: Render filter tab buttons for "all", "active", "done" */}
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('done')}>Done</button>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {visible.map(task => (
          <li
            key={task.id}
            style={{ cursor: 'pointer', padding: '0.4rem 0' }}
            // TODO: add onClick to toggle this task's done state
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
