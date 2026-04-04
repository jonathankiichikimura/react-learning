const VARIANT_STYLES = {
  primary:   { background: '#3b82f6', color: '#fff', borderColor: '#2563eb' },
  secondary: { background: '#2a2a2a', color: '#ccc', borderColor: '#3a3a3a' },
  danger:    { background: '#ef4444', color: '#fff', borderColor: '#dc2626' },
}

const SIZE_STYLES = {
  sm: { padding: '0.25rem 0.6rem',  fontSize: '0.78rem' },
  md: { padding: '0.45rem 1rem',    fontSize: '0.9rem'  },
  lg: { padding: '0.65rem 1.4rem',  fontSize: '1rem'    },
}

const BASE_STYLE = {
  border: '1px solid',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 600,
}

function Button({ label, variant = 'primary', size = 'md' }) {
  return (
    <button style={{ ...BASE_STYLE, ...VARIANT_STYLES[variant], ...SIZE_STYLES[size] }}>
      {label}
    </button>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
      <Button label="Default" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Small Danger" variant="danger" size="sm" />
      <Button label="Large Primary" size="lg" />
    </div>
  )
}
