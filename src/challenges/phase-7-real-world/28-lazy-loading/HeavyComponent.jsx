// This component simulates a "heavy" module — something you only want to load
// when the user actually needs it, rather than bundling it with the initial page load.

export default function HeavyComponent() {
  return (
    <div style={{ padding: '1.5rem', background: '#1a1a1a', borderRadius: '8px', marginTop: '1rem' }}>
      <h3>Heavy Component Loaded</h3>
      <p>In a real app, this might be a rich text editor, a chart library, or a complex form.</p>
      <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '0.5rem' }}>
        Because it was lazy-loaded, its code was only downloaded when the button was clicked.
      </p>
    </div>
  )
}
