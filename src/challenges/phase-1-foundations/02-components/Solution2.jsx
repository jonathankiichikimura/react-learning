function Avatar() {
  return <span style={{ fontSize: '3rem' }}>🧑‍💻</span>
}

function DisplayName() {
  return <h3>Jonathan Picard</h3>
}

function Bio() {
  return <p>Learning React one challenge at a time. Previously a JS developer.</p>
}

export default function Solution() {
  return (
    <div className="card">
      <Avatar />
      <DisplayName />
      <Bio />
    </div>
  )
}
