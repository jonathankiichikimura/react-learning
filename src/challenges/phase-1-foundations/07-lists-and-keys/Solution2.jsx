import { useState } from 'react'

const initialTasks = [
  { id: 1, text: 'Learn JSX', done: true },
  { id: 2, text: 'Understand components', done: true },
  { id: 3, text: 'Master props', done: false },
  { id: 4, text: 'Learn useState', done: false },
  { id: 5, text: 'Handle events', done: false },
]

export default function Solution() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all'
    ? tasks
    : tasks.filter(t => (filter === 'done' ? t.done : !t.done))

  function toggleDone(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const tabs = ['all', 'active', 'done']

  return (
    <div style={{ maxWidth: '340px' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            style={{
              textTransform: 'capitalize',
              background: filter === tab ? '#1a2f4a' : '#222',
              color: filter === tab ? '#60a5fa' : '#ddd',
              borderColor: filter === tab ? '#3b82f6' : '#3a3a3a',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {visible.map(task => (
          <li
            key={task.id}
            onClick={() => toggleDone(task.id)}
            style={{
              cursor: 'pointer',
              padding: '0.5rem 0.75rem',
              borderRadius: '6px',
              background: '#1a1a1a',
              textDecoration: task.done ? 'line-through' : 'none',
              color: task.done ? '#555' : '#ddd',
            }}
          >
            {task.done ? '✓ ' : '○ '}{task.text}
          </li>
        ))}
        {visible.length === 0 && (
          <li style={{ color: '#555', padding: '0.5rem 0' }}>No tasks here.</li>
        )}
      </ul>
    </div>
  )
}
