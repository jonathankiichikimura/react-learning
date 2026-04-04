const PRIORITY_COLORS = {
  high:   '#f87171',
  medium: '#fb923c',
  low:    '#4ade80',
}

const badgeStyle = (level) => ({
  backgroundColor: PRIORITY_COLORS[level],
  padding: '0.25rem 0.75rem',
  borderRadius: '999px',
  fontWeight: 600,
  color: '#111',
  fontSize: '0.8rem',
  textTransform: 'capitalize',
})

export default function Solution() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <span style={badgeStyle('high')}>high</span>
      <span style={badgeStyle('medium')}>medium</span>
      <span style={badgeStyle('low')}>low</span>
    </div>
  )
}
