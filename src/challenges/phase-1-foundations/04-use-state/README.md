# useState — Making Components Remember Things

State is how React components remember information between renders. Without state, your components are static — they display what they receive and nothing more. With state, they can respond to user input, change over time, and feel alive.

---

## 1. Why State? Regular Variables Do Not Work

Here is the most important thing to understand before anything else. This counter looks like it should work:

```jsx
function Counter() {
  let count = 0                           // regular variable

  function handleClick() {
    count = count + 1                     // increment it
    console.log('count is now:', count)   // this logs correctly!
  }

  return (
    <div>
      <p>{count}</p>                      {/* always shows 0 */}
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
```

Click the button. The console shows `count is now: 1`, then `count is now: 2`. The variable is changing. But the screen always shows `0`.

**Why?** Two reasons:

1. Changing `count` does not tell React anything changed — React has no way to know it needs to re-render.
2. Even if React did re-render, `count = 0` at the top of the function would reset it back to `0` on every render.

`useState` solves both problems. It gives you a value that **persists between renders** and a setter that **schedules a re-render** when called.

---

## 2. useState Syntax

```jsx
import { useState } from 'react'

const [value, setValue] = useState(initialValue)
```

| Part | Meaning |
|------|---------|
| `value` | The current state value for this render |
| `setValue` | A function that updates state and triggers a re-render |
| `initialValue` | Used only on the **first** render. Ignored on subsequent renders. |

The array destructuring is just a naming convention. You can name the pair anything:

```jsx
const [count, setCount] = useState(0)
const [name, setName] = useState('')
const [isOpen, setIsOpen] = useState(false)
const [items, setItems] = useState([])
const [user, setUser] = useState(null)
```

The naming convention is `[thing, setThing]` — always prefix the setter with `set`.

### The fixed counter

```jsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  function handleClick() {
    setCount(count + 1)   // update state AND schedule a re-render
  }

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>+1</button>
    </div>
  )
}
```

Now clicking the button calls `setCount`, React schedules a re-render, the function runs again, and this time `useState(0)` returns `1` (not `0`), so the screen shows `1`.

---

## 3. The Re-render Cycle

Understanding exactly what happens when you call a state setter is crucial.

```
Step 1: First render
  → React calls Counter()
  → useState(0) → returns [0, setCount]
  → JSX renders: <p>0</p>

Step 2: User clicks the button
  → handleClick() runs
  → setCount(1) is called

Step 3: React schedules a re-render
  → React puts Counter on the "needs re-render" list
  → (React may batch multiple updates together)

Step 4: React re-renders Counter
  → React calls Counter() again from the top
  → useState(0) → React ignores the 0, returns [1, setCount]
  → JSX renders: <p>1</p>

Step 5: React commits to the DOM
  → Only the parts that changed are updated
  → Screen now shows 1
```

Key insight: **your component function runs from scratch every time**. State is not a variable inside the function — it is memory that React keeps separate and hands back to you each render via `useState`.

---

## 4. Multiple State Variables

You can call `useState` multiple times. Each call tracks a completely separate piece of state.

```jsx
function ProfileForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState(0)
  const [isSubscribed, setIsSubscribed] = useState(false)

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={age} onChange={e => setAge(Number(e.target.value))} type="number" />
      <label>
        <input
          type="checkbox"
          checked={isSubscribed}
          onChange={e => setIsSubscribed(e.target.checked)}
        />
        Subscribe to newsletter
      </label>
    </form>
  )
}
```

### When to use separate vs. grouped state

Use **separate state variables** when the values are independent — changing one does not logically imply changing the other.

Use **one state object** when values are related and usually change together:

```jsx
// Separate — fine because these are independent
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)

// Grouped — better because they represent one entity
const [position, setPosition] = useState({ x: 0, y: 0 })
// When x changes, y is part of the same update
```

---

## 5. Object State

When state is an object, you must create a new object when updating — never mutate the existing one.

```jsx
const [profile, setProfile] = useState({
  name: '',
  bio: '',
  location: '',
})
```

### Updating one field — use the spread operator

```jsx
// Update just the name, preserve bio and location
setProfile({ ...profile, name: 'Alice' })

// Update just the bio, preserve name and location
setProfile({ ...profile, bio: 'Frontend developer.' })
```

The spread `...profile` copies all existing fields first. Then you override the one field you want to change. React sees a new object reference and re-renders.

### Dynamic field name — use a computed property key

```jsx
function handleChange(field, value) {
  setProfile({ ...profile, [field]: value })
}

// Usage:
handleChange('name', 'Alice')      // same as: setProfile({ ...profile, name: 'Alice' })
handleChange('location', 'Paris')  // same as: setProfile({ ...profile, location: 'Paris' })
```

### What NOT to do

