# 05 — Event Handling

Events are how your UI reacts to the user. Clicks, key presses, form submissions, mouse movement — all of these are events. React gives you a clean, consistent way to listen for them.

---

## 1. Events in React vs the DOM

In vanilla JavaScript you write:

```js
document.getElementById('btn').addEventListener('click', handleClick)
```

In React you attach the handler directly in JSX using a prop:

```jsx
<button onClick={handleClick}>Click me</button>
```

Key differences:

| Vanilla DOM | React |
|---|---|
| `addEventListener('click', ...)` | `onClick={...}` |
| `'click'` (lowercase string) | `onClick` (camelCase prop) |
| Must find the element first | Attached inline in JSX |
| Must remember to `removeEventListener` | React cleans up automatically |

React wraps every browser event in a **SyntheticEvent** — a cross-browser wrapper that normalizes differences between browsers. For your purposes, it behaves exactly like a native DOM event. You rarely need to think about this, but it explains why React events work the same way in Chrome, Firefox, and Safari.

**camelCase is required.** React will silently ignore `onclick` or `onkeydown` — they must be `onClick` and `onKeyDown`.

---

## 2. The Golden Rule: Pass a Function, Don't Call It

This is the most common beginner mistake. Read it carefully.

**Wrong — calls the function immediately on every render:**

```jsx
<button onClick={handleClick()}>Click me</button>
//                          ^^
//                  These parentheses call it NOW
```

When React renders this component, it sees `handleClick()` and runs it right away — not when the user clicks. If `handleClick` updates state, this triggers another render, which calls it again, causing an infinite loop.

**Right — passes the function as a reference:**

```jsx
<button onClick={handleClick}>Click me</button>
//                ^^^^^^^^^^
//          No parentheses — just the reference
```

React stores `handleClick` and calls it *later*, when the user actually clicks. Think of it like giving someone your phone number vs calling them immediately.

The same rule applies to inline arrow functions:

```jsx
// Wrong: calls setCount() on every render
<button onClick={setCount(count + 1)}>+</button>

// Right: wraps it, so it only runs on click
<button onClick={() => setCount(count + 1)}>+</button>
```

---

## 3. Named Handlers vs Inline Handlers

You have two ways to write a handler.

**Named handler** — defined outside the JSX return:

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)
  }

  return <button onClick={handleClick}>Count: {count}</button>
}
```

**Inline arrow function** — written directly in the JSX:

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

**When to use each:**

| Named handler | Inline arrow function |
|---|---|
| Logic is more than one line | One-liner that fits comfortably |
| You reuse the same handler in multiple places | Handler is only used once |
| You want to unit test the handler | Quick prototype or simple interaction |
| The function name communicates intent clearly | The intent is obvious from context |

Both are valid. Inline functions create a new function object on every render, but this is never a real performance problem unless you are dealing with thousands of items in a list. Don't over-optimize — use whichever is more readable.

---

## 4. The Event Object

When an event fires, React automatically passes an **event object** as the first argument to your handler. You can name it anything, but `e` or `event` are conventional.

```jsx
function handleClick(e) {
  console.log(e) // SyntheticEvent object
}

<button onClick={handleClick}>Click me</button>
```

### Most useful properties

**`e.target`** — the DOM element that triggered the event:

```jsx
function handleClick(e) {
  console.log(e.target)         // <button>Click me</button>
  console.log(e.target.tagName) // "BUTTON"
}
```

**`e.target.value`** — the current value of an input field (only on input/select/textarea):

```jsx
function handleChange(e) {
  setName(e.target.value) // whatever the user typed
}

<input onChange={handleChange} />
```

**`e.key`** — the name of the keyboard key that was pressed:

```jsx
function handleKeyDown(e) {
  console.log(e.key) // "a", "A", "Enter", "Backspace", "ArrowLeft", " ", etc.

  if (e.key === 'Enter') {
    submitForm()
  }
}

<input onKeyDown={handleKeyDown} />
```

**`e.preventDefault()`** — stops the browser's default behavior for the event. Most commonly used on form submissions to prevent a page reload:

```jsx
function handleSubmit(e) {
  e.preventDefault() // without this, the page would refresh
  // now handle the form data yourself
}

