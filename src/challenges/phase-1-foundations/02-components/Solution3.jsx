function Stat({ label, value }) {
  return (
    <div className="card">
      <span style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{value}</span>
      <p>{label}</p>
    </div>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Stat label="Repos" value={42} />
      <Stat label="Followers" value={108} />
      <Stat label="Following" value={55} />
    </div>
  )
}
