function UserCard({ name, role, emoji }) {
  return (
    <div className="card">
      <span style={{ fontSize: '3rem' }}>{emoji}</span>
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <UserCard name="Alice" role="Frontend Engineer" emoji="👩‍💻" />
      <UserCard name="Bob"   role="Backend Engineer"  emoji="🧑‍💻" />
      <UserCard name="Carol" role="Designer"          emoji="👩‍🎨" />
    </div>
  )
}
