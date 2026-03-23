# 09 — Lifting State Up

## The problem: sibling communication

React's data flow is one-way: data flows down from parent to child via props. But what if two sibling components need to share or sync data?

```
        App
       /   \
   InputA  InputB
```

`InputA` and `InputB` can't talk directly — they have no connection. The solution is to **lift the state up** to their shared parent (`App`), which can then pass data down to both.

## The pattern

Move the shared state to the closest common ancestor. Pass the data down as props, and pass a setter function down as a prop so children can trigger updates.

```jsx
// ❌ Before: each input has its own state, they can't sync
function InputA() { const [value, setValue] = useState('') ... }
function InputB() { const [value, setValue] = useState('') ... }

// ✅ After: state lives in the parent, passed down as props
function Parent() {
  const [value, setValue] = useState('')

  return (
    <>
      <InputA value={value} onChange={setValue} />
      <InputB value={value} onChange={setValue} />
    </>
  )
}

function InputA({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />
}
```

## Single source of truth

The core principle: **store each piece of data in exactly one place**. Both inputs read from and write to the same state in the parent. There's no risk of them getting out of sync because there's only one copy.

This principle applies everywhere in React, not just forms.

## Data down, events up

A common phrase for this pattern:

- **Data flows down** — parent passes state to children via props
- **Events flow up** — children call functions passed via props to notify the parent of changes

```
        App (owns state)
       /    \
  Child A   Child B
  reads      calls
  state     onChange
```

## When to lift state

Lift state when:
- Two sibling components need the same data
- A parent needs to know about something that happened in a child
- A child's state affects what another part of the tree renders

Don't over-lift — only go as high as needed. If only one component needs the data, keep it local.

## Common mistakes

- Keeping two separate states that should be in sync — always pick one source of truth
- Passing the setter function directly when you need to transform the value first — pass a handler function instead
- Lifting state too high (e.g. all the way to the top of the app) when Context or a state library is the better tool — covered in Phase 6
