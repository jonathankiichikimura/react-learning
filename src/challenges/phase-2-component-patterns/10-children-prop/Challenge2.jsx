export const description = {
  title: 'Composable Button',
  concept: 'children · Composition · variant prop · Flexible components',
  task: 'Build a Button component that accepts children (for its label) and a variant prop ("primary" | "danger" | "ghost"). Apply different styles based on variant. Render five buttons with different children and variants to show the flexibility.',
  hints: [
    'Accept children alongside other props: function Button({ children, variant = "primary", onClick })',
    'Render children inside the button tag: <button onClick={onClick}>{children}</button>',
    'Use an object to look up styles per variant: const styles = { primary: {...}, danger: {...}, ghost: {...} }',
    'children can be text, an emoji, or mixed: <Button>💾 Save</Button>',
    'This is how most real design system buttons work',
  ],
  acceptance: [
    'A Button component is defined that renders its children',
    'Three visual variants exist: primary (blue), danger (red), ghost (transparent)',
    'At least five Button instances render with different children and variants',
    'The variant controls the visual style, not the content',
  ],
}

// TODO: Build a Button component that:
// - Accepts children, variant ("primary" | "danger" | "ghost"), and onClick props
// - Applies different styles per variant using an object lookup
// - Renders children as its label content

export default function Challenge() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
      {/* TODO: Render at least 5 Button instances with different children and variants */}
      <button>Default button</button>
    </div>
  )
}
