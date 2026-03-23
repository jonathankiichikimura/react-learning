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
// 1. Update UserCard to accept { name, role, emoji } as props
// 2. Use those props in the JSX instead of hardcoded values
// 3. Render three different UserCards below with different prop values

function UserCard() {
  // Add { name, role, emoji } to the parameter list above
  return (
    <div className="card">
      <span style={{ fontSize: '3rem' }}>🧑‍💻</span>
      <h3>Jonathan</h3>
      <p>React Learner</p>
    </div>
  )
}

export default function Challenge() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      {/* Render three UserCards here, each with different name/role/emoji props */}
      <UserCard />
    </div>
  )
}
