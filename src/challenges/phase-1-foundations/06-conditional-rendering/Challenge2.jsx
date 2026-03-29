import { useState } from 'react'

export const description = {
  title: 'The && Operator',
  concept: 'Conditional rendering · && · Truthy/falsy · Show or nothing',
  task: 'Show a notification banner only when there are unread messages. Start with 3 unread. Include a "Mark all read" button that sets the count to 0, hiding the banner. The banner should show the count: "You have 3 unread messages."',
  hints: [
    'Use && to conditionally show the banner: {count > 0 && <Banner />}',
    'NEVER write {count && <Banner />} — if count is 0, React renders "0" on the page!',
    'Always use a boolean expression: {count > 0 && ...} or {Boolean(count) && ...}',
    'The banner only renders when count > 0; when count is 0, && short-circuits and nothing renders',
  ],
  acceptance: [
    'Starts with a visible banner showing "You have 3 unread messages"',
    'Clicking "Mark all read" hides the banner completely',
    'The banner is hidden when count is 0 — no empty space or placeholder',
    'The && expression uses count > 0 (not just count) to avoid rendering "0"',
  ],
}

export default function Challenge() {
  const [count, setCount] = useState(3)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '340px' }}>
      {/* TODO: Only show the banner when there are unread messages */}
      <div style={{
        background: '#1e3a5f',
        border: '1px solid #3b82f6',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        color: '#93c5fd',
      }}>
        You have {count} unread messages.
      </div>

      <button onClick={() => setCount(0)}>Mark all read</button>
    </div>
  )
}
