# 12 — useEffect Basics

## What is a side effect?

A **side effect** is anything a component does that reaches outside of React's render cycle:

- Updating `document.title`
- Fetching data from an API
- Setting up a timer or interval
- Subscribing to an external event
- Writing to localStorage

These can't happen during render because render must be **pure** — same input, same output, no surprises. `useEffect` is the designated escape hatch for this work.

## Basic syntax

```jsx
useEffect(() => {
  // your side effect here
}, [dependencies])
```

The effect runs **after** React has rendered and updated the DOM. Not during, not before — after.

## The dependency array

The second argument controls *when* the effect re-runs:

```jsx
// No array — runs after EVERY render
useEffect(() => {
  console.log('rendered')
})

// Empty array — runs ONCE, after the first render (like componentDidMount)
useEffect(() => {
  fetchInitialData()
}, [])

// With dependencies — runs after the first render AND whenever any dep changes
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])
```

**Rule of thumb:** Include every reactive value your effect uses (state, props, derived values). React's linter (eslint-plugin-react-hooks) will warn you if you miss one.

## How React runs effects

```
1. User triggers an event
2. State updates
3. React re-renders the component (the function runs)
4. React updates the DOM
5. useEffect runs (after the paint)
```

This ordering means effects never block the browser from showing updated UI.

## Multiple effects

You can (and should) use multiple `useEffect` calls for separate concerns:

```jsx
// Effect 1: sync the title
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])

// Effect 2: save to localStorage
useEffect(() => {
  localStorage.setItem('count', count)
}, [count])
```

Keeping effects focused makes them easier to reason about and test.

## Effects and state

Effects often read state to do their work. The dependency array ensures the effect re-runs with fresh values when that state changes:

```jsx
const [query, setQuery] = useState('')

useEffect(() => {
  // This uses query — so query must be in the deps array
  search(query).then(results => setResults(results))
}, [query])  // re-runs whenever query changes
```

## Common mistakes

- Using an empty `[]` when you mean the effect to re-run on state changes — causes stale closures (the effect captures old state values and never sees updates)
- Omitting a dep that the effect uses — the linter catches this
- Putting the effect cleanup in the wrong place — covered in challenge 13
