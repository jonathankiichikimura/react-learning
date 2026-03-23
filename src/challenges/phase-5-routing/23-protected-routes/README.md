# 23 — Protected Routes

## What is a protected route?

A protected (or "guarded") route only renders its content if a condition is met — usually authentication. If the condition isn't met, the user is redirected to another page (typically `/login`).

## The Navigate component

`<Navigate to="/login" />` is React Router's way to redirect declaratively. When it renders, it immediately changes the URL without the user clicking anything:

```jsx
function RequireAuth({ isLoggedIn }) {
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return <Outlet />
}
```

The `replace` prop replaces the current history entry so the user can't press "back" to sneak back in.

## The Outlet component

`<Outlet />` is a placeholder that renders whatever child route matched. It's used in layout routes and guard components:

```jsx
<Routes>
  <Route element={<RequireAuth isLoggedIn={isLoggedIn} />}>
    {/* These routes only render if RequireAuth allows it */}
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings"  element={<Settings />} />
  </Route>
</Routes>
```

When `RequireAuth` renders `<Outlet />`, the child route (Dashboard or Settings) renders inside it. When it renders `<Navigate />` instead, the user is redirected.

## The guard component pattern

```jsx
function RequireAuth({ isLoggedIn }) {
  return isLoggedIn
    ? <Outlet />
    : <Navigate to="/login" replace />
}
```

This is the minimal, reusable pattern. You wrap any routes that need protection:

```jsx
// Public routes
<Route path="/login"   element={<Login />} />
<Route path="/signup"  element={<Signup />} />

// Protected routes
<Route element={<RequireAuth isLoggedIn={isLoggedIn} />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile"   element={<Profile />} />
  <Route path="/settings"  element={<Settings />} />
</Route>
```

## In a real app

In production, `isLoggedIn` typically comes from a Context or state management store (covered in Phase 6), so `RequireAuth` can read it without needing a prop:

```jsx
function RequireAuth() {
  const { user } = useAuth()  // custom hook from your auth context
  return user ? <Outlet /> : <Navigate to="/login" replace />
}
```

## Redirecting back after login

A common enhancement: after logging in, redirect the user back to the page they were trying to reach, not always to `/dashboard`.

```jsx
function RequireAuth() {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    // Pass the current location so login can redirect back
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return <Outlet />
}

// In the Login component:
const location = useLocation()
const from = location.state?.from?.pathname || '/dashboard'
navigate(from, { replace: true })
```

## Common mistakes

- Forgetting `replace` on the Navigate component — the user can press back to bypass the guard
- Checking auth in the component itself instead of a guard — works but doesn't scale to many protected routes
- Placing the auth logic in the page component — the page briefly renders before redirecting (a flash). Guards run before the page renders.
