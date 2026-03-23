// ─── Phase 1: Foundations ────────────────────────────────────────────────────
import Challenge01, { description as desc01 } from './phase-1-foundations/01-hello-jsx/Challenge'
import Solution01 from './phase-1-foundations/01-hello-jsx/Solution'
import Challenge02, { description as desc02 } from './phase-1-foundations/02-components/Challenge'
import Solution02 from './phase-1-foundations/02-components/Solution'
import Challenge03, { description as desc03 } from './phase-1-foundations/03-props/Challenge'
import Solution03 from './phase-1-foundations/03-props/Solution'
import Challenge04, { description as desc04 } from './phase-1-foundations/04-use-state/Challenge'
import Solution04 from './phase-1-foundations/04-use-state/Solution'
import Challenge05, { description as desc05 } from './phase-1-foundations/05-event-handling/Challenge'
import Solution05 from './phase-1-foundations/05-event-handling/Solution'
import Challenge06, { description as desc06 } from './phase-1-foundations/06-conditional-rendering/Challenge'
import Solution06 from './phase-1-foundations/06-conditional-rendering/Solution'
import Challenge07, { description as desc07 } from './phase-1-foundations/07-lists-and-keys/Challenge'
import Solution07 from './phase-1-foundations/07-lists-and-keys/Solution'

// ─── Phase 2: Component Patterns ─────────────────────────────────────────────
import Challenge08, { description as desc08 } from './phase-2-component-patterns/08-controlled-forms/Challenge'
import Solution08 from './phase-2-component-patterns/08-controlled-forms/Solution'
import Challenge09, { description as desc09 } from './phase-2-component-patterns/09-lifting-state/Challenge'
import Solution09 from './phase-2-component-patterns/09-lifting-state/Solution'
import Challenge10, { description as desc10 } from './phase-2-component-patterns/10-children-prop/Challenge'
import Solution10 from './phase-2-component-patterns/10-children-prop/Solution'
import Challenge11, { description as desc11 } from './phase-2-component-patterns/11-derived-state/Challenge'
import Solution11 from './phase-2-component-patterns/11-derived-state/Solution'

// ─── Phase 3: Core Hooks ──────────────────────────────────────────────────────
import Challenge12, { description as desc12 } from './phase-3-core-hooks/12-use-effect-basics/Challenge'
import Solution12 from './phase-3-core-hooks/12-use-effect-basics/Solution'
import Challenge13, { description as desc13 } from './phase-3-core-hooks/13-use-effect-cleanup/Challenge'
import Solution13 from './phase-3-core-hooks/13-use-effect-cleanup/Solution'
import Challenge14, { description as desc14 } from './phase-3-core-hooks/14-use-ref/Challenge'
import Solution14 from './phase-3-core-hooks/14-use-ref/Solution'
import Challenge15, { description as desc15 } from './phase-3-core-hooks/15-use-reducer/Challenge'
import Solution15 from './phase-3-core-hooks/15-use-reducer/Solution'
import Challenge16, { description as desc16 } from './phase-3-core-hooks/16-custom-hooks/Challenge'
import Solution16 from './phase-3-core-hooks/16-custom-hooks/Solution'

// ─── Phase 4: Data & APIs ─────────────────────────────────────────────────────
import Challenge17, { description as desc17 } from './phase-4-data-and-apis/17-fetch-data/Challenge'
import Solution17 from './phase-4-data-and-apis/17-fetch-data/Solution'
import Challenge18, { description as desc18 } from './phase-4-data-and-apis/18-fetch-on-change/Challenge'
import Solution18 from './phase-4-data-and-apis/18-fetch-on-change/Solution'
import Challenge19, { description as desc19 } from './phase-4-data-and-apis/19-use-memo/Challenge'
import Solution19 from './phase-4-data-and-apis/19-use-memo/Solution'

// ─── Phase 5: Routing ─────────────────────────────────────────────────────────
import Challenge20, { description as desc20 } from './phase-5-routing/20-basic-routing/Challenge'
import Solution20 from './phase-5-routing/20-basic-routing/Solution'
import Challenge21, { description as desc21 } from './phase-5-routing/21-url-params/Challenge'
import Solution21 from './phase-5-routing/21-url-params/Solution'
import Challenge22, { description as desc22 } from './phase-5-routing/22-programmatic-navigation/Challenge'
import Solution22 from './phase-5-routing/22-programmatic-navigation/Solution'
import Challenge23, { description as desc23 } from './phase-5-routing/23-protected-routes/Challenge'
import Solution23 from './phase-5-routing/23-protected-routes/Solution'

// ─── Phase 6: State Management ───────────────────────────────────────────────
import Challenge24, { description as desc24 } from './phase-6-state-management/24-use-context/Challenge'
import Solution24 from './phase-6-state-management/24-use-context/Solution'
import Challenge25, { description as desc25 } from './phase-6-state-management/25-context-reducer/Challenge'
import Solution25 from './phase-6-state-management/25-context-reducer/Solution'
import Challenge26, { description as desc26 } from './phase-6-state-management/26-zustand/Challenge'
import Solution26 from './phase-6-state-management/26-zustand/Solution'

// ─── Phase 7: Real-World Patterns ────────────────────────────────────────────
import Challenge27, { description as desc27 } from './phase-7-real-world/27-react-memo/Challenge'
import Solution27 from './phase-7-real-world/27-react-memo/Solution'
import Challenge28, { description as desc28 } from './phase-7-real-world/28-lazy-loading/Challenge'
import Solution28 from './phase-7-real-world/28-lazy-loading/Solution'

