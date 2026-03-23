# 28 — Lazy Loading

## What is code splitting?

When you build a React app, Vite (or webpack) bundles all your JavaScript into files. By default, everything ends up in one bundle — users download all of it on the first page load, even code for pages they never visit.

**Code splitting** breaks the bundle into smaller chunks that load on demand. Lazy loading is how you trigger this in React.

## React.lazy

`React.lazy` takes a function that returns a dynamic `import()`. The module is only fetched when the component first renders:

```jsx
// Regular import — always included in the main bundle
import HeavyChart from './HeavyChart'

// Lazy import — downloaded only when HeavyChart first renders
const HeavyChart = lazy(() => import('./HeavyChart'))
```

The `import()` syntax is a standard JavaScript feature that returns a Promise. When React needs to render `HeavyChart`, it calls the function, fetches the module, and renders it once loaded.

## Suspense

While the lazy component's code is downloading, React needs something to show. `Suspense` provides that:

```jsx
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<p>Loading chart...</p>}>
      <HeavyChart data={data} />
    </Suspense>
  )
}
```

The `fallback` renders until `HeavyChart`'s code is downloaded and ready. After that, the real component renders.

## Toggling lazy components

A common pattern: only load the heavy component when the user explicitly needs it (clicks a button, opens a tab):

```jsx
const [showChart, setShowChart] = useState(false)

return (
  <>
    <button onClick={() => setShowChart(true)}>Show Chart</button>
    <Suspense fallback={<Spinner />}>
      {showChart && <HeavyChart />}
    </Suspense>
  </>
)
```

The chart code is never downloaded unless the user clicks the button.

## Route-based code splitting

The most impactful use of lazy loading is at the route level — split each page into its own chunk:

```jsx
const Home      = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings  = lazy(() => import('./pages/Settings'))

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings"  element={<Settings />} />
      </Routes>
    </Suspense>
  )
}
```

Users only download the code for the pages they visit. This dramatically improves initial load time for large apps.

## In development vs production

In development with Vite, lazy loading is near-instant because everything is already on your local machine. The real benefit shows in production where chunks are separate files that need to be fetched over the network.

## Suspense boundaries

You can nest `Suspense` boundaries for different loading states:

```jsx
<Suspense fallback={<AppShell />}>
  <Routes>
    <Route path="/dashboard" element={
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    } />
  </Routes>
</Suspense>
```

The inner `Suspense` shows a skeleton specific to the dashboard; the outer one shows a generic app shell.

## Common mistakes

- Forgetting to wrap lazy components in `Suspense` — React throws an error at runtime
- Lazy-loading tiny components — the overhead of a network request isn't worth it for small files
- Not providing a good fallback — a blank flash is worse than a spinner
- Lazy importing inside a component (the import should be at module scope, outside all components)
