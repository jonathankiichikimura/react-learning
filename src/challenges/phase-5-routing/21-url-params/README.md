# 21 — URL Params

## What are URL params?

URL params are dynamic segments in a route path, marked with a colon:

```
/users/42
/products/react-book
/orders/ORD-2024-001
```

The part after the colon (`:id`, `:slug`) is a param — it can be anything, and your component can read its value.

## Defining a dynamic route

```jsx
<Route path="/users/:id" element={<UserDetail />} />
```

This matches `/users/1`, `/users/42`, `/users/alice` — any value in that position.

## Reading the param with useParams

```jsx
import { useParams } from 'react-router-dom'

function UserDetail() {
  const { id } = useParams()
  // id === "42" (always a string)

  const user = users.find(u => u.id === Number(id))  // convert if needed
  return <div>{user.name}</div>
}
```

`useParams` returns an object where the keys are the param names from your route definition.

## Multiple params

```jsx
<Route path="/teams/:teamId/members/:memberId" element={<MemberDetail />} />

// In the component:
const { teamId, memberId } = useParams()
```

## The list → detail pattern

URL params enable the most common navigation pattern in data-driven apps: a list page and a detail page.

```
/users          → shows list of all users
/users/42       → shows detail for user 42
/users/42/posts → shows posts for user 42
```

```jsx
// List page
function UserList() {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  )
}

// Detail page
function UserDetail() {
  const { id } = useParams()
  const user = users.find(u => u.id === Number(id))
  if (!user) return <p>User not found. <Link to="/users">Back</Link></p>
  return <div><h2>{user.name}</h2><p>{user.bio}</p></div>
}
```

## Always handle the not-found case

A user might type `/users/999` manually. Always check that the item actually exists before rendering its properties:

```jsx
const user = users.find(u => u.id === Number(id))
if (!user) return <p>Not found.</p>
```

## URL params vs query strings

| Type | Example | Use for |
|------|---------|---------|
| URL params | `/users/:id` | Identifying a specific resource |
| Query strings | `/search?q=react` | Filters, search terms, pagination |

URL params identify *what* you're looking at. Query strings describe *how* you're viewing it.

## Common mistakes

- Forgetting params are always strings — `u.id === id` fails if `id` is a number; use `Number(id)` or `parseInt(id)`
- Not handling the case where the param doesn't match any data
