import { MemoryRouter, Routes, Route, Link, useParams } from 'react-router-dom'

const members = [
  { id: 1, name: 'Alice Chen',   role: 'Frontend Engineer', bio: 'Loves React and accessibility.' },
  { id: 2, name: 'Bob Martinez', role: 'Backend Engineer',  bio: 'Node.js and databases.' },
  { id: 3, name: 'Carol Smith',  role: 'Designer',          bio: 'Figma expert, design systems.' },
  { id: 4, name: 'David Park',   role: 'DevOps',            bio: 'Kubernetes and CI/CD pipelines.' },
  { id: 5, name: 'Eva Johnson',  role: 'Product Manager',   bio: 'Shipping features users love.' },
]

function MemberList() {
  return (
    <div>
      <h2>Team</h2>
      <ul>
        {members.map(m => (
          <li key={m.id}>
            <Link to={`/members/${m.id}`}>{m.name}</Link>
            {' '}— {m.role}
          </li>
        ))}
      </ul>
    </div>
  )
}

function MemberDetail() {
  const { id } = useParams()
  const member = members.find(m => m.id === Number(id))

  if (!member) return <p>Member not found. <Link to="/">Back</Link></p>

  return (
    <div>
      <Link to="/">← Back to team</Link>
      <h2 style={{ marginTop: '1rem' }}>{member.name}</h2>
      <p style={{ color: '#888' }}>{member.role}</p>
      <p style={{ marginTop: '0.5rem' }}>{member.bio}</p>
    </div>
  )
}

export default function Solution() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/"            element={<MemberList />}   />
        <Route path="/members/:id" element={<MemberDetail />} />
      </Routes>
    </MemoryRouter>
  )
}
