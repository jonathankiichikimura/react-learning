# 22 — Programmatic Navigation

## Declarative vs programmatic navigation

`<Link>` handles navigation that's triggered directly by a click on a visible element. **Programmatic navigation** is navigation triggered by code logic — after a form submits successfully, after an API call completes, after authentication, after a timer.

```jsx
// Declarative — user clicks a visible element
<Link to="/dashboard">Go to dashboard</Link>

// Programmatic — code decides when to navigate
function handleLogin() {
  await authenticate(credentials)
  navigate('/dashboard')  // happens after login succeeds
}
```

## The useNavigate hook

```jsx
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await login(email, password)
    navigate('/dashboard')          // navigate to a path
  }
}
```

## Navigation options

```jsx
navigate('/about')              // go to /about
navigate(-1)                    // go back one page (like browser back button)
navigate(1)                     // go forward one page
navigate('/login', { replace: true })  // replace current history entry (no back button)
```

The `replace: true` option is important for login flows — after logging in you don't want the user to press "back" and return to the login page.

## Passing state with navigation

You can pass state along with the navigation — the destination component can read it:

```jsx
// Navigate with state
navigate('/dashboard', { state: { fromLogin: true, email } })

// Read it at the destination
import { useLocation } from 'react-router-dom'

function Dashboard() {
  const { state } = useLocation()
  console.log(state?.email)  // whatever was passed
}
```

Note: this state lives only in session memory — it disappears on refresh. Use URL params or a global store for persistent data.

## Where useNavigate can be called

`useNavigate` must be called inside a component that renders within a `<Router>`. You can't call it outside of React (e.g. in a utility function or event listener outside a component). For those cases, you'd pass the navigate function as a callback.

## Common use cases

```jsx
// After form submit
navigate('/success')

// After API call
await deleteItem(id)
navigate('/items')

// After timeout
setTimeout(() => navigate('/home'), 3000)

// Redirect on error
catch (err) {
  navigate('/error', { state: { message: err.message } })
}
```

## Common mistakes

- Calling `navigate` during render (not inside an event handler or effect) — causes an infinite navigation loop
- Forgetting `e.preventDefault()` on form submit before navigating — the page reloads and the navigation never fires
- Using `navigate` for navigations that should be `<Link>` — prefer declarative when possible, imperative when necessary
