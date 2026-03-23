# React Learning Environment

A challenge-based environment for learning React from scratch — structured as a 28-challenge curriculum targeting new-grad / entry-level React job readiness.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node)

Check your versions:

```bash
node -v
npm -v
```

## Installation

Clone (or download) the repo, then install dependencies:

```bash
git clone git@github.com:jonathankiichikimura/react-learning.git
cd react
npm install
```

## Running the Dev Server

```bash
npm run dev
```

Open the URL shown in your terminal — usually **http://localhost:5173**.

The app hot-reloads on save, so changes to any `Challenge.jsx` appear instantly in the preview pane.

## Other Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

## How It Works

The app is a self-contained learning environment with three panels:

| Panel | Purpose |
|-------|---------|
| **Left sidebar** | Navigate between challenges, grouped by phase |
| **Description panel** | Task description, hints, and acceptance criteria |
| **Preview pane** | Your code renders live here |

Each challenge has a **"Peek at Solution"** toggle — use it only after genuinely attempting the problem.

## Workflow

1. Select a challenge from the sidebar
2. Open the file shown at the bottom of the description panel
   - e.g. `src/challenges/phase-1-foundations/01-hello-jsx/Challenge.jsx`
3. Read the task description and the `// TODO` comments in the file
4. Edit and save — the preview updates instantly
5. Verify all acceptance criteria pass, then move on

Each challenge folder also contains a `README.md` with a deeper explanation of the concept — worth reading before or after you attempt the challenge.

## Curriculum

28 challenges across 7 phases. Work through them in order — each phase builds on the last.

### Phase 1 — Foundations (01–07)
The mental model. How React thinks about UI.

| # | Challenge | Concepts |
|---|-----------|---------|
| 01 | Hello JSX | JSX syntax, returning markup from a component |
| 02 | Your First Component | Component functions, composition |
| 03 | Props | Passing data into components, reusability |
| 04 | useState | State, hooks, re-rendering cycle |
| 05 | Event Handling | onClick, function references vs calls |
| 06 | Conditional Rendering | Ternary, `&&`, conditional JSX |
| 07 | Lists & Keys | `.map()`, the `key` prop, dynamic data |

### Phase 2 — Component Patterns (08–11)
How real components are structured.

| # | Challenge | Concepts |
|---|-----------|---------|
| 08 | Controlled Forms | Controlled inputs, `onSubmit`, `e.preventDefault()` |
| 09 | Lifting State Up | Sharing state between siblings via parent |
| 10 | The children Prop | Reusable container/wrapper components |
| 11 | Derived State | Computing values from state instead of storing duplicates |

### Phase 3 — Core Hooks (12–16)
The hooks that appear in nearly every production codebase.

| # | Challenge | Concepts |
|---|-----------|---------|
| 12 | useEffect Basics | Side effects, dependency array |
| 13 | useEffect Cleanup | Cleanup functions, preventing memory leaks |
| 14 | useRef | DOM refs, mutable values without re-rendering |
| 15 | useReducer | Complex state, actions, reducer functions |
| 16 | Custom Hooks | Extracting stateful logic into reusable `use*` functions |

### Phase 4 — Data & APIs (17–19)
Real apps fetch data. Heavily represented in take-home interviews.

| # | Challenge | Concepts |
|---|-----------|---------|
| 17 | Fetching Data | `fetch` + `useEffect`, loading/error/data states |
| 18 | Fetch on Change | Re-fetching when a dependency changes, race condition prevention |
| 19 | useMemo & useCallback | Memoizing expensive computations and stable function refs |

### Phase 5 — Routing (20–23)
Every multi-page React app uses React Router. Interviewers assume you know it.

| # | Challenge | Concepts |
|---|-----------|---------|
| 20 | Basic Routing | `Routes`, `Route`, `Link` — declarative navigation |
| 21 | URL Params | `useParams` to read dynamic `:id` segments |
| 22 | Programmatic Navigation | `useNavigate` to redirect after events |
| 23 | Protected Routes | Redirect unauthenticated users with `<Navigate>` |

### Phase 6 — State Management (24–26)
Once apps grow, local state isn't enough. Three approaches in increasing power.

| # | Challenge | Concepts |
|---|-----------|---------|
| 24 | useContext | Sharing data without prop drilling, Provider + Consumer |
| 25 | Context + useReducer | Lightweight global state pattern |
| 26 | Zustand | Industry-standard external state library — no Provider needed |

### Phase 7 — Real-World Patterns (27–28)
Performance and code-splitting — topics that come up in senior-leaning interviews.

| # | Challenge | Concepts |
|---|-----------|---------|
| 27 | React.memo | Skipping re-renders when props haven't changed |
| 28 | Lazy Loading | Code splitting with `React.lazy` + `Suspense` |

## Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev/) | 18 | UI library |
| [Vite](https://vitejs.dev/) | 6 | Dev server and bundler |
| [React Router](https://reactrouter.com/) | 7 | Routing (phases 5 + app shell) |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5 | State management (challenge 26) |

## Tips

- **Break things on purpose** — the best way to understand a concept is to push it until it breaks
- **Read the error messages** — React's errors are descriptive; treat them as hints
- **Open DevTools** — `Cmd+Option+I` (Mac) or `Ctrl+Shift+I` (Windows/Linux); check the console often
- **Use the hints** — the description panel has hints that nudge without giving away the answer
- **Read the READMEs** — each challenge folder has a `README.md` explaining the concept in depth
- **Use "Peek at Solution" sparingly** — try to struggle first; that's where the learning happens

## After This Curriculum

These challenges cover what's expected of a new-grad or junior React developer. Next steps:

- **Testing** — React Testing Library (RTL), `userEvent`, `msw` for API mocking
- **TypeScript** — typing props, state, events, and API responses
- **TanStack Query** — server state management; replaces manual `fetch`/`useEffect` patterns
- **React Hook Form** — performant forms at scale
- **Next.js** — the most common React framework in production (SSR, file-based routing, API routes)
