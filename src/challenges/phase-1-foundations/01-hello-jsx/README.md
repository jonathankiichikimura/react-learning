# 01 — Hello JSX

## What is JSX?

JSX is a syntax extension that lets you write HTML-like markup directly inside JavaScript. It *looks* like HTML, but it isn't — under the hood, every JSX element compiles to a plain JavaScript function call.

```jsx
// What you write:
const element = <h1 className="title">Hello</h1>

// What it compiles to:
const element = React.createElement('h1', { className: 'title' }, 'Hello')
```

Vite handles this compilation automatically. You never write `React.createElement` by hand.

## The core mental model: UI as a function

A React component is a **function that returns a description of what should appear on screen**. React calls that function, compares the output to the previous output, and updates only the parts of the real DOM that changed.

```jsx
function Greeting() {
  return <h1>Hello, React!</h1>
}
```

That's it. No classes, no templates, no magic. Just a function.

## Key JSX rules

**1. Return a single root element**

JSX must have one outer wrapper. Use a `<div>`, or a **fragment** `<>...</>` if you don't want an extra DOM node:

```jsx
// ❌ Two roots — syntax error
return <h1>Title</h1><p>Subtitle</p>

// ✅ Wrapped in a div
return <div><h1>Title</h1><p>Subtitle</p></div>

// ✅ Fragment — no extra node in the DOM
return <><h1>Title</h1><p>Subtitle</p></>
```

**2. `className` not `class`**

`class` is a reserved word in JavaScript. JSX uses `className` instead:

```jsx
<div className="card">...</div>
```

**3. Embed JavaScript with curly braces**

Anything inside `{}` is a JavaScript expression:

```jsx
const name = 'React'
const year = 2024
return <p>Hello {name}, it's {year}.</p>
```

**4. Self-close elements with no children**

```jsx
<input />
<img src="..." alt="..." />
<br />
```

## Common mistakes

- Forgetting to wrap multiple elements → "Adjacent JSX elements must be wrapped"
- Using `class` instead of `className` → the attribute silently does nothing
- Trying to use `if` statements inside JSX (use ternaries or `&&` instead — covered in challenge 06)

## How this fits into React

This challenge is the entry point. Every React skill you build — components, state, effects — is expressed in JSX. Getting comfortable with it first makes everything else easier.
