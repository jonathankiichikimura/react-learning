# 09 — Lifting State Up

## The problem: sibling communication

React's data flow is strictly one-way — parent to child via props. Two sibling components have no direct connection to each other.

Here's the problem: two inputs that each manage their own state can never stay in sync:

```jsx
// ❌ Broken: each input is an island
function CelsiusInput() {
  const [value, setValue] = useState(0)
  return <input value={value} onChange={e => setValue(e.target.value)} />
}

function FahrenheitInput() {
  const [value, setValue] = useState(32)
  return <input value={value} onChange={e => setValue(e.target.value)} />
}

function App() {
  return (
    <>
      <CelsiusInput />     {/* has its own state */}
      <FahrenheitInput />  {/* has its own state — no connection to Celsius */}
    </>
  )
}
```

Typing in Celsius does nothing to Fahrenheit. They're completely isolated.

---

## The solution: lift to the common ancestor

Move the shared state up to the closest ancestor that contains both components. Pass the current value down as a prop, and pass a setter function so each child can trigger an update.

```jsx
// ✅ State lives in the parent — both children stay in sync
function App() {
  const [celsius, setCelsius] = useState(0)
  const fahrenheit = (celsius * 9) / 5 + 32

  return (
    <>
      <CelsiusInput
        value={celsius}
        onChange={c => setCelsius(c)}
      />
      <FahrenheitInput
        value={fahrenheit}
        onChange={f => setCelsius((f - 32) * 5 / 9)}
      />
    </>
  )
}

// Children are now "dumb" — they display what they're given and report changes upward
function CelsiusInput({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      onChange={e => onChange(parseFloat(e.target.value) || 0)}
    />
  )
}
```

The children don't need to know about each other. The parent coordinates everything.

---

## "Data down, events up"

This phrase captures the mental model:

```
         Parent
        (owns state)
        /          \
  Child A          Child B
  receives         receives
  value prop       value prop
  calls onChange   calls onChange
```

- **Data flows down**: parent passes state to children as props
- **Events flow up**: children call callback props to notify the parent of changes

The parent is always the source of truth. When Child A calls `onChange`, the parent updates state, which flows back down to both children via props, keeping everything in sync.

---

## Single source of truth

The core principle: **each piece of data lives in exactly one place**.

```jsx
// ❌ Anti-pattern: duplicating state
function App() {
  const [celsius, setCelsius] = useState(0)
  const [fahrenheit, setFahrenheit] = useState(32)  // derived from celsius — don't do this!

  function handleCelsius(c) {
    setCelsius(c)
    setFahrenheit((c * 9) / 5 + 32)  // easy to forget; easy to get wrong
  }
  // ...
}

// ✅ One source, one derivation
function App() {
  const [celsius, setCelsius] = useState(0)
  const fahrenheit = (celsius * 9) / 5 + 32  // always correct, never stale
}
```

When there is one source, it's impossible for the two values to get out of sync.

---

## Passing a handler vs passing the setter directly

Sometimes you can pass the setter directly:

```jsx
// Simple: child sets a value that needs no transformation
<ColorPicker color={color} onColorChange={setColor} />
```

Other times you need a handler function to transform the value first:

```jsx
// Complex: the child gives you Fahrenheit; you need to convert before storing
<FahrenheitInput
  value={fahrenheit}
  onChange={f => setCelsius((f - 32) * 5 / 9)}  // transform, then store
/>
```

Always think about what unit/format you're storing and what format the child gives you.

---

## Derived values from lifted state

Once state is in the parent, you can compute values from it that both children benefit from:

```jsx
function App() {
  const [celsius, setCelsius] = useState(100)

  // All of these flow from one number
  const fahrenheit  = (celsius * 9) / 5 + 32
  const kelvin      = celsius + 273.15
  const description = celsius > 30 ? 'Hot' : celsius > 15 ? 'Mild' : 'Cold'

  return (
    <>
      <CelsiusInput    value={celsius}    onChange={setCelsius} />
      <FahrenheitInput value={fahrenheit} onChange={f => setCelsius((f - 32) * 5 / 9)} />
      <p>{description} ({kelvin.toFixed(1)} K)</p>
    </>
  )
}
```

---

## When NOT to lift state

Lift state only as high as it needs to go. If only one component uses a piece of state, keep it local.

```jsx
// ✅ Keep it local — nothing else needs to know if this dropdown is open
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)  // stays here
  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <ul>...</ul>}
    </div>
  )
}
```

The rule of thumb: **lift state to the lowest common ancestor that needs it**, and no higher.

---

## Lifting vs Context

Lifting state works great for a few levels of components. But if you need to pass data through many layers (prop drilling), Context is the better tool — covered in Phase 6.

```
App (owns theme)
  └── Layout
        └── Sidebar
              └── NavItem  ← needs theme — that's 3 levels of props
```

For structures like this, lifting + prop drilling becomes painful. Context lets any descendant read the value directly.

---

## Common mistakes

```jsx
// ❌ Keeping local state that should be lifted — siblings stay out of sync
function Search() {
  const [query, setQuery] = useState('')  // nothing else can read this
}
function Results() {
  // Can't access query — it's trapped in Search
}

// ✅ Lift query to the shared parent
function App() {
  const [query, setQuery] = useState('')
  return <>
    <Search query={query} onQueryChange={setQuery} />
    <Results query={query} />
  </>
}
```

```jsx
// ❌ Forgetting to pass the onChange prop — child can display but not update
<TemperatureInput value={celsius} />  // onChange missing!

// ✅ Always pass both
<TemperatureInput value={celsius} onChange={setCelsius} />
```

```jsx
// ❌ Passing the raw setter when you need to transform the value
<FahrenheitInput value={fahrenheit} onChange={setCelsius} />
// This would store a Fahrenheit number in celsius state — wrong unit!

// ✅ Wrap in a handler that converts first
<FahrenheitInput value={fahrenheit} onChange={f => setCelsius((f - 32) * 5 / 9)} />
```

```jsx
// ❌ Duplicating state in both parent and child — they go out of sync
function Parent() {
  const [value, setValue] = useState('')
  return <Child initialValue={value} />
}
function Child({ initialValue }) {
  const [value, setValue] = useState(initialValue)  // copies once, never updates again
}

// ✅ Child is fully controlled — no local copy of state
function Child({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} />
}
```

```jsx
// ❌ Lifting too high — putting everything in App when only two cousins need it
// This fills your top-level component with low-level UI concerns

// ✅ Lift only to the lowest common ancestor of the components that need the data
```
