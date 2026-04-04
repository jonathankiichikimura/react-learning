export const description = {
  title: 'Inline Styles',
  concept: 'JSX · style attribute · Style objects · camelCase CSS properties',
  task: 'Build a "Priority Badges" display that renders three <span> elements — "high", "medium", and "low" — each with a distinct background color applied via an inline style object. The PRIORITY_COLORS lookup is already provided. Use it so the color is computed, not hardcoded three separate times.',
  hints: [
    'The style attribute takes a JavaScript object: style={{ backgroundColor: "#f87171" }}',
    'CSS property names are camelCase: background-color → backgroundColor, font-size → fontSize, border-radius → borderRadius',
    'You can compute the style object before or inside JSX: style={{ backgroundColor: PRIORITY_COLORS.high }}',
    'style="color: red" (string syntax) will not work in JSX — it must be an object',
    'Separate the text color from the background: color: "#111" makes the label readable on the colored background',
  ],
  acceptance: [
    'Three badges render — "high", "medium", and "low"',
    'Each badge has the correct background color from PRIORITY_COLORS',
    'Styles are applied as inline JS objects — no className or external CSS for colors',
    'Badges have padding and borderRadius that make them look like pills',
    'The text on each badge is readable (dark contrasting color)',
  ],
}

const PRIORITY_COLORS = {
  high:   '#f87171',
  medium: '#fb923c',
  low:    '#4ade80',
}

export default function Challenge() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      {/* TODO: Render a <span> for 'high' with backgroundColor: PRIORITY_COLORS.high */}
      {/* TODO: Render a <span> for 'medium' with backgroundColor: PRIORITY_COLORS.medium */}
      {/* TODO: Render a <span> for 'low' with backgroundColor: PRIORITY_COLORS.low */}
      {/* Add padding: '0.25rem 0.75rem', borderRadius: '999px', fontWeight: 600, color: '#111' to each */}
    </div>
  )
}
