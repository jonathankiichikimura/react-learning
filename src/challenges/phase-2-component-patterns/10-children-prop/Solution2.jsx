const variantStyles = {
  primary: {
    background: '#1a2f4a',
    color: '#60a5fa',
    border: '1px solid #3b82f6',
  },
  danger: {
    background: '#3b0a0a',
    color: '#f87171',
    border: '1px solid #7f1d1d',
  },
  ghost: {
    background: 'transparent',
    color: '#aaa',
    border: '1px solid #3a3a3a',
  },
}

function Button({ children, variant = 'primary', onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.4rem 0.9rem',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        ...variantStyles[variant],
      }}
    >
      {children}
    </button>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
      <Button variant="primary">Save</Button>
      <Button variant="primary">💾 Save Draft</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="danger">🗑 Remove Account</Button>
      <Button variant="ghost">Cancel</Button>
    </div>
  )
}
