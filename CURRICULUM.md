# React Curriculum — New-Grad Readiness

28 challenges across 7 phases. Work through them in order — each phase builds directly on the last.

---

## Phase 1 — Foundations (01–07)
> The mental model. How React thinks about UI.

| # | Challenge | What you learn |
|---|-----------|---------------|
| 01 | Hello JSX | JSX is JavaScript that looks like HTML |
| 02 | Your First Component | Components are functions that return JSX |
| 03 | Props | Pass data into components to make them reusable |
| 04 | useState | State triggers re-renders; never mutate directly |
| 05 | Event Handling | onClick needs a function reference, not a call |
| 06 | Conditional Rendering | Ternary and && to show/hide UI |
| 07 | Lists & Keys | .map() to render arrays; key prop is required |

---

## Phase 2 — Component Patterns (08–11)
> How real components are structured. This is where most beginners get stuck.

| # | Challenge | What you learn |
|---|-----------|---------------|
| 08 | Controlled Forms | React owns input values; onSubmit + e.preventDefault() |
| 09 | Lifting State Up | Siblings share state through their parent |
| 10 | The children Prop | Wrap arbitrary JSX with reusable container components |
| 11 | Derived State | Compute values from state instead of storing duplicates |

---

## Phase 3 — Core Hooks (12–16)
> The hooks that appear in nearly every production codebase.

| # | Challenge | What you learn |
|---|-----------|---------------|
| 12 | useEffect Basics | Run side effects after render; dependency array |
| 13 | useEffect Cleanup | Return a cleanup function to prevent memory leaks |
| 14 | useRef | Access DOM elements; store mutable values without re-rendering |
| 15 | useReducer | Manage complex state with actions and a reducer function |
| 16 | Custom Hooks | Extract stateful logic into reusable `use*` functions |

---

## Phase 4 — Data & APIs (17–19)
> Real apps fetch data. This phase is heavily represented in take-home interviews.

| # | Challenge | What you learn |
|---|-----------|---------------|
| 17 | Fetching Data | fetch + useEffect; loading, error, and data states |
| 18 | Fetch on Change | Re-fetch when a dependency changes |
| 19 | useMemo & useCallback | Cache expensive computations and stable function refs |

---

## Phase 5 — Routing (20–23)
> Every multi-page React app uses React Router. Interviewers assume you know it.

| # | Challenge | What you learn |
|---|-----------|---------------|
| 20 | Basic Routing | Routes, Route, Link — declarative navigation |
| 21 | URL Params | useParams to read dynamic :id segments from the URL |
| 22 | Programmatic Navigation | useNavigate to redirect after events (e.g. login) |
| 23 | Protected Routes | Redirect unauthenticated users with Navigate |

---

## Phase 6 — State Management (24–26)
> Once apps grow, local state isn't enough. Three approaches in increasing power.

| # | Challenge | What you learn |
|---|-----------|---------------|
| 24 | useContext | Share data without prop drilling; Provider + Consumer |
| 25 | Context + useReducer | Global state pattern used in many mid-size apps |
| 26 | Zustand | Industry-standard lightweight state library (no Provider needed) |

---

## Phase 7 — Real-World Patterns (27–28)
> Performance and code-splitting — topics that come up in senior-leaning roles.

| # | Challenge | What you learn |
|---|-----------|---------------|
| 27 | React.memo | Skip re-renders when props haven't changed |
| 28 | Lazy Loading | Code-split with React.lazy + Suspense |

---

## After this curriculum

These challenges cover what's expected of a new-grad or junior React developer. To go further:

**Testing**
- React Testing Library (RTL) — industry standard for component tests
- `userEvent` for simulating real user interactions
- `msw` (Mock Service Worker) for mocking API calls in tests

**TypeScript**
- Typing props, state, events, and API responses
- Generic components and utility types

**Ecosystem**
- TanStack Query (React Query) — server state management, replaces manual fetch/useEffect patterns
- React Hook Form — performant forms at scale
- Next.js — the most common React framework in production (SSR, file-based routing, API routes)

**Patterns to study**
- Compound components
- Render props (legacy but useful to recognize)
- Optimistic UI updates
- Infinite scroll / pagination
