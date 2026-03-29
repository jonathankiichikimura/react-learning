# Props — Passing Data into Components

Props are how you make components dynamic. Without props, every `UserCard` would show the same hardcoded name. With props, you can render the same component with completely different data.

---

## 1. Props are Function Arguments

The analogy is direct. A regular JavaScript function accepts arguments:

```js
function greet(name, age) {
  return `Hello, ${name}. You are ${age} years old.`
}

greet('Alice', 28)
greet('Bob', 35)
```

A React component accepts props — and they work the same way:

```jsx
function UserCard({ name, age }) {
  return <p>Hello, {name}. You are {age} years old.</p>
}

<UserCard name="Alice" age={28} />
<UserCard name="Bob" age={35} />
```

Same component, different data, different output. That is the entire point.

---

## 2. Passing Props

Props look like HTML attributes on the JSX tag. The type of value determines whether you use quotes or curly braces.

### Strings — no curly braces needed

```jsx
<UserCard name="Alice" role="Engineer" />
```

Quotes work for strings just like HTML attributes.

### Numbers — curly braces required

```jsx
<ProductCard price={29.99} quantity={3} />
```

Without braces, `price="29.99"` would pass the string `"29.99"`, not the number `29.99`. This matters when you try to do math on it.

### Booleans — bare prop name means `true`

```jsx
<Button disabled />
{/* Same as: <Button disabled={true} /> */}

<Button disabled={false} />
{/* Must use braces to pass false */}
```

### Objects — braces inside braces

```jsx
<UserCard user={{ name: 'Alice', role: 'Engineer' }} />
{/* Outer {} = JSX expression, inner {} = object literal */}
```

### Arrays

```jsx
<List items={['apple', 'banana', 'cherry']} />
```

### Functions (callbacks)

```jsx
<Button onClick={() => console.log('clicked')} />
<Button onClick={handleClick} />
```

---

## 3. Receiving Props

### Option A — Destructuring (preferred)

```jsx
function UserCard({ name, role, age }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{role} · {age} years old</p>
    </div>
  )
}
```

Destructuring is cleaner. You see exactly which props the component uses just by looking at the function signature.

### Option B — The `props` object

```jsx
function UserCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>{props.role} · {props.age} years old</p>
    </div>
  )
}
```

This is fine but more verbose. It is occasionally useful when you want to spread all props onto an HTML element.

### Default values

Use JavaScript's default parameter syntax:

```jsx
function Button({ label = 'Click me', color = 'blue', size = 'medium' }) {
  return (
    <button style={{ color, fontSize: size === 'large' ? '1.2rem' : '1rem' }}>
      {label}
    </button>
  )
}

// All defaults apply:
<Button />

// Override just one:
<Button label="Submit" />

// Override all:
<Button label="Delete" color="red" size="large" />
```

---

## 4. One-Way Data Flow

Data in React flows **downward only** — from parent to child through props. A child component can never directly modify the data of its parent.

```
App (owns: users[])
│
├── UserList (receives: users[])
│   │
│   ├── UserCard (receives: user)     <-- data flows down
│   ├── UserCard (receives: user)
│   └── UserCard (receives: user)
│
└── Sidebar (receives: userCount)
```

This is intentional. One-way flow makes your app predictable: when something on screen looks wrong, you always know to look upward in the tree to find where the data comes from.

**Props are read-only.** You should never modify a prop inside a component:

```jsx
// WRONG — mutating a prop
function UserCard({ user }) {
  user.name = 'Hacked!'  // this mutates the parent's data — never do this
  return <p>{user.name}</p>
}

// RIGHT — use the prop as-is, or derive a new value
function UserCard({ user }) {
  const displayName = user.name.toUpperCase()  // derived, not mutated
  return <p>{displayName}</p>
}
```

---

## 5. Passing Functions as Props

When a child needs to communicate back to the parent — for example, a button that needs to update data the parent owns — the parent passes a **callback function** as a prop. The child calls it.

```jsx
function App() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <div>
      {/* Pass the setter down as a prop */}
      <UserCard id={1} name="Alice" onSelect={setSelectedId} />
      <UserCard id={2} name="Bob" onSelect={setSelectedId} />

      {selectedId && <p>Selected user ID: {selectedId}</p>}
    </div>
  )
}

function UserCard({ id, name, onSelect }) {
  return (
    <div className="card" onClick={() => onSelect(id)}>
      <h3>{name}</h3>
      <p>Click to select</p>
    </div>
  )
}
```

The flow:
1. `App` owns `selectedId` state
2. `App` passes `setSelectedId` to `UserCard` as `onSelect`
3. User clicks `UserCard` → `onSelect(id)` is called → `setSelectedId(id)` runs
4. `App` re-renders with the new `selectedId`
5. Both `UserCard` components re-render (they are children of `App`)

Data still flows down (props), but events flow up (callbacks). This is the fundamental pattern for parent-child communication in React.

---

## 6. The `children` Prop

There is a special built-in prop called `children`. It contains whatever you put between a component's opening and closing tags.

```jsx
function Panel({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

// Usage:
<Panel title="User Stats">
  <p>Repos: 42</p>
  <p>Followers: 108</p>
</Panel>
```

`children` can be text, JSX elements, or even other components. It is how you build container/wrapper components that do not need to know what they are wrapping.

---

## 7. Common Mistakes

### Mistake 1 — Mutating props

```jsx
// WRONG
function Badge({ user }) {
  user.role = 'admin'  // mutating the parent's object
  return <span>{user.role}</span>
}

// RIGHT — treat props as read-only
function Badge({ user }) {
  return <span>{user.role}</span>
}
```

### Mistake 2 — Forgetting braces for non-string values

```jsx
// WRONG — passes the string "28", not the number 28
<UserCard age="28" />

// WRONG — passes the string "true", not the boolean true
<Button disabled="true" />

// RIGHT
<UserCard age={28} />
<Button disabled={true} />  // or just: <Button disabled />
```

This matters when you use the value in logic: `if (age > 18)` works fine with a number but not a string.

### Mistake 3 — Wrong prop names (typos)

```jsx
// Parent passes:
<UserCard userName="Alice" />

// Child expects:
function UserCard({ name }) {   // "name" not "userName"
  return <p>{name}</p>          // renders nothing — undefined
}
```

The component silently gets `undefined`. Check your prop names match exactly.

### Mistake 4 — Passing an object when you meant to spread it

```jsx
const user = { name: 'Alice', role: 'Engineer' }

// WRONG — passes one prop called "user" (an object)
<UserCard user={user} />
// Must receive as: function UserCard({ user }) { ... user.name ... }

// IF the component expects individual props, spread instead:
<UserCard {...user} />
// Same as: <UserCard name="Alice" role="Engineer" />
```

### Mistake 5 — Expecting props to update if you change a local variable

```jsx
function Parent() {
  let count = 0

  function increment() {
    count++  // does NOT cause re-render — count is not state
  }

  return <Child value={count} onClick={increment} />
}
```

If you want prop values to change on screen, the parent must use `useState`. A changing local variable never triggers a re-render.
