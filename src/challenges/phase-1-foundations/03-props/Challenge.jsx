export const description = {
  title: 'Props',
  concept: 'Props · Data flow · Reusability',
  task: 'Update UserCard so it accepts name, role, and emoji as props instead of having them hardcoded. Then render three different UserCards with different data to prove it\'s reusable.',
  hints: [
    'Pass props like HTML attributes: <UserCard name="Alice" role="Engineer" emoji="👩‍💻" />',
    'Receive props in the component: function UserCard({ name, role, emoji }) { ... }',
    'Embed a prop value in JSX with curly braces: <h3>{name}</h3>',
    'Props flow one way — from parent to child. UserCard cannot change its own props.',
  ],
  acceptance: [
    'UserCard accepts name, role, and emoji as props (not hardcoded)',
    'Three <UserCard /> instances render with different data',
    'Changing props on one card does not affect the others',
  ],
}

// TODO:
// 1. Update UserCard to accept name, role, and emoji as props
// 2. Replace the hardcoded values with the props
// 3. Render three different <UserCard /> instances below with different data

function UserCard() {
  // TODO: Accept props here
  return (
    <div className="card">
      <span style={{ fontSize: '3rem' }}>🙂</span>
      <h3>Name goes here</h3>
      <p>Role goes here</p>
    </div>
  )
}

export default function Challenge() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {/* TODO: Render three <UserCard /> instances with different props */}
    </div>
  )
}
