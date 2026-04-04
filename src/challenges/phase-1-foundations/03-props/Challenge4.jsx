export const description = {
  title: 'Default Props',
  concept: 'Props · Default parameters · Optional props · Prop patterns',
  task: 'Build a Button component where label is required, but variant ("primary" | "secondary" | "danger") and size ("sm" | "md" | "lg") are optional and default to "primary" and "md". Render four buttons demonstrating the defaults: one with no optional props, one with only variant, one with only size, and one with all three explicitly set.',
  hints: [
    'Default props use JavaScript default parameters: function Button({ label, variant = "primary", size = "md" })',
    'Build a lookup for each option: const VARIANT_STYLES = { primary: {...}, secondary: {...}, danger: {...} }',
    'Merge the styles: style={{ ...BASE_STYLE, ...VARIANT_STYLES[variant], ...SIZE_STYLES[size] }}',
    'Call with all defaults: <Button label="Click me" /> — variant and size use their defaults',
    'Call with overrides: <Button label="Delete" variant="danger" size="lg" />',
  ],
  acceptance: [
    'Button accepts label (required), variant (optional, defaults to "primary"), size (optional, defaults to "md")',
    'Four buttons render, each demonstrating a different prop combination',
    'A button with no variant prop is visually identical to one with variant="primary"',
    'The "danger" variant is visually distinct (red background)',
    'Size differences are visible — "sm" is noticeably smaller than "lg"',
  ],
}

// TODO: Build a Button component with these props:
//   label    — required string shown as button text
//   variant  — optional "primary" | "secondary" | "danger", defaults to "primary"
//   size     — optional "sm" | "md" | "lg", defaults to "md"
// Hint: use a VARIANT_STYLES and SIZE_STYLES lookup object, then merge them with spread

export default function Challenge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
      {/* TODO: Render four Button instances:
            1. <Button label="Default" />                        — uses all defaults
            2. <Button label="Secondary" variant="secondary" />
            3. <Button label="Small Danger" variant="danger" size="sm" />
            4. <Button label="Large Primary" size="lg" /> */}
    </div>
  )
}
