const SKILLS = ['React', 'JavaScript', 'CSS', 'HTML', 'Git']

export default function Solution() {
  const checkIcon = <span style={{ color: '#4ade80', fontWeight: 'bold' }}>✓</span>
  const heading = <h2 style={{ marginBottom: '0.75rem' }}>My Skills</h2>

  return (
    <div style={{ maxWidth: '240px' }}>
      {heading}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {SKILLS.map(skill => (
          <li key={skill} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {checkIcon}
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
