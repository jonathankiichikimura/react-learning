export const description = {
  title: 'JSX as Values',
  concept: 'JSX · Variables · Expressions · JSX is JavaScript',
  task: 'Build a "Skill List" component that demonstrates JSX is just a JavaScript value. Store a checkmark icon in a variable (const checkIcon = <span>✓</span>) and reuse it before each skill. Also store the heading <h2>My Skills</h2> in a variable and render it from there. Map over the SKILLS array to produce the list — no copy-pasting the same <li> structure.',
  hints: [
    'JSX is a value like any other: const icon = <span style={{ color: "#4ade80" }}>✓</span>',
    'Define the variable above the return statement, then use it: {icon}',
    'You can also store a full element: const heading = <h2>My Skills</h2>',
    'Then render it: return (<div>{heading} ...</div>)',
    'This mental model — JSX as values — is the foundation of all React composition',
  ],
  acceptance: [
    'A checkIcon variable holds a JSX element and is used inside the list items',
    'A heading variable holds an <h2> element and is rendered at the top',
    'All five skills are rendered via .map() — no manually repeated <li> elements',
    'The icon is defined once and reused per item — not copy-pasted five times',
  ],
}

const SKILLS = ['React', 'JavaScript', 'CSS', 'HTML', 'Git']

export default function Challenge() {
  // TODO: Store a ✓ checkmark icon in a variable (green color)
  // TODO: Store the heading <h2>My Skills</h2> in a variable
  // Then use both inside the return below

  return (
    <div style={{ maxWidth: '240px' }}>
      {/* TODO: Render the heading variable */}
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {SKILLS.map(skill => (
          <li key={skill} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {/* TODO: Render the checkIcon variable, then {skill} */}
          </li>
        ))}
      </ul>
    </div>
  )
}
