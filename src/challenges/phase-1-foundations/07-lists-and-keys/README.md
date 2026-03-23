# 07 — Lists & Keys

## Rendering arrays with `.map()`

The standard way to render a list of data in React is `.map()` — it transforms an array of data into an array of JSX elements:

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

The array of JSX that `.map()` returns gets rendered by React just like any other JSX.

## Why keys are required

When React re-renders a list, it needs to know which items changed, which were added, and which were removed. **Keys are how React identifies each item.**

Without keys, React has to re-render every item from scratch when the list changes. With keys, React can surgically update only what changed — preserving focus states, input values, animations, and performance.

```jsx
// ❌ Missing key — React warns and may behave incorrectly
{items.map(item => <li>{item.text}</li>)}

// ✅ With a unique key
{items.map(item => <li key={item.id}>{item.text}</li>)}
```

## What makes a good key?

A key must be:
1. **Unique among siblings** (not globally)
2. **Stable** — the same item should always have the same key across renders

```jsx
// ✅ Database IDs are ideal
{users.map(user => <UserCard key={user.id} user={user} />)}

// ✅ Stable unique strings
{tabs.map(tab => <Tab key={tab.slug} tab={tab} />)}

// ❌ Array indexes — dangerous if the list reorders, filters, or prepends
{items.map((item, index) => <li key={index}>{item}</li>)}
```

**Why is the array index dangerous?** If you delete the first item, every item's index shifts. React sees "index 0 changed" and re-renders everything, losing input focus and animation state. Use real IDs from your data.

## Adding items to a list

When adding new items, never mutate the array. Spread the existing array and add the new item:

```jsx
function addTodo(text) {
  setTodos([...todos, { id: Date.now(), text }])
}
```

`Date.now()` is fine for generating temporary IDs in a UI — it returns the current timestamp as a number, which is unique enough for a list.

## Filtering and transforming lists

```jsx
// Filter
const completed = todos.filter(todo => todo.done)

// Filter + map together
{todos
  .filter(todo => !todo.done)
  .map(todo => <li key={todo.id}>{todo.text}</li>)
}
```

## Common mistakes

- Using index as key when the list can change order → broken re-renders
- Forgetting the key entirely → React warning and potential bugs
- Putting the key on the wrong element — it must be on the outermost element returned by `.map()`
- Trying to use `.forEach()` instead of `.map()` — forEach doesn't return anything, map does
