# 07 — Lists & Keys

Displaying collections of data is one of the most common things you do in React. A list of todos, a grid of products, a feed of posts — all of these follow the same pattern: map over an array and return JSX for each item.

---

## 1. Rendering Arrays

React can render an array of JSX elements directly. When you put an array inside `{}` in JSX, React renders each element in order:

```jsx
const elements = [<li>Apple</li>, <li>Banana</li>, <li>Cherry</li>]

return <ul>{elements}</ul>
// renders: Apple, Banana, Cherry
```

In practice you almost never build arrays by hand. You use `.map()` to transform an array of data into an array of JSX:

```jsx
const fruits = ['Apple', 'Banana', 'Cherry']

return (
  <ul>
    {fruits.map(fruit => (
      <li key={fruit}>{fruit}</li>
    ))}
  </ul>
)
```

`.map()` takes each item in the array, runs a function on it, and returns a new array containing the results. Here it turns each string into a `<li>` element. React renders the resulting array of `<li>` elements inside the `<ul>`.

---

## 2. The Key Prop

Notice the `key={fruit}` in the example above. React requires a `key` prop on each element inside a `.map()`.

**Why does React need keys?**

When your list changes — an item is added, removed, or reordered — React needs to figure out the minimal set of DOM updates to make. Without keys, React has no way to match up the old list with the new one. It falls back to re-rendering every item from scratch.

With keys, React can say: "The item with key `3` moved from position 2 to position 0. I'll just move the DOM node." This preserves:
- Input values inside list items
- Focus state
- CSS transitions and animations
- Component internal state

**What happens without keys:**

- React logs a warning in the browser console: `Warning: Each child in a list should have a unique "key" prop`
- Performance degrades for long lists
- You can get subtle bugs where state from one item leaks into another item after reordering

---

## 3. Good Keys vs Bad Keys

A key must be:
1. **Unique among siblings** in the same list (not globally unique across the whole page)
2. **Stable** — the same item must always get the same key on every render

**Database IDs — ideal:**

```jsx
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}
```

IDs from a database are unique and stable. This is the best case.

**Stable unique strings — good:**

```jsx
{tabs.map(tab => (
  <Tab key={tab.slug} tab={tab} />
))}
// "overview", "settings", "billing" — unique and never change
```

**Array index — use only when the list is static:**

```jsx
// Fine when the list never reorders, filters, or has items inserted in the middle
{STATIC_CONFIG.map((item, index) => (
  <ConfigRow key={index} item={item} />
))}
```

**Array index — breaks when the list changes:**

Consider a list `['Alice', 'Bob', 'Carol']` with keys `0`, `1`, `2`. If you delete Alice, the new list is `['Bob', 'Carol']` with keys `0`, `1`. React sees that key `0` changed from "Alice" to "Bob" and re-renders it. Any input that was focused on Alice's row is now focused on Bob's row. This is a real bug.

The rule: use index as a key only when the list is truly static and will never be filtered, sorted, or reordered.

**Random values — never:**

```jsx
// Wrong — generates a new key on every render
{items.map(item => (
  <Item key={Math.random()} item={item} />
))}
```

A different key on every render tells React "this is a brand new element" every time. React unmounts and remounts the component on every render, which is extremely slow and breaks all internal state.

---

## 4. Immutable Array Operations

React state must be treated as immutable — you never modify an array directly. Instead, you create a new array with the desired change and pass that to `setState`.

**Adding an item:**

```jsx
// Wrong — push() mutates the original array
function handleAdd(text) {
  todos.push({ id: Date.now(), text })
  setTodos(todos) // same reference, React may not re-render
}

// Right — spread creates a new array
function handleAdd(text) {
  setTodos([...todos, { id: Date.now(), text }])
}

// Also right — add to the front
function handlePrepend(text) {
  setTodos([{ id: Date.now(), text }, ...todos])
}
```

**Removing an item:**

```jsx
// Wrong — splice() mutates the original array
function handleDelete(id) {
  todos.splice(todos.findIndex(t => t.id === id), 1)
  setTodos(todos)
}

// Right — filter() returns a new array without the item
function handleDelete(id) {
  setTodos(todos.filter(t => t.id !== id))
}
```

**Updating an item:**

```jsx
// Wrong — mutates the object inside the array
function handleToggle(id) {
  const todo = todos.find(t => t.id === id)
  todo.done = !todo.done // direct mutation
  setTodos(todos)
}

// Right — map() creates a new array; spread creates a new object for the changed item
function handleToggle(id) {
  setTodos(todos.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  ))
}
```