// ─── Phase definitions ────────────────────────────────────────────────────────

export const phases = [
  {
    id: 1,
    title: 'Foundations',
    folder: 'phase-1-foundations',
    challenges: [
      { id:  1, slug: '01-hello-jsx',             title: 'Hello JSX',             description: desc01, Challenge: Challenge01, Solution: Solution01 },
      { id:  2, slug: '02-components',            title: 'Your First Component',   description: desc02, Challenge: Challenge02, Solution: Solution02 },
      { id:  3, slug: '03-props',                 title: 'Props',                  description: desc03, Challenge: Challenge03, Solution: Solution03 },
      { id:  4, slug: '04-use-state',             title: 'useState',               description: desc04, Challenge: Challenge04, Solution: Solution04 },
      { id:  5, slug: '05-event-handling',        title: 'Event Handling',         description: desc05, Challenge: Challenge05, Solution: Solution05 },
      { id:  6, slug: '06-conditional-rendering', title: 'Conditional Rendering',  description: desc06, Challenge: Challenge06, Solution: Solution06 },
      { id:  7, slug: '07-lists-and-keys',        title: 'Lists & Keys',           description: desc07, Challenge: Challenge07, Solution: Solution07 },
    ],
  },
  {
    id: 2,
    title: 'Component Patterns',
    folder: 'phase-2-component-patterns',
    challenges: [
      { id:  8, slug: '08-controlled-forms', title: 'Controlled Forms',   description: desc08, Challenge: Challenge08, Solution: Solution08 },
      { id:  9, slug: '09-lifting-state',    title: 'Lifting State Up',   description: desc09, Challenge: Challenge09, Solution: Solution09 },
      { id: 10, slug: '10-children-prop',    title: 'The children Prop',  description: desc10, Challenge: Challenge10, Solution: Solution10 },
      { id: 11, slug: '11-derived-state',    title: 'Derived State',      description: desc11, Challenge: Challenge11, Solution: Solution11 },
    ],
  },
  {
    id: 3,
    title: 'Core Hooks',
    folder: 'phase-3-core-hooks',
    challenges: [
      { id: 12, slug: '12-use-effect-basics',  title: 'useEffect Basics',  description: desc12, Challenge: Challenge12, Solution: Solution12 },
      { id: 13, slug: '13-use-effect-cleanup', title: 'useEffect Cleanup', description: desc13, Challenge: Challenge13, Solution: Solution13 },
      { id: 14, slug: '14-use-ref',            title: 'useRef',            description: desc14, Challenge: Challenge14, Solution: Solution14 },
      { id: 15, slug: '15-use-reducer',        title: 'useReducer',        description: desc15, Challenge: Challenge15, Solution: Solution15 },
      { id: 16, slug: '16-custom-hooks',       title: 'Custom Hooks',      description: desc16, Challenge: Challenge16, Solution: Solution16 },
    ],
  },
  {
    id: 4,
    title: 'Data & APIs',
    folder: 'phase-4-data-and-apis',
    challenges: [
      { id: 17, slug: '17-fetch-data',      title: 'Fetching Data',          description: desc17, Challenge: Challenge17, Solution: Solution17 },
      { id: 18, slug: '18-fetch-on-change', title: 'Fetch on Change',        description: desc18, Challenge: Challenge18, Solution: Solution18 },
      { id: 19, slug: '19-use-memo',        title: 'useMemo & useCallback',  description: desc19, Challenge: Challenge19, Solution: Solution19 },
    ],
  },
  {
    id: 5,
    title: 'Routing',
    folder: 'phase-5-routing',
    challenges: [
      { id: 20, slug: '20-basic-routing',             title: 'Basic Routing',          description: desc20, Challenge: Challenge20, Solution: Solution20 },
      { id: 21, slug: '21-url-params',                title: 'URL Params',             description: desc21, Challenge: Challenge21, Solution: Solution21 },
      { id: 22, slug: '22-programmatic-navigation',   title: 'Programmatic Nav',       description: desc22, Challenge: Challenge22, Solution: Solution22 },
      { id: 23, slug: '23-protected-routes',          title: 'Protected Routes',       description: desc23, Challenge: Challenge23, Solution: Solution23 },
    ],
  },
  {
    id: 6,
    title: 'State Management',
    folder: 'phase-6-state-management',
    challenges: [
      { id: 24, slug: '24-use-context',     title: 'useContext',          description: desc24, Challenge: Challenge24, Solution: Solution24 },
      { id: 25, slug: '25-context-reducer', title: 'Context + useReducer',description: desc25, Challenge: Challenge25, Solution: Solution25 },
      { id: 26, slug: '26-zustand',         title: 'Zustand',             description: desc26, Challenge: Challenge26, Solution: Solution26 },
    ],
  },
  {
    id: 7,
    title: 'Real-World Patterns',
    folder: 'phase-7-real-world',
    challenges: [
      { id: 27, slug: '27-react-memo',   title: 'React.memo',    description: desc27, Challenge: Challenge27, Solution: Solution27 },
      { id: 28, slug: '28-lazy-loading', title: 'Lazy Loading',  description: desc28, Challenge: Challenge28, Solution: Solution28 },
    ],
  },
]

export const allChallenges = phases.flatMap(p =>
  p.challenges.map(c => ({ ...c, phaseFolder: p.folder }))
)
