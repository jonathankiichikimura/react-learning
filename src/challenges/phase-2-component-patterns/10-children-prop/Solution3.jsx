import { useState } from 'react'

function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{ border: '1px solid #2a2a2a', borderRadius: '8px', overflow: 'hidden' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 1rem',
          background: '#1a1a1a',
          border: 'none',
          color: '#ddd',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 600,
          textAlign: 'left',
        }}
      >
        {title}
        <span style={{ fontSize: '0.7rem', color: '#666' }}>{isOpen ? '▼' : '▶'}</span>
      </button>
      {isOpen && (
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #2a2a2a', color: '#aaa', fontSize: '0.9rem' }}>
          {children}
        </div>
      )}
    </div>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '360px' }}>
      <Accordion title="What is React?">
        <p>React is a JavaScript library for building user interfaces. It uses a component-based architecture and a virtual DOM for efficient updates.</p>
      </Accordion>

      <Accordion title="Why use components?">
        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
          <li>Reusability — write once, use anywhere</li>
          <li>Isolation — bugs stay contained</li>
          <li>Composability — build complex UIs from simple pieces</li>
        </ul>
      </Accordion>

      <Accordion title="What is the children prop?">
        <p>
          The <code style={{ background: '#2a2a2a', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>children</code> prop
          is whatever JSX you place between a component's opening and closing tags. It lets you build
          wrapper components that don't need to know what's inside them.
        </p>
      </Accordion>
    </div>
  )
}