The `{ ...t, done: !t.done }` syntax creates a new object with all of `t`'s properties, but overrides `done` with the new value.

**Reordering items:**

```jsx
// Move item at index `from` to index `to`
function handleMove(from, to) {
  const next = [...todos]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  setTodos(next)
}
// Note: splicing a copy (next) is fine — you never mutate `todos` directly
```

---

## 5. Filtering + Mapping

A common pattern is to derive what to display from state, rather than storing a pre-filtered version.

**Store the full list in state. Filter during render.**

```jsx
function TaskList() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all') // 'all' | 'active' | 'done'

  // Derive the visible list — do NOT store this in state
  const visible = filter === 'all'
    ? tasks
    : tasks.filter(t => filter === 'done' ? t.done : !t.done)

  return (
    <div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('done')}>Done</button>
      </div>
      <ul>
        {visible.map(task => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  )
}
```

**Why not store the filtered list in state?**

If you stored a filtered list, toggling a task's `done` state would require updating two pieces of state simultaneously: the full list *and* the filtered list. They could get out of sync. Derived data is always computed from the source of truth, so it can never be inconsistent.

**Chaining filter and map:**

```jsx
{tasks
  .filter(t => !t.done)
  .map(t => (
    <li key={t.id}>{t.text}</li>
  ))
}
```

---

## 6. Empty State

When the visible list is empty, render a message instead of an empty container:

```jsx
<ul>
  {visible.map(task => (
    <li key={task.id}>{task.text}</li>
  ))}
  {visible.length === 0 && (
    <li style={{ color: '#888' }}>No tasks here.</li>
  )}
</ul>
```

Or using a ternary for more control:

```jsx
{visible.length > 0 ? (
  <ul>
    {visible.map(task => (
      <li key={task.id}>{task.text}</li>
    ))}
  </ul>
) : (
  <p>No tasks match the current filter.</p>
)}
```

Empty state is important UX — a blank space with no explanation is confusing. Always tell the user why a list is empty.

---

## 7. Common Mistakes

**Mistake 1: Using array index as key when the list can change**

```jsx
// Breaks if items are deleted, reordered, or filtered
{todos.map((todo, index) => (
  <li key={index}>{todo.text}</li>
))}

// Fix: use a stable id
{todos.map(todo => (
  <li key={todo.id}>{todo.text}</li>
))}
```

**Mistake 2: Forgetting the key prop**

```jsx
// Missing key — React warns and re-renders inefficiently
{items.map(item => <Item item={item} />)}

// Add key to the outermost element returned by map
{items.map(item => <Item key={item.id} item={item} />)}
```

**Mistake 3: Putting the key on the wrong element**

```jsx
// Wrong — key is on the inner element, not the outermost one returned by map
{items.map(item => (
  <div>
    <p key={item.id}>{item.text}</p>
  </div>
))}

// Right — key is on the outermost element
{items.map(item => (
  <div key={item.id}>
    <p>{item.text}</p>
  </div>
))}
```

**Mistake 4: Mutating the array with push, splice, or direct assignment**

```jsx
// All of these are wrong — they mutate the original array
todos.push(newTodo)
todos.splice(0, 1)
todos[0].done = true

// Always create new arrays/objects
setTodos([...todos, newTodo])
setTodos(todos.filter(t => t.id !== id))
setTodos(todos.map(t => t.id === id ? { ...t, done: true } : t))
```

**Mistake 5: Storing filtered/derived data in state**

```jsx
// Wrong — now you have two sources of truth that must stay in sync
const [allTasks, setAllTasks] = useState(initialTasks)
const [visibleTasks, setVisibleTasks] = useState(initialTasks)

// Right — derive visible tasks during render
const [tasks, setTasks] = useState(initialTasks)
const [filter, setFilter] = useState('all')
const visibleTasks = filter === 'all' ? tasks : tasks.filter(...)
```

**Mistake 6: Using `.forEach()` instead of `.map()`**

```jsx
// Wrong — forEach returns undefined, not an array of JSX
{todos.forEach(todo => <li key={todo.id}>{todo.text}</li>)}

// Right — map returns the array of JSX elements
{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
```

**Mistake 7: Using Math.random() as a key**

```jsx
// Wrong — new key on every render = unmount/remount every item
{items.map(item => <Item key={Math.random()} item={item} />)}

// Right — use a stable id
{items.map(item => <Item key={item.id} item={item} />)}
```
