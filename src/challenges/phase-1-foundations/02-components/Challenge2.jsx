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

export default function Challenge() {
  return (
    <div className="card">
      {/* TODO: Render <Avatar />, <DisplayName />, and <Bio /> here */}
    </div>
  )
}
