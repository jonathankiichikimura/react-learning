import { useState } from 'react'

export const description = {
  title: 'Conditional Children',
  concept: 'children · Wrapper components · Conditional rendering · fallback prop',
  task: 'Build a Gated component that wraps content with access control. It accepts isAllowed (boolean), children (rendered when allowed), and fallback (rendered when not allowed). Use it to build a premium content page: a toggle button simulates the subscription status. Subscribed users see two pieces of content; free users see two upgrade prompts.',
  hints: [
    'Gated is tiny: function Gated({ isAllowed, children, fallback }) { return isAllowed ? children : fallback }',
    'The fallback prop is also JSX: <Gated fallback={<p>Please upgrade</p>}>...</Gated>',
    'The toggle button controlling isSubscribed lives in Challenge — NOT inside Gated',
    'Both Gated blocks read the same isSubscribed state from the parent',
    'When children is a single element, no Fragment wrapper is needed',
  ],
  acceptance: [
    'A Gated component is defined with isAllowed, children, and fallback props',
    'When isAllowed is true, children renders',
    'When isAllowed is false, fallback renders',
    'A single toggle button controls both Gated blocks simultaneously',
    'Two Gated wrappers render — each with different content and different fallbacks',
  ],
}

// TODO: Build the Gated component
// function Gated({ isAllowed, children, fallback }) { ... }

export default function Challenge() {
  const [isSubscribed, setIsSubscribed] = useState(false)

  return (
    <div style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Toggle button */}
      <button
        onClick={() => setIsSubscribed(s => !s)}
        style={{
          background:  isSubscribed ? '#14532d' : '#2a2a2a',
          color:       isSubscribed ? '#4ade80' : '#ccc',
          borderColor: isSubscribed ? '#16a34a' : '#3a3a3a',
        }}
      >
        {isSubscribed ? '✓ Subscribed — click to unsubscribe' : 'Subscribe to unlock content'}
      </button>

      {/* TODO: First Gated block — premium article (show upgrade prompt when not subscribed) */}

      {/* TODO: Second Gated block — premium video (show upgrade prompt when not subscribed) */}
    </div>
  )
}
