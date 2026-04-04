# JSX — Writing HTML in JavaScript

JSX is the syntax you write in React components. It looks like HTML but it lives inside JavaScript files. This guide covers everything you need to know to use it confidently.

---

## 1. What is JSX?

JSX is **syntactic sugar** — a shorthand syntax that a build tool (Babel, or Vite's esbuild) compiles into plain JavaScript before the browser ever sees it.

When you write:

```jsx
const element = <h1 className="title">Hello, world!</h1>
```

The compiler transforms it into:

```js
const element = React.createElement('h1', { className: 'title' }, 'Hello, world!')
```

`React.createElement` returns a plain JavaScript object (a "React element") that describes what should appear on screen:

```js
{
  type: 'h1',
  props: {
    className: 'title',
    children: 'Hello, world!'
  }
}
```

React reads that object and updates the DOM accordingly. **JSX is just a nicer way to write those function calls.**

---

## 2. JSX is Just a Function Call — The Mental Model

Think of every JSX tag as a function call that returns a description of the UI. The tag name becomes the first argument, the attributes become an object (the "props"), and the children become the third argument onward.

```jsx
// What you write:
<Button color="blue" size="large">
  Click me
</Button>

// What it compiles to:
React.createElement(Button, { color: 'blue', size: 'large' }, 'Click me')
```

This mental model explains many JSX rules:
- Why you need a single root (a function can only return one thing)
- Why attributes use camelCase (they become JavaScript object keys)
- Why you use `{}` for dynamic values (you're inside a JS function call)

---

## 3. Embedding JavaScript with `{}`

Curly braces let you drop out of JSX and back into JavaScript. Anything that is a **JavaScript expression** (something that evaluates to a value) can go inside `{}`.

### Arithmetic

```jsx
<p>The answer is {6 * 7}</p>
{/* Renders: The answer is 42 */}
```

### String methods

```jsx
const name = 'jonathan'
<p>Hello, {name.toUpperCase()}</p>
{/* Renders: Hello, JONATHAN */}
```

### Ternary (inline if/else)

```jsx
const isLoggedIn = true
<p>{isLoggedIn ? 'Welcome back!' : 'Please sign in'}</p>
```

### Template literals

```jsx
const language = 'react'
const version = 19
<p>{`Learning ${language} v${version}`}</p>
{/* Renders: Learning react v19 */}
```

### Calling a function

```jsx
function formatDate(date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

<p>Today is {formatDate(new Date())}</p>
```

### Array length and property access

```jsx
const items = ['apple', 'banana', 'cherry']
<p>You have {items.length} items in your cart.</p>
```

### What you CANNOT put inside `{}`

Statements do not produce a value, so they cannot go inside `{}`:

```jsx
{/* WRONG — if is a statement, not an expression */}
<p>{if (isLoggedIn) { 'Welcome' }}</p>

{/* WRONG — for loops are statements */}
<p>{for (let i = 0; i < 3; i++) { i }}</p>

{/* RIGHT — use a ternary instead of if/else */}
<p>{isLoggedIn ? 'Welcome' : 'Sign in'}</p>

{/* RIGHT — use .map() instead of a for loop */}
<ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
```

---

## 4. Rules You Must Follow

### Rule 1 — Single Root Element

Every component must return **exactly one** root element. Multiple siblings at the top level is a syntax error.

```jsx
// WRONG — two roots
function BadComponent() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  )
}

// RIGHT — wrapped in a div
function GoodComponent() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  )
}

// RIGHT — wrapped in a Fragment (no extra DOM node)
function AlsoGood() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  )
}
```

### Rule 2 — `className`, not `class`

`class` is a reserved word in JavaScript. JSX uses `className` instead.

```jsx
// WRONG
<div class="card">...</div>

// RIGHT
<div className="card">...</div>
```

### Rule 3 — Self-closing tags

In HTML, `<img>`, `<input>`, `<br>` etc. don't need closing tags. In JSX, **all tags must be closed**, either with a closing tag or by self-closing with `/>`.

```jsx
// WRONG — unclosed tags
<img src="photo.jpg">
<input type="text">

// RIGHT
<img src="photo.jpg" />
<input type="text" />
```

### Rule 4 — camelCase attribute names

HTML attributes that contain hyphens or are reserved words become camelCase in JSX:

| HTML           | JSX              |
|----------------|------------------|
| `class`        | `className`      |
| `for`          | `htmlFor`        |
| `tabindex`     | `tabIndex`       |
| `onclick`      | `onClick`        |
| `onchange`     | `onChange`       |
| `stroke-width` | `strokeWidth`    |

```jsx
// HTML
<label for="email" class="label">Email</label>
<input tabindex="1" />

// JSX
<label htmlFor="email" className="label">Email</label>
<input tabIndex={1} />
```

---

## 5. Fragments

### Why they exist

React requires a single root, but sometimes you don't want an extra `<div>` in the DOM — it can break CSS layouts like flex/grid where the extra node disrupts spacing.

**Without Fragment** (adds an unwanted div to the DOM):

```jsx
function NavItems() {
  return (
    <div>   {/* this div breaks the flex layout of the parent nav */}
      <a href="/">Home</a>
      <a href="/about">About</a>
    </div>
  )
}
```

**With Fragment** (no extra DOM node):

```jsx
function NavItems() {
  return (
    <>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </>
  )
}
```

### Shorthand vs. Named Fragment

```jsx
// Shorthand — most common, use this by default
<>
  <Child />
  <Child />
</>

// Named — required when you need to pass a key prop (e.g., in a list)
import { Fragment } from 'react'

items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
))
```

### When to use a Fragment

- When a component returns multiple sibling elements
- When you're mapping a list where each item renders multiple DOM nodes
- When adding a wrapper `<div>` would break your CSS layout

---

## 6. Null, Undefined, and Booleans

JSX silently renders **nothing** for these values:

```jsx
// All of these render nothing — no DOM node, no text, no error
<>{null}</>
<>{undefined}</>
<>{false}</>
<>{true}</>
```

This is useful for conditional rendering:

```jsx
const isAdmin = true

// If isAdmin is false, nothing is rendered — no error
<div>
  {isAdmin && <button>Delete user</button>}
</div>
```

### The `0` Gotcha

`0` is a **falsy** value but JSX renders it as the character `"0"`. This is a very common bug:

```jsx
const count = 0

// BUG: renders the number "0" on screen, not nothing
{count && <p>You have {count} items</p>}

// FIX: use a boolean condition so the falsy branch is false, not 0
{count > 0 && <p>You have {count} items</p>}

// ALSO FINE: use a ternary so that null is the falsy branch
{count ? <p>You have {count} items</p> : null}
```

---

## 7. Common Mistakes

### Mistake 1 — Using `class` instead of `className`

```jsx
// WRONG
<div class="container">...</div>

// RIGHT
<div className="container">...</div>
```

### Mistake 2 — Using a statement inside `{}`

```jsx
// WRONG — if is a statement
<p>{if (isAdmin) 'Admin'}</p>

// RIGHT — ternary is an expression
<p>{isAdmin ? 'Admin' : 'User'}</p>
```

### Mistake 3 — Forgetting to close tags

```jsx
// WRONG
<input type="text">
<br>

// RIGHT
<input type="text" />
<br />
```

### Mistake 4 — Two root elements

```jsx
// WRONG — multiple roots
function Profile() {
  return (
    <h2>Name</h2>
    <p>Bio</p>
  )
}

// RIGHT — wrap in a Fragment
function Profile() {
  return (
    <>
      <h2>Name</h2>
      <p>Bio</p>
    </>
  )
}
```

### Mistake 5 — The `0` gotcha with `&&`

```jsx
const items = []

// WRONG — renders "0" when array is empty
{items.length && <List items={items} />}

// RIGHT — renders nothing when array is empty
{items.length > 0 && <List items={items} />}
```

### Mistake 6 — Inline styles are objects, not strings

```jsx
// WRONG — inline styles in JSX are not CSS strings
<div style="color: red; font-size: 16px">Text</div>

// RIGHT — inline styles are JavaScript objects with camelCase keys
<div style={{ color: 'red', fontSize: '16px' }}>Text</div>
```

The outer `{}` embeds a JS expression. The inner `{}` is the object literal.

### Mistake 7 — Using `for` instead of `htmlFor` on labels

```jsx
// WRONG — "for" is a reserved keyword in JS
<label for="email">Email</label>

// RIGHT
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

---

## Inline styles in depth

In JSX, the `style` prop accepts a **JavaScript object**, not a CSS string. This opens up patterns that CSS strings can't match.

### The double-brace syntax explained

```jsx
<div style={{ color: 'red', fontSize: '16px' }}>Hello</div>
```

- The **outer** `{}` is the JSX expression delimiter — it means "evaluate JavaScript here"
- The **inner** `{}` is the object literal

It's exactly the same as:

```jsx
const styles = { color: 'red', fontSize: '16px' }
<div style={styles}>Hello</div>
```

### CamelCase property names

All CSS properties that contain a hyphen become camelCase in JS:

| CSS property | JSX style key |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `margin-top` | `marginTop` |
| `z-index` | `zIndex` |
| `flex-direction` | `flexDirection` |

Vendor-prefixed properties also capitalize the prefix letter: `WebkitTransform`, `MozBoxSizing`.

### Pixel values

Numbers without units are treated as `px` for most properties:

```jsx
<div style={{ fontSize: 16, padding: 8, borderRadius: 4 }}>
  // fontSize becomes "16px", padding becomes "8px", etc.
</div>
```

For properties like `opacity`, `zIndex`, `flex`, and `lineHeight`, numbers remain unit-less:

```jsx
<div style={{ opacity: 0.5, zIndex: 10, flex: 1 }}>
```

### Computing styles dynamically

Because `style` is just a JS object, you can build it with any JS logic:

```jsx
// Conditional style
<div style={{ color: isError ? 'red' : 'green' }}>Status</div>

// Style from state
<div style={{ opacity: isDisabled ? 0.4 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer' }}>
```

### Style lookup maps

A common pattern: define a map of variant → style object, then look up the right one:

```jsx
const PRIORITY_COLORS = {
  low:    { background: '#1a3a1a', color: '#4ade80' },
  medium: { background: '#3a2a1a', color: '#fb923c' },
  high:   { background: '#3a1a1a', color: '#f87171' },
}

function Tag({ priority, label }) {
  return (
    <span style={{ ...PRIORITY_COLORS[priority], padding: '2px 8px', borderRadius: '12px' }}>
      {label}
    </span>
  )
}

// Usage:
<Tag priority="high" label="Urgent" />
<Tag priority="low"  label="Someday" />
```

This avoids a chain of if/else or ternaries — just look up the right object and spread it.

### Merging style objects with spread

```jsx
const base  = { padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }
const primary = { ...base, background: '#3b82f6', color: '#fff' }
const danger  = { ...base, background: '#ef4444', color: '#fff' }
```

Later properties override earlier ones, so spreading `base` first and adding variant styles after gives you clean inheritance.

---

## JSX as values

JSX expressions are first-class JavaScript values. You can assign them to variables, put them in arrays, pass them as arguments, and return them from functions — just like numbers or strings.

### Storing JSX in a variable

```jsx
const icon = <span aria-hidden="true">★</span>

function Rating({ score }) {
  return (
    <div>
      {icon} {score}/5
    </div>
  )
}
```

`icon` is assigned once and reused wherever you need it in the same scope.

### Conditional JSX assignment

```jsx
function StatusBadge({ status }) {
  let badge

  if (status === 'active') {
    badge = <span style={{ color: '#4ade80' }}>● Active</span>
  } else if (status === 'pending') {
    badge = <span style={{ color: '#fb923c' }}>◐ Pending</span>
  } else {
    badge = <span style={{ color: '#999' }}>○ Inactive</span>
  }

  return <div className="card">{badge}</div>
}
```

This is useful when the choice between three or more options is too complex for a ternary. Assign the right JSX to a variable, then render it in one place.

### JSX in arrays

```jsx
const actions = [
  <button key="edit"   onClick={onEdit}>Edit</button>,
  <button key="copy"   onClick={onCopy}>Copy</button>,
  <button key="delete" onClick={onDelete}>Delete</button>,
]

return <div className="toolbar">{actions}</div>
```

Arrays of JSX need `key` props on each element, just like `.map()` output.

### JSX returned from a helper function

```jsx
function renderStars(count) {
  return Array.from({ length: count }, (_, i) => (
    <span key={i} style={{ color: '#facc15' }}>★</span>
  ))
}

function ProductCard({ rating }) {
  return (
    <div>
      <div>{renderStars(rating)}</div>
      <p>{rating}/5</p>
    </div>
  )
}
```

This is a helper function — not a component (no capitalized name, not rendered as `<RenderStars />`). It's just a function that returns JSX.

### The key rule: JSX evaluates to a React element object

Under the hood, `<span>Hello</span>` compiles to `React.createElement('span', null, 'Hello')` — a plain JS object. That's why you can store it in a variable: you're just storing an object, not triggering any rendering. Rendering only happens when React processes the return value of your component.
