export const description = {
  title: 'JSX as Props',
  concept: 'children · JSX as prop values · Named slots · Component composition',
  task: 'Build a Dialog component that accepts header, body, and footer as separate JSX props (not as children). The Dialog provides the wrapper card, internal layout, and dividers. The caller decides what goes in each slot. Render two Dialog instances with completely different content to prove the structure is reusable.',
  hints: [
    'Props can hold JSX just like strings or numbers: <Dialog header={<h2>Title</h2>} body={<p>...</p>} footer={<button>OK</button>} />',
    'Dialog receives and renders each slot: function Dialog({ header, body, footer })',
    'Render each in its zone: <div className="dialog-header">{header}</div>',
    'The calling component decides content; Dialog decides layout — clean separation',
    'This "named slot" pattern is how most design systems build modal/card components',
  ],
  acceptance: [
    'A Dialog component accepts header, body, and footer as JSX props',
    'Each slot renders in its designated location with visual separation (borders/padding)',
    'Two Dialog instances render with different JSX in every slot',
    'Dialog owns the card styling and layout; the parent owns the content',
  ],
}

// TODO: Build a Dialog component
// - Accepts header, body, and footer props (all JSX)
// - header zone: top section with a border-bottom
// - body zone: middle section with padding
// - footer zone: bottom section with border-top, content right-aligned

export default function Challenge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '320px' }}>
      {/* TODO: Render two Dialog instances — one for "Confirm Deletion" and one for "Success" */}
    </div>
  )
}
