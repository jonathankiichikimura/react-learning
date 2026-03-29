export const description = {
  title: 'JSX Expressions',
  concept: 'JSX · {} expressions · JavaScript in markup',
  task: 'Build a "Stats Card" that uses curly braces {} to embed JavaScript expressions directly in JSX. Display: (1) the result of 6 * 7, (2) a string transformed with .toUpperCase(), and (3) a sentence built with a template literal using two variables.',
  hints: [
    'Any JavaScript expression goes inside {}: numbers, strings, calculations, method calls',
    'Define your variables above the return: const language = "react"',
    'Template literals work inside {}: {`I am learning ${language}`}',
    'You cannot use statements (if, for) inside {} — only expressions that produce a value',
  ],
  acceptance: [
    'Shows the result of 6 * 7 (42)',
    'Shows a string in ALL CAPS using .toUpperCase()',
    'Shows a sentence built from a template literal with at least one variable',
    'No hardcoded "42" — the number comes from the expression',
  ],
}

export default function Challenge() {
  const language = 'react'
  const author = 'jonathan'

  return (
    <div className="card">
      {/* TODO: Embed a math result in a paragraph */}
      {/* TODO: Render the author variable transformed to uppercase */}
      {/* TODO: Render a sentence built from a template literal */}
    </div>
  )
}
