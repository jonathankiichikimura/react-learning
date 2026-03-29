export const description = {
  title: 'Component Composition',
  concept: 'Components · Composition · Component tree',
  task: 'Build a ProfilePage composed of three smaller components: Avatar (shows a large emoji), DisplayName (shows an <h3> with a name), and Bio (shows a <p> with a short bio). Compose them all inside ProfilePage — each is its own function.',
  hints: [
    'Define each sub-component as its own function ABOVE ProfilePage',
    'Avatar just renders: <span style={{ fontSize: "3rem" }}>🧑‍💻</span>',
    'DisplayName renders: <h3>Your Name</h3>',
    'Bio renders: <p>A short bio about yourself.</p>',
    'ProfilePage renders all three: <Avatar /> <DisplayName /> <Bio />',
  ],
  acceptance: [
    'Avatar, DisplayName, and Bio are each defined as separate functions',
    'ProfilePage renders all three components',
    'The emoji, name, and bio are all visible on screen',
    'No single giant function — each piece is its own component',
  ],
}

// TODO: Define Avatar, DisplayName, and Bio components here
function Avatar({emoji}) {
  return (
    <span style={{ fontSize: "3rem"}}>{emoji}</span>
  )
}

function DisplayName ({name}) {
  return (
    <h3>{name}</h3>
  )
}

function Bio () {
  return (
    <p>Some description is here but I'm lazy</p>
  )
}

export default function Challenge() {
  // TODO: Render Avatar, DisplayName, and Bio inside a div
  const name = "Jon"
  return (
    <div className="card">
      <Avatar emoji="💻"></Avatar>
      <DisplayName name={name}></DisplayName>
      <Bio></Bio>
    </div>
  )
}
