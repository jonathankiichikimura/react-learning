export const description = {
  title: 'Hello JSX',
  concept: 'JSX · Components',
  task: 'Create a component that renders a greeting. It should display an <h1> with the text "Hello, React!" and a <p> tag that says "I am learning React from scratch."',
  hints: [
    'A React component is just a JavaScript function that returns JSX',
    'JSX looks like HTML, but it lives inside JavaScript',
    'A component must return a single root element — wrap siblings in a <div> or an empty <> fragment',
    'Use className instead of class when adding CSS classes in JSX',
  ],
  acceptance: [
    'An <h1> appears with the text "Hello, React!"',
    'A <p> appears with "I am learning React from scratch."',
    'No red errors appear in the browser',
  ],
}

export default function Challenge() {
  // TODO: Return JSX below.
  //
  // A component is a function that returns what should appear on screen.
  // JSX looks almost identical to HTML. Try returning a <div> that contains
  // an <h1> and a <p>.
  //
  // Example of JSX:
  //   return (
  //     <div>
  //       <h1>Some heading</h1>
  //     </div>
  //   )

  return (
    <div>
      <h1>Hello!</h1>
      <p>I am learing React from scratch.</p>
    </div>
  )
}
