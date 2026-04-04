# 10 — The children Prop

## What is the children prop?

Every React component automatically receives a special prop called `children`. It contains whatever JSX is placed between the component's opening and closing tags.

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
      <div>{children}</div>  {/* renders whatever was passed between the tags */}
    </div>
  )
}
```

These two ways of passing children are equivalent:

```jsx
// Between the tags (standard)
<Wrapper>hello</Wrapper>

// As an explicit prop (unusual but valid)
<Wrapper children="hello" />
```

---

## Why this matters: composition

`children` enables **composition** — building components that wrap around arbitrary content without needing to know what that content is. A Panel doesn't care what's inside it. It could be text, a form, a chart, another component — anything.

```jsx
// Without children — you'd have to predict every possible type of content
<Panel textContent="Hello" hasButton buttonLabel="Click me" showList listItems={[...]} />

// With children — the parent decides what goes inside, Panel just wraps it
<Panel title="Welcome">
  <p>Hello</p>
  <button>Click me</button>
  <ul>...</ul>
</Panel>
```

The `children` approach scales infinitely. The props approach breaks down as soon as you need something new.

---

## Wrapper and layout components

`children` is the backbone of layout and container components. You'll see this pattern everywhere:

```jsx
// Modal dialog — the content changes but the chrome stays the same
function Modal({ title, children }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

<Modal title="Confirm Delete">
  <p>Are you sure? This cannot be undone.</p>
  <button onClick={handleDelete}>Delete</button>
</Modal>
```

```jsx
// Page layout — controls the skeleton, children fills in the content
function PageLayout({ children }) {
  return (
    <div>
      <Header />
      <main style={{ maxWidth: '960px', margin: '0 auto' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

<PageLayout>
  <Dashboard />
</PageLayout>
```

```jsx
// Card container
function Card({ children }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem' }}>
      {children}
    </div>
  )
}

<Card>
  <h3>Revenue</h3>
  <Chart data={revenueData} />
</Card>
```

---

## Named slots alongside children

You can combine `children` with other JSX props for more complex layouts — this is sometimes called the "slot" pattern:

```jsx
function Modal({ title, footer, children }) {
  return (
    <div className="modal">
      <div className="modal-header">{title}</div>
      <div className="modal-body">{children}</div>
      <div className="modal-footer">{footer}</div>
    </div>
  )
}

<Modal
  title={<h2>Confirm</h2>}
  footer={
    <>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Confirm</button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

`children` fills the body; `footer` fills the footer slot; `title` fills the header. None of these need to be strings.

---

## children can be anything

```jsx
// Plain text
<Label>First name</Label>

// A single element
<Wrapper><MyForm /></Wrapper>

// Multiple elements (React merges them automatically)
<Card>
  <h2>Title</h2>
  <p>Subtitle</p>
  <img src="..." />
</Card>

// A mapped array (needs keys on the items, not on the wrapper)
<List>
  {items.map(item => <Item key={item.id} item={item} />)}
</List>

// Mixed content
<Button>
  <Icon name="save" /> Save Changes
</Button>
```

---

## Guarding against missing children

If children might not be passed, guard before rendering:

```jsx
function Panel({ title, children }) {
  return (
    <div>
      <h3>{title}</h3>
      {children
        ? <div className="body">{children}</div>
        : <p className="empty">Nothing here yet.</p>
      }
    </div>
  )
}
```

Or use a default:

```jsx
function Panel({ title, children = <p>Empty panel</p> }) {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  )
}
```

---

## children vs prop drilling

One underappreciated use of `children`: it lets you pass JSX through an intermediate component without that component needing to know about it.

```jsx
// ❌ Without children — Layout has to know about and pass along UserProfile
function Layout({ user }) {
  return (
    <div>
      <Sidebar />
      <UserProfile user={user} />  {/* Layout is coupled to UserProfile */}
    </div>
  )
}

// ✅ With children — Layout is generic, the parent decides the content
function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      {children}  {/* Layout doesn't know or care what this is */}
    </div>
  )
}

// The parent composes them:
<Layout>
  <UserProfile user={user} />
</Layout>
```

This avoids a form of prop drilling — the intermediate `Layout` component no longer needs to accept and forward `user`.

---

## Composition over inheritance

React favors **composition** (wrapping components inside each other using `children`) over **inheritance** (extending classes). If you ever feel the urge to do `class MyButton extends Button`, use `children` and composition instead — it's more flexible and easier to understand.

---

## Common mistakes

```jsx
// ❌ Forgetting to render children — content silently disappears
function Panel({ title, children }) {
  return <div><h3>{title}</h3></div>  // children never rendered!
}

// ✅
function Panel({ title, children }) {
  return <div><h3>{title}</h3>{children}</div>
}
```

```jsx
// ❌ Trying to pass children as a normal prop name
<Panel title="Stats" content={<p>Users: 100</p>} />
// ...and then accessing props.content instead of props.children

// ✅ Use children for the main content slot
<Panel title="Stats"><p>Users: 100</p></Panel>
```

```jsx
// ❌ Not guarding when children could be undefined
function Tooltip({ children }) {
  return <div className="tooltip">{children.toUpperCase()}</div>
  // Crashes if children is a React element, not a string
}

// ✅ Don't call methods on children — just render it
function Tooltip({ children }) {
  return <div className="tooltip">{children}</div>
}
```

```jsx
// ❌ Wrapping in unnecessary extra divs instead of using children
function Card({ content }) {
  return <div className="card"><div>{content}</div></div>
}
// Called as: <Card content={<p>Hello</p>} />

// ✅ Use children for natural composition
function Card({ children }) {
  return <div className="card">{children}</div>
}
// Called as: <Card><p>Hello</p></Card>
```

```jsx
// ❌ Assuming children is always a single element — it can be an array
function Wrapper({ children }) {
  return <div onClick={() => children.props.onClick()}>...</div>
  // Crashes if multiple children are passed
}

// ✅ Just render children — let React handle it
function Wrapper({ children }) {
  return <div>{children}</div>
}
```

---

## Conditional children — the gated access pattern

A component can choose whether to render its `children` based on some condition. This is the "gated" or "guard" pattern: the wrapper decides if the content should be shown at all.

### Basic gating

```jsx
function Gated({ isAllowed, children }) {
  if (!isAllowed) return null
  return <>{children}</>
}

// Usage:
<Gated isAllowed={user.isAdmin}>
  <AdminPanel />
</Gated>
```

When `isAllowed` is false, nothing renders — not even a wrapper div.

### Gating with a fallback

Often you want to show *something* when access is denied — an upgrade prompt, a login message, a placeholder:

```jsx
function Gated({ isAllowed, children, fallback = null }) {
  return isAllowed ? <>{children}</> : <>{fallback}</>
}

<Gated
  isAllowed={user.isPremium}
  fallback={<p style={{ color: '#999' }}>Upgrade to Pro to access this feature.</p>}
>
  <ProFeature />
</Gated>
```

The `fallback` prop defaults to `null`, so existing uses without a fallback continue to work.

### Why this is useful

Without the `Gated` pattern, access control logic scatters throughout the JSX:

```jsx
// ❌ Access control inline everywhere — hard to scan, easy to miss
{user.isAdmin && <AdminLink />}
{user.isAdmin && <DeleteButton />}
{user.isAdmin && <UsersTable />}
{!user.isAdmin && <p>Access denied.</p>}
```

With `Gated`, the access rule is stated once at the boundary:

```jsx
// ✅ Clean — the gate is one component, the content is its children
<Gated isAllowed={user.isAdmin} fallback={<AccessDenied />}>
  <AdminLink />
  <DeleteButton />
  <UsersTable />
</Gated>
```

### Variations you'll see in the wild

```jsx
// Role-based: accepts a required role string
function RequireRole({ role, user, children, fallback = null }) {
  return user.roles.includes(role) ? children : fallback
}

// Feature flags: show experimental UI only when flag is on
function FeatureFlag({ flag, flags, children }) {
  return flags[flag] ? children : null
}

// Loading guard: show children only when data is ready
function WhenReady({ isLoading, children, fallback = <Spinner /> }) {
  return isLoading ? fallback : children
}
```

All of these are the same fundamental pattern: a component that uses a condition to decide whether to render `children` or an alternative.
