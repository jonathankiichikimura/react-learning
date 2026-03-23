# 10 — The children Prop

## What is the children prop?

Every React component automatically receives a special prop called `children`. It contains whatever JSX is placed between the component's opening and closing tags:

```jsx
<Panel title="Stats">
  <p>Users: 1,200</p>     {/* this is children */}
  <p>Revenue: $4,500</p>  {/* so is this */}
</Panel>
```

Inside `Panel`, you render it like any other prop:

```jsx
function Panel({ title, children }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}
```

## Why this matters: composition

`children` is what enables **composition** — building components that wrap around arbitrary content without knowing what that content is. The Panel doesn't care what's inside it. It could be text, a form, a chart, another component — anything.

This is more flexible than trying to anticipate every possible combination of props upfront.

```jsx
// Without children — you'd need to predict every type of content
<Panel textContent="Hello" hasButton buttonLabel="Click" />

// With children — the parent decides what goes inside
<Panel title="Welcome">
  <p>Hello</p>
  <button>Click</button>
</Panel>
```

## Real-world examples

You'll see this pattern constantly in production code:

```jsx
// Layout wrappers
<Container maxWidth="lg">
  <Dashboard />
</Container>

// Modal dialogs
<Modal title="Confirm Delete">
  <p>Are you sure? This cannot be undone.</p>
  <Button onClick={handleDelete}>Delete</Button>
</Modal>

// Cards
<Card>
  <Chart data={data} />
</Card>

// Buttons with icons
<Button>
  <Icon name="save" /> Save
</Button>
```

## children can be anything

```jsx
// Text
<Label>First name</Label>

// Multiple elements
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>

// A single component
<Wrapper><MyForm /></Wrapper>

// An array of components (you need keys in this case)
<List>
  {items.map(item => <Item key={item.id} item={item} />)}
</List>
```

## Composition vs inheritance

React favors **composition** (wrapping components inside others) over **inheritance** (extending classes). If you ever feel tempted to extend a React component, use the `children` prop and composition instead.

## Common mistakes

- Naming it something other than `children` when receiving it as a prop — it's always `children`
- Forgetting that `children` can be `undefined` if nothing is passed between the tags — guard with `{children && ...}` if needed