```jsx
// WRONG — mutating state directly
profile.name = 'Alice'   // object is mutated in place
setProfile(profile)      // same reference — React thinks nothing changed

// WRONG — partial object (loses other fields)
setProfile({ name: 'Alice' })  // bio and location are now undefined
```

---

## 6. Array State

Arrays in state also follow the immutability rule. Never use mutating methods like `push`, `pop`, `splice`, or `sort` directly on state arrays.

### Adding an item

```jsx
const [items, setItems] = useState(['apple', 'banana'])

// WRONG
items.push('cherry')
setItems(items)

// RIGHT — spread into a new array
setItems([...items, 'cherry'])

// Also right — add to the front
setItems(['cherry', ...items])
```

### Removing an item

```jsx
// Remove by value
setItems(items.filter(item => item !== 'banana'))

// Remove by index
setItems(items.filter((_, index) => index !== 2))
```

### Updating an item

```jsx
const [todos, setTodos] = useState([
  { id: 1, text: 'Learn React', done: false },
  { id: 2, text: 'Build a project', done: false },
])

// Toggle a todo's done state
function toggleTodo(id) {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, done: !todo.done } : todo
  ))
}
```

---

## 7. Functional Updates

When your new state value depends on the previous value, use the **functional update form** — pass a function to the setter instead of a value:

```jsx
// Direct update — uses current count from the closure
setCount(count + 1)

// Functional update — receives the guaranteed latest value
setCount(prev => prev + 1)
```

They look similar but behave differently when React batches updates. Here is the problem:

```jsx
function handleTripleClick() {
  // All three see count = 0 (stale closure)
  setCount(count + 1)  // → 1
  setCount(count + 1)  // → 1 (not 2!)
  setCount(count + 1)  // → 1 (not 3!)
}
```

React batches these — by the time any of them run, `count` is still `0` in the closure. The result is `1`, not `3`.

With functional updates:

```jsx
function handleTripleClick() {
  // Each receives the latest queued value
  setCount(prev => prev + 1)  // 0 → 1
  setCount(prev => prev + 1)  // 1 → 2
  setCount(prev => prev + 1)  // 2 → 3
}
```

Each callback receives the result of the previous one. The final count is `3`.

**Use functional updates when:**
- You call the same setter multiple times in one event handler
- You are updating state from inside `useEffect` (covered later)
- You are writing a reusable custom hook

---

## 8. Common Mistakes

### Mistake 1 — Mutating state directly

```jsx
// WRONG — mutating the object in place
const [user, setUser] = useState({ name: 'Alice', age: 28 })

function birthday() {
  user.age++       // mutates the existing object
  setUser(user)   // same reference — React sees no change
}

// RIGHT — create a new object
function birthday() {
  setUser({ ...user, age: user.age + 1 })
}
```

```jsx
// WRONG — pushing to state array
const [tags, setTags] = useState(['react'])

function addTag(tag) {
  tags.push(tag)    // mutates the array
  setTags(tags)     // same reference — no re-render
}

// RIGHT
function addTag(tag) {
  setTags([...tags, tag])
}
```

### Mistake 2 — Expecting state to update immediately

State is updated on the **next render**, not right away. After calling `setCount(5)`, `count` still holds its old value for the rest of the current render:

```jsx
function handleClick() {
  setCount(count + 1)
  console.log(count)  // logs the OLD value, not count + 1
}
```

If you need the new value right away, compute it first:

```jsx
function handleClick() {
  const newCount = count + 1
  setCount(newCount)
  console.log(newCount)  // correct
}
```

### Mistake 3 — Calling setState in the render body

Calling a setter unconditionally during render causes an infinite loop: render → setState → render → setState → ...

```jsx
// WRONG — infinite loop
function BadComponent() {
  const [count, setCount] = useState(0)
  setCount(count + 1)  // triggers re-render which runs this again
  return <p>{count}</p>
}

// RIGHT — state updates belong in event handlers or useEffect
function GoodComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

### Mistake 4 — Stale state in loops with direct updates

```jsx
// WRONG — only increments by 1
function addThree() {
  setCount(count + 1)
  setCount(count + 1)
  setCount(count + 1)
}

// RIGHT — each gets the latest
function addThree() {
  setCount(prev => prev + 1)
  setCount(prev => prev + 1)
  setCount(prev => prev + 1)
}
```

### Mistake 5 — Using state for values that can be derived

Not everything needs to be state. If a value can be **computed from existing state or props**, just compute it:

```jsx
// WRONG — fullName is redundant state
const [firstName, setFirstName] = useState('Jonathan')
const [lastName, setLastName] = useState('Picard')
const [fullName, setFullName] = useState('Jonathan Picard')  // unnecessary

// RIGHT — derive it
const [firstName, setFirstName] = useState('Jonathan')
const [lastName, setLastName] = useState('Picard')
const fullName = `${firstName} ${lastName}`  // derived, not state
```

Keeping derived values out of state reduces bugs (they can never be out of sync) and reduces the number of state updates you need to write.
