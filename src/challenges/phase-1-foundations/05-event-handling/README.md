# 05 — Event Handling

## Attaching event handlers

In React, events are attached as JSX props using camelCase names:

```jsx
<button onClick={handleClick}>Click</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>
<div onMouseEnter={handleHover}>
```

## The most important rule: pass a function, don't call it

This trips up almost every beginner:

```jsx
// ❌ WRONG — handleClick() runs immediately during render, before any click
<button onClick={handleClick()}>

// ✅ CORRECT — passes the function; React calls it when clicked
<button onClick={handleClick}>

// ✅ CORRECT — arrow function wrapping a call
<button onClick={() => handleClick()}>
```

The `()` are the difference between **"here is a function"** and **"run this function right now."**

`onClick` expects to *receive* a function so it can call it later. When you write `handleClick()`, you're passing the *return value* of calling it (usually `undefined`) — not the function itself.

## Inline handlers vs named handlers

Both are valid. Use whichever fits the complexity:

```jsx
// Inline — good for simple, one-line logic
<button onClick={() => setCount(count + 1)}>+</button>

// Named — better for anything with multiple lines
function handleSubmit(e) {
  e.preventDefault()
  validateForm()
  submitToAPI()
}
<form onSubmit={handleSubmit}>
```

## The event object

React passes a **synthetic event** to your handler — it wraps the native browser event and normalizes it across browsers. It works identically to the native event:

```jsx
function handleChange(e) {
  console.log(e.target.value)     // the input's current text
  console.log(e.target.checked)   // for checkboxes
}

function handleSubmit(e) {
  e.preventDefault()   // stop the browser from reloading the page
  e.stopPropagation()  // stop the event from bubbling up to parent elements
}

function handleKeyDown(e) {
  if (e.key === 'Enter') doSomething()
}
```

## Common events

| Prop | Fires when |
|------|-----------|
| `onClick` | Element is clicked |
| `onChange` | Input value changes (fires on every keystroke) |
| `onSubmit` | Form is submitted |
| `onKeyDown` | A key is pressed down |
| `onFocus` / `onBlur` | Element gains / loses focus |
| `onMouseEnter` / `onMouseLeave` | Mouse enters / leaves element |

## Passing extra arguments

When you need to pass extra data to a handler (e.g. an item ID in a list), use an arrow function:

```jsx
function handleDelete(id) {
  setItems(items.filter(item => item.id !== id))
}

// In JSX:
<button onClick={() => handleDelete(item.id)}>Delete</button>
```

## Common mistakes

- `onClick={setCount(count + 1)}` instead of `onClick={() => setCount(count + 1)}` — the former calls setCount immediately every render
- Forgetting `e.preventDefault()` on form submit — the page reloads and clears all state
