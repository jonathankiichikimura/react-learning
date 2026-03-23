import { MemoryRouter, Routes, Route, Link, useParams } from 'react-router-dom'

export const description = {
  title: 'URL Params',
  concept: 'useParams · Dynamic routes · :id segments',
  task: 'Build a team directory. The list page shows 5 team members. Clicking a member navigates to /members/:id where their full profile (name, role, bio) is displayed. Use useParams to read the :id from the URL.',
  hints: [
    'Dynamic route segment: <Route path="/members/:id" element={<MemberDetail />} />',
    'Read the param: const { id } = useParams()',
    'Find the member: const member = members.find(m => m.id === Number(id))',
    'Link to a detail page: <Link to={`/members/${m.id}`}>{m.name}</Link>',
    'Always handle the "not found" case: if (!member) return <p>Not found</p>',
  ],
  acceptance: [
    'A list of 5 members renders on the home page',
    'Each member name is a link to /members/:id',
    'Clicking a link shows that member\'s detail page',
    'The detail page reads :id via useParams',
    'A "Back" link returns to the list',
  ],
}

const members = [
  { id: 1, name: 'Alice Chen',    role: 'Frontend Engineer', bio: 'Loves React and accessibility.' },
  { id: 2, name: 'Bob Martinez',  role: 'Backend Engineer',  bio: 'Node.js and databases.' },
  { id: 3, name: 'Carol Smith',   role: 'Designer',          bio: 'Figma expert, design systems.' },
  { id: 4, name: 'David Park',    role: 'DevOps',            bio: 'Kubernetes and CI/CD pipelines.' },
  { id: 5, name: 'Eva Johnson',   role: 'Product Manager',   bio: 'Shipping features users love.' },
]

function MemberList() {
  // TODO: Render a list where each member name is a <Link to={`/members/${m.id}`}>
  return <div><h2>Team</h2><p>Add member links here.</p></div>
}

function MemberDetail() {
  // TODO: Use useParams to get the id, find the member, render their profile
  return <div><p>Member detail here.</p></div>
}

export default function Challenge() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/"            element={<MemberList />}   />
        <Route path="/members/:id" element={<MemberDetail />} />
      </Routes>
    </MemoryRouter>
  )
}