<form onSubmit={handleSubmit}>...</form>
```

**`e.stopPropagation()`** — stops the event from bubbling up to parent elements. Useful when you have a clickable parent and a clickable child:

```jsx
function Card() {
  return (
    <div onClick={() => console.log('card clicked')}>
      <button onClick={e => {
        e.stopPropagation() // prevents "card clicked" from also firing
        console.log('button clicked')
      }}>
        Click me
      </button>
    </div>
  )
}
```

---

## 5. Common Event Types

| Event | Element | When it fires |
|---|---|---|
| `onClick` | Any | User clicks (or taps on mobile) |
| `onChange` | `<input>`, `<select>`, `<textarea>` | Value changes (fires on every keystroke for text inputs) |
| `onSubmit` | `<form>` | Form is submitted (button click or Enter key) |
| `onKeyDown` | Any focusable element | Key is pressed down (fires for every key including non-printable: Shift, Enter, Backspace, Arrow keys) |
| `onKeyUp` | Any focusable element | Key is released |
| `onFocus` | Any focusable element | Element receives focus (tab or click) |
| `onBlur` | Any focusable element | Element loses focus |
| `onMouseEnter` | Any | Mouse cursor enters the element's area |
| `onMouseLeave` | Any | Mouse cursor leaves the element's area |
| `onMouseMove` | Any | Mouse moves within the element |
| `onScroll` | Scrollable elements | Element is scrolled |
| `onDragStart` | Draggable elements | User starts dragging |
| `onDrop` | Drop targets | User drops a dragged item |

For text inputs, `onChange` is the one you will use most often. It fires on every single keystroke, giving you the current value via `e.target.value`.

---

## 6. Passing Arguments to Handlers

Sometimes you need to pass extra information to a handler — for example, which item in a list was clicked.

**The pattern: wrap with an arrow function**

```jsx
function handleDelete(id) {
  setTodos(todos.filter(t => t.id !== id))
}

// In a list:
{todos.map(todo => (
  <li key={todo.id}>
    {todo.text}
    <button onClick={() => handleDelete(todo.id)}>Delete</button>
  </li>
))}
```

The arrow function `() => handleDelete(todo.id)` captures `todo.id` from the current iteration. When the user clicks, the arrow function runs, which calls `handleDelete` with the correct id.

**Why you cannot skip the arrow function wrapper:**

```jsx
// Wrong — calls handleDelete(todo.id) immediately during render
<button onClick={handleDelete(todo.id)}>Delete</button>

// Right — stores the arrow function, calls it on click
<button onClick={() => handleDelete(todo.id)}>Delete</button>
```

This is the same golden rule from section 2 — you must pass a function reference, not a function call.

**Multiple arguments work the same way:**

```jsx
function handleAction(id, action) {
  // ...
}

<button onClick={() => handleAction(item.id, 'archive')}>Archive</button>
```

---

## 7. Common Mistakes

**Mistake 1: Calling the function instead of passing it**

```jsx
// Wrong — handleClick runs on every render, not on click
<button onClick={handleClick()}>

// Right
<button onClick={handleClick}>
```

**Mistake 2: Using addEventListener instead of JSX props**

```jsx
// Wrong — this is vanilla JS, not the React way
useEffect(() => {
  document.getElementById('btn').addEventListener('click', handleClick)
}, [])

// Right — attach it in JSX
<button onClick={handleClick}>Click me</button>
```

Only reach for `addEventListener` in special cases (e.g., listening for keyboard shortcuts on `window`). For element events, always use JSX props.

**Mistake 3: Forgetting `e.preventDefault()` on form submit**

```jsx
// Wrong — page reloads on submit, losing all state
function handleSubmit(e) {
  saveData()
}

// Right
function handleSubmit(e) {
  e.preventDefault() // must come first, before any async operations
  saveData()
}
```

**Mistake 4: Confusing `onChange` with vanilla JavaScript's `onchange`**

In vanilla JavaScript, `onchange` fires only when an input loses focus (blur). In React, `onChange` fires on every single keystroke. This is intentional — React's `onChange` actually behaves like the DOM's `oninput`. Always use `onChange` for controlled inputs in React; it does what you expect.

**Mistake 5: Using `onKeyPress` (deprecated)**

`onKeyPress` is deprecated and does not fire for non-printable keys (Escape, Arrow keys, Delete, etc.). Use `onKeyDown` instead — it fires for every key.

**Mistake 6: Forgetting that `e.target.value` is always a string**

```jsx
function handleChange(e) {
  // e.target.value is ALWAYS a string — even for type="number" inputs
  const value = Number(e.target.value) // convert explicitly when you need a number
  setAge(value)
}

<input type="number" onChange={handleChange} />
```

**Mistake 7: Mutating state inside an event handler**

```jsx
// Wrong — mutates the array directly, React may not re-render
function handleAdd() {
  items.push(newItem)
  setItems(items)
}

// Right — create a new array
function handleAdd() {
  setItems([...items, newItem])
}
```
