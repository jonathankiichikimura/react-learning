export const description = {
  title: 'Reusable Stat Component',
  concept: 'Components · Reusability · Repetition without repetition',
  task: 'Build a Stat component that accepts label and value props, then renders it three times inside a StatsRow. The three stats should be: Repos (42), Followers (108), and Following (55). All three should appear side by side.',
  hints: [
    'Define Stat to accept props: function Stat({ label, value })',
    'Stat renders the value prominently and the label below it',
    'StatsRow renders three <Stat> components with different label/value pairs',
    'Use a flex container for side-by-side layout: style={{ display: "flex", gap: "1rem" }}',
  ],
  acceptance: [
    'A Stat component is defined that accepts label and value props',
    'Three Stat instances render with different data',
    'The stats appear side by side (not stacked)',
    'Repos: 42, Followers: 108, Following: 55',
  ],
}

// TODO: Define a Stat component that accepts label and value props
function Stat ({ label, value }) {
  return (
    <div className="card">
      <h1>{value}</h1>
      <p>{label}</p>
    </div>
  )
}

export default function Challenge() {
  // TODO: Render three <Stat> instances inside a flex container
  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Stat label="Repo" value={42}></Stat>
      <Stat label="Followers" value={108}></Stat>
      <Stat label="Following" value={55}></Stat>
    </div>
  )
}
