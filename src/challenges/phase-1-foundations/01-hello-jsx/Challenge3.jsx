export const description = {
  title: 'Fragments & className',
  concept: 'JSX · Fragment · className · multiple roots',
  task: 'Render TWO sibling <section> elements without wrapping them in a <div>. Use a React Fragment (<> </>) as the root. Each section should use className="card" and show different content (a title + description).',
  hints: [
    'A Fragment lets you return multiple elements without adding a DOM node to the page',
    'Syntax: <> ... </> — the shorthand for <Fragment> ... </Fragment>',
    'Use className="card" (not class="card") — JSX uses camelCase attribute names',
    'Each <section> is a direct child of the fragment, not nested in a div',
  ],
  acceptance: [
    'Two cards render on screen',
    'The root element is a Fragment <> — no extra wrapping <div>',
    'Both sections use className="card"',
    'Each section displays a different heading and description',
  ],
}

export default function Challenge() {
  // TODO: Replace the <div> wrapper with a Fragment (<>)
  // and render two <section className="card"> elements inside it
  return (
    <>
      <section className="card">
        <h3>Card One</h3>
        <p>Replace the outer div with a Fragment</p>
      </section>
      <section className="card">
        <h3>Card Two</h3>
        <p>This is the second card</p>
      </section>
    </>
  )
}
