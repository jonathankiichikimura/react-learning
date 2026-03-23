# 03 — Props

## What are props?

Props (short for "properties") are how you pass data **into** a component from its parent. They work exactly like function arguments:

```jsx
// Passing props — looks like HTML attributes
<UserCard name="Alice" role="Engineer" age={28} />

// Receiving props — just a function parameter
function UserCard({ name, role, age }) {
  return <p>{name} ({age}) — {role}</p>
}
```

## One-way data flow

Data flows **down** — from parent to child only. A child cannot modify its own props. This constraint is intentional: it makes data flow predictable and easy to trace.

```
App (owns the data)
 └── UserList (receives users[] as a prop)
      └── UserCard (receives one user object as props)
```

If a child needs to "send data up" to the parent, you pass a **function** as a prop — the child calls it, the parent updates. This is covered in challenge 09.

## Destructuring props

You can receive all props as one object, or destructure directly in the parameter:

```jsx
// As an object (verbose)
function Card(props) {
  return <p>{props.name} — {props.role}</p>
}

// Destructured (preferred)
function Card({ name, role }) {
  return <p>{name} — {role}</p>
}
```

## Default values

```jsx
function Button({ label = 'Click me', color = 'blue' }) {
  return <button style={{ color }}>{label}</button>
}
```

## Props can be any JavaScript value

```jsx
// String
<Title text="Hello" />

// Number (use curly braces for non-strings)
<Rating score={4.5} />

// Boolean (bare prop = true)
<Button disabled />
// same as: <Button disabled={true} />

// Array
<List items={['a', 'b', 'c']} />

// Object
<UserCard user={{ name: 'Alice', role: 'Engineer' }} />

// Function
<Button onClick={() => console.log('clicked')} />
```

## The `children` prop

There's a special prop called `children` — it's whatever you put between a component's opening and closing tags. This is covered in depth in challenge 10.

```jsx
<Panel title="Stats">
  <p>This is the children prop</p>
</Panel>
```

## Common mistakes

- Mutating props inside the component → never do this, props are read-only
- Forgetting curly braces for non-string values: `<Card age="28" />` passes the *string* "28", not the *number* 28
