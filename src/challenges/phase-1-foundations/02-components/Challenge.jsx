export const description = {
  title: 'Your First Component',
  concept: 'Components · Composition · className',
  task: 'Define a UserCard component that displays an avatar emoji, a name, and a role. Then render it inside the Challenge component. The card already has styles — use className="card" on its wrapper div.',
  hints: [
    'Define a new function above Challenge: function UserCard() { return (...) }',
    'Use className="card" on the outer div to get the built-in card styles',
    'Render the component inside Challenge like an HTML tag: <UserCard />',
    'Components must start with a capital letter — <userCard /> would not work',
    'Put an emoji inside a <span> with a large font size using style={{ fontSize: "3rem" }}',
  ],
  acceptance: [
    'A UserCard component is defined separately from Challenge',
    'The card shows an emoji avatar, a name, and a role',
    'Challenge renders <UserCard /> in its JSX',
    'The card uses the built-in .card styles (has a border, rounded corners)',
  ],
}

// TODO:
// 1. Define a UserCard component here (above or below Challenge — both work)
//    It should return a <div className="card"> containing:
//      - A <span> with an emoji and a large font size
//      - An <h3> with a name
//      - A <p> with a role/title
//
// 2. Render <UserCard /> inside the Challenge return below
function UserCard() {
  return (
    <div className="card">
      <span style={{ fontSize: "3rem"}}>😁</span>
      <h3>Jon</h3>
      <p>Software Engineer</p>
    </div>
  )
}

export default function Challenge() {
  return (
    <div>
      <UserCard></UserCard>
    </div>
  )
}
