# 11 — Derived State

## What is derived state?

Derived state is any value that can be **computed from existing state**. The rule is simple: if you can calculate it from state you already have, don't store it as separate state.

```jsx
// ❌ Storing derived state — redundant and error-prone
const [items, setItems] = useState([])
const [total, setTotal] = useState(0)  // derives from items — don't do this

// ✅ Computing it on the fly
const [items, setItems] = useState([])
const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
```

## Why redundant state is a problem

When you store derived values as state, you have to keep them in sync manually. Every time `items` changes, you need to remember to also call `setTotal`. This is easy to forget, especially as code grows. The result is bugs where the UI shows stale or incorrect values.

```jsx
function addItem(newItem) {
  setItems([...items, newItem])
  setTotal(total + newItem.price)  // easy to forget; easy to get wrong
}
```

The computed approach is always correct because it recalculates fresh from the source data on every render.

## Identifying derived state

Ask yourself: "If I had only X, could I produce Y?" If yes, Y is derived from X.

| Derived value | Source |
|--------------|--------|
| Cart total | Items + quantities |
| Number of completed todos | Todo list |
| Filtered results | Full list + filter term |
| Full name | First name + last name |
| Is form valid | Field values |

## Computing in JSX or before the return

Both work. Use whichever is clearer:

```jsx
// Computed inline in JSX
<p>Total: ${items.reduce((s, i) => s + i.price * i.qty, 0)}</p>

// Computed before the return (better for reuse or readability)
const total = items.reduce((s, i) => s + i.price * i.qty, 0)
return <p>Total: ${total}</p>
```

## When `useMemo` helps

Derived values recompute on every render. For most data this is instant. If the computation is genuinely expensive (thousands of items, complex math), `useMemo` caches the result so it only recomputes when the source data changes. This is covered in challenge 19.

## Common mistakes

- Storing counts, totals, filtered lists, or any other computed value as state
- Keeping a `fullName` state when you have `firstName` and `lastName` states — just compute it
- Forgetting that computed values are always in sync with their source — you never need to "update" them manually
