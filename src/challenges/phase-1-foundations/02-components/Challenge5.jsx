export const description = {
  title: 'Three Different Cards',
  concept: 'Components · Hardcoded data · Component reuse · Motivation for props',
  task: 'Build a TeamPage that displays three team members using three separate hardcoded components: AliceCard, BobCard, and CarolCard. Each card shows a name, role, and emoji avatar. Write all three card components from scratch — they have identical structure but different content. Notice the repetition: that\'s the exact problem that props (next section) will solve.',
  hints: [
    'Each card is a separate function: function AliceCard() { return (...) }',
    'All three share the same card structure: emoji avatar, name as <h3>, role as <p>',
    'TeamPage just renders the three cards: <AliceCard />, <BobCard />, <CarolCard />',
    'Define all three at module scope — not inside TeamPage',
    'Use a card container with padding, background, and borderRadius for a clean look',
  ],
  acceptance: [
    'AliceCard, BobCard, and CarolCard are defined as separate function components',
    'Each component renders an emoji, a name, and a role — all hardcoded',
    'TeamPage renders all three cards',
    'All three components are defined at module scope — not inside TeamPage',
  ],
}

// TODO: Define AliceCard, BobCard, and CarolCard as separate component functions
// Alice: 🧑‍💻 · Alice Chen · Frontend Engineer
// Bob:   🧑‍🔬 · Bob Marsh · Data Scientist
// Carol: 🧑‍🎨 · Carol Wu  · UX Designer
// Each card: emoji, <h3> name, <p> role — use className="card" for the wrapper

export default function Challenge() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', maxWidth: '480px' }}>
      {/* TODO: Render <AliceCard />, <BobCard />, <CarolCard /> */}
    </div>
  )
}
