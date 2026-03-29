import { useState } from 'react'

export const description = {
  title: 'Accordion',
  concept: 'children · Internal state · Wrapper components · Toggle',
  task: 'Build an Accordion component that accepts a title prop and children. Clicking the title header toggles the children visible or hidden. The open/closed state lives INSIDE Accordion — it manages itself. Render three Accordions with different content to prove they open and close independently.',
  hints: [
    'Accordion owns its own isOpen state: const [isOpen, setIsOpen] = useState(false)',
    'Toggle on header click: onClick={() => setIsOpen(!isOpen)}',
    'Conditionally render children: {isOpen && <div>{children}</div>}',
    'Each Accordion instance has completely independent isOpen state',
    'Use a ▶ / ▼ indicator in the header to signal open/closed',
  ],
  acceptance: [
    'An Accordion component is defined accepting title and children props',
    'Clicking the header toggles the content open and closed',
    'Three Accordions render with independent state (opening one does not close others)',
    'A visual indicator (▶ or ▼) shows the current open/closed state',
  ],
}

// TODO: Build an Accordion component
// - Accepts title and children props
// - Manages its own isOpen state internally
// - Clicking the title header toggles isOpen
// - Renders children only when isOpen is true
// - Shows ▶ when closed, ▼ when open

export default function Challenge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '360px' }}>
      {/* TODO: Render three Accordion components with different content inside each */}
    </div>
  )
}
