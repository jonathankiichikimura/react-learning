function Panel({ title, children }) {
  return (
    <div style={{
      border: '1px solid #2a2a2a',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '0.6rem 1rem',
        background: '#1a1a1a',
        borderBottom: '1px solid #2a2a2a',
        fontWeight: 600,
        fontSize: '0.9rem',
      }}>
        {title}
      </div>
      <div style={{ padding: '1rem' }}>
        {children}
      </div>
    </div>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <Panel title="Welcome">
        <p>This is a panel wrapping a paragraph.</p>
      </Panel>

      <Panel title="Stats">
        <ul>
          <li>Challenges completed: 10</li>
          <li>Current phase: 2</li>
        </ul>
      </Panel>

      <Panel title="Actions">
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </Panel>
    </div>
  )
}
