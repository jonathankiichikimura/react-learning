export const description = {
  title: 'The children Prop',
  concept: 'children · Composition · Wrapper components',
  task: 'Build a reusable Panel component that acts as a styled container. It accepts a title prop (shown as a header) and renders whatever JSX is placed between its tags as children. Then use Panel to wrap three different pieces of content to prove it works with anything.',
  hints: [
    'Every React component automatically receives a special children prop',
    'Accept it in the function: function Panel({ title, children })',
    'Render it in the JSX: <div className="panel-body">{children}</div>',
    'Use it as a wrapper: <Panel title="Stats"><p>Some content here</p></Panel>',
    'children can be anything — text, elements, or other components',
  ],
  acceptance: [
    'A Panel component is defined that accepts title and children props',
    'Panel renders a visible title header and its children inside a styled box',
    'Challenge renders at least three Panels wrapping different types of content',
    'The Panel itself has no knowledge of what its children are',
  ],
}

// TODO:
// 1. Define a Panel component that accepts { title, children }
//    - Render a header with the title
//    - Render {children} below it
//    - Give it some border/padding styling
//
// 2. Use <Panel title="...">...</Panel> three times below with different content inside

export default function Challenge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Use Panel here three times with different content */}
    </div>
  )
}
