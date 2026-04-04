# 11 — Derived State

## The core principle

If you can compute a value from existing state, don't store it as separate state.

```jsx
// ❌ Storing derived state — total is redundant and can go out of sync
const [items, setItems]   = useState([])
const [total, setTotal]   = useState(0)  // always computable from items

// ✅ Computing it fresh on every render — always correct, zero extra code
const [items, setItems] = useState([])
const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
```

The computed version is always guaranteed to match the items. The stored version requires you to remember to call `setTotal` every time items change.

---

## Why redundant state is a bug waiting to happen

Every time you have two state variables that should always match, you create an obligation: every function that changes one must also update the other. Miss one update anywhere and your UI shows wrong data.

```jsx
// ❌ The obligation trap — easy to miss one
function addItem(newItem) {
  setItems([...items, newItem])
  setTotal(total + newItem.price)  // forget this and total is wrong
}

function removeItem(id) {
  const removed = items.find(i => i.id === id)
  setItems(items.filter(i => i.id !== id))
  setTotal(total - removed.price)  // forget this and total is wrong
}

function updateQty(id, qty) {
  // Now you have to compute the delta... this gets complicated fast
}

// ✅ The derived approach — nothing to sync
function addItem(newItem) {
  setItems([...items, newItem])
  // total recomputes automatically — no extra work
}
```

---

## Recognizing derived state

Ask: "If I had only X, could I calculate Y without any additional information?" If yes, Y is derived from X.

| Value | Source | Derived? |
|-------|--------|----------|
| Cart total | Items + quantities | ✅ Yes |
| Number of completed todos | Todo list | ✅ Yes |
| Filtered results | Full list + search term | ✅ Yes |
| Full name | First name + last name | ✅ Yes |
| Is form valid | Field values | ✅ Yes |
| Word count | Text string | ✅ Yes |
| Selected item details | selectedId + items array | ✅ Yes (`items.find(i => i.id === selectedId)`) |
| Validation errors | Field values | ✅ Yes |
| User's current page | Page number state | ✅ Yes (pageItems = allItems.slice((page-1)*10, page*10)) |
| User's name | — | ❌ No — must be stored |
| Current timestamp | — | ❌ No — must be stored or fetched |
| API response data | — | ❌ No — must be stored |

---

## Common derivation patterns

### Aggregating with `.reduce()`

```jsx
const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
const totalWords = paragraphs.reduce((sum, p) => sum + p.wordCount, 0)
```

### Filtering with `.filter()`

```jsx
const completedTodos = todos.filter(t => t.done)
const activeTodos    = todos.filter(t => !t.done)
const searchResults  = items.filter(i => i.name.toLowerCase().includes(query.toLowerCase()))
```

### Finding a single item with `.find()`

```jsx
const selectedItem = items.find(i => i.id === selectedId)
// Use selectedItem.name, selectedItem.price, etc. — no extra state needed
```

### Transforming with `.map()`

```jsx
// Normalize for display — no need to store a separate "display" array
const displayItems = items.map(item => ({
  ...item,
  formattedPrice: `$${item.price.toFixed(2)}`,
  isOnSale: item.price < item.originalPrice,
}))
```

### Computing from strings

```jsx
const charCount     = text.length
const wordCount     = text.trim() ? text.trim().split(/\s+/).length : 0
const sentenceCount = (text.match(/[.!?]+/g) || []).length
const isEmpty       = text.trim().length === 0
```

### Derived booleans

```jsx
const isFormValid  = name.trim().length > 0 && email.includes('@')
const hasSelection = selectedIds.length > 0
const isOverBudget = total > budget
```

---

## Where to compute: before return vs inline

Both are valid — pick whichever reads more clearly.

```jsx
// Compute before return — good when the value is reused or complex
export default function Cart() {
  const [items, setItems] = useState(initialItems)

  const total      = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const itemCount  = items.reduce((sum, i) => sum + i.qty, 0)
  const isEmpty    = items.length === 0

  return (
    <div>
      <p>{itemCount} items</p>
      {isEmpty ? <p>Your cart is empty</p> : <ItemList items={items} />}
      <p>Total: ${total}</p>
    </div>
  )
}
```

```jsx
// Inline — fine for simple, one-off values
return (
  <p>
    {todos.filter(t => !t.done).length} tasks remaining
  </p>
)
```

---

## The two-state anti-pattern: how they drift

A common failure mode: store the same information twice and forget to sync one of the copies.

```jsx
// ❌ Two states that must always agree — they won't
const [todos, setTodos]             = useState(initialTodos)
const [completedCount, setCompleted] = useState(0)

function toggleTodo(id) {
  const updated = todos.map(t =>
    t.id === id ? { ...t, done: !t.done } : t
  )
  setTodos(updated)
  // Forgot to update completedCount!
  // Now completedCount is stale
}

// ✅ One state, one derivation
const [todos, setTodos] = useState(initialTodos)
const completedCount = todos.filter(t => t.done).length  // always correct
```

---

## useMemo — the escape hatch for expensive derivations

Derived values recompute on every render. For most data this is instant (microseconds). If you have genuinely expensive computation — filtering 100,000 records, complex math on large datasets — `useMemo` caches the result:

```jsx
import { useMemo } from 'react'

const expensiveResult = useMemo(() => {
  return hugeList.filter(item => complexCondition(item))
}, [hugeList, complexCondition])
// Only recomputes when hugeList or complexCondition changes
```

**When to reach for useMemo:**
- The computation is measurably slow (profile first!)
- The list has thousands of items
- The computation runs inside a frequently re-rendering component

**When NOT to use useMemo:**
- For simple derivations like `.length`, `.filter()` on small arrays, string operations
- Premature optimization — most computations are fast enough without it
- As a default for all derived values — it adds complexity and is often unnecessary

Covered in depth in Challenge 19.

---

## Common mistakes

```jsx
// ❌ Storing a filtered list in state
const [items, setItems]     = useState(allItems)
const [filtered, setFiltered] = useState(allItems)  // redundant!

function handleSearch(q) {
  setFiltered(items.filter(i => i.name.includes(q)))
}

// ✅ Derive it during render
const [items, setItems] = useState(allItems)
const [query, setQuery] = useState('')
const filtered = items.filter(i => i.name.includes(query))
```

```jsx
// ❌ Storing a count that can be computed
const [todos, setTodos]     = useState([])
const [todoCount, setCount] = useState(0)

// ✅ Just compute it
const [todos, setTodos] = useState([])
const todoCount = todos.length
```

```jsx
// ❌ Calling setState inside render to sync derived state — causes an infinite loop!
function Component() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)

  // DON'T DO THIS — it triggers another render, which runs this again, forever
  setTotal(items.reduce((s, i) => s + i.price, 0))
}

// ✅ Just compute it — no setState needed
function Component() {
  const [items, setItems] = useState([])
  const total = items.reduce((s, i) => s + i.price, 0)
}
```

```jsx
// ❌ Storing selectedItem when you already have selectedId + items
const [items, setItems]           = useState([])
const [selectedId, setSelectedId] = useState(null)
const [selectedItem, setSelected] = useState(null)  // redundant!

// ✅ Derive selectedItem from selectedId
const selectedItem = items.find(i => i.id === selectedId) ?? null
```

```jsx
// ❌ Computing the derived value as state to "avoid recomputing"
// This is premature optimization that creates sync bugs
const [sortedItems, setSorted] = useState([...items].sort(compareFn))

// ✅ Compute it — sorting is fast unless you have thousands of items
const sortedItems = [...items].sort(compareFn)
// Use useMemo only if profiling shows it's actually slow
```

---

## Chained derivations

Sometimes a derived value itself is the input for the next derivation. You build a pipeline — each step depends on the previous one, and all of them depend on the single source of state.

### The shopping cart example

```jsx
const [cart, setCart] = useState(INITIAL_CART)

// Step 1 — aggregate raw state
const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

// Step 2 — derived from step 1
const discount = subtotal >= 50 ? subtotal * 0.1 : 0

// Step 3 — derived from steps 1 and 2
const tax = (subtotal - discount) * 0.08

// Step 4 — derived from steps 1, 2, and 3
const total = subtotal - discount + tax
```

Four separate values — all guaranteed correct — from one array in state. There's no `setSubtotal`, `setDiscount`, `setTax`, or `setTotal`. Every quantity change automatically flows through all four steps on the next render.

### The pipeline mental model

```
cart (state)
  └── subtotal   (reduce over cart)
        └── discount   (conditional % of subtotal)
              └── tax        (% of discounted subtotal)
                    └── total      (subtotal - discount + tax)
```

Each arrow represents a pure calculation. Pure means: same inputs always produce the same outputs, no side effects. This makes the whole pipeline easy to reason about and impossible to get out of sync.

### Conditional steps in a chain

The discount example shows a conditional mid-chain derivation:

```jsx
const discount = subtotal >= 50 ? subtotal * 0.1 : 0
```

When `discount` is 0, the downstream calculations (`tax`, `total`) still work correctly — they're just computing as if no discount applies. The conditional produces 0, and 0 flows cleanly through the rest of the chain.

This also drives a conditional render: you only show the discount row when it applies:

```jsx
{discount > 0 && (
  <div>
    <span>Discount (10%)</span>
    <span>−${discount.toFixed(2)}</span>
  </div>
)}
```

### Naming intermediate values

Name each step clearly — it makes the chain self-documenting:

```jsx
// Hard to follow — what does each expression mean?
const result = items.reduce((s, i) => s + i.p * i.q, 0) * (1 - (items.reduce((s, i) => s + i.p * i.q, 0) >= 50 ? 0.1 : 0))

// Clear — each step has a name and purpose
const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
const discount = subtotal >= 50 ? subtotal * 0.1 : 0
const total    = subtotal - discount
```

### Filter + sort pipeline

The same chaining principle applies to filtering and sorting:

```jsx
const [search, setSearch] = useState('')
const [sort,   setSort]   = useState('none')

// Step 1 — filter from the full list
const filtered = products.filter(p =>
  p.name.toLowerCase().includes(search.toLowerCase())
)

// Step 2 — sort the already-filtered result
const displayed =
  sort === 'asc'  ? [...filtered].sort((a, b) => a.price - b.price) :
  sort === 'desc' ? [...filtered].sort((a, b) => b.price - a.price) :
  filtered
```

`products` → `filtered` → `displayed`. Each step is derived from the previous. The sort only operates on products that passed the search filter — exactly what you'd expect. And all of this reacts automatically whenever `search`, `sort`, or `products` changes.

### How many steps can you chain?

As many as make sense. Common patterns:

```
raw data → filtered → sorted → paginated → displayed
items    → totals   → discounted → taxed → final price
form     → validated fields → derived summary → submit-ready
```

The only rule: keep each step a pure computation, and don't store any of the intermediate values as state.
