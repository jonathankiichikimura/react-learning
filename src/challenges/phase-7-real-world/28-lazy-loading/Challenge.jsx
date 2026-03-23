import { useState, lazy, Suspense } from 'react'

export const description = {
  title: 'Lazy Loading',
  concept: 'React.lazy · Suspense · Code splitting',
  task: 'HeavyComponent.jsx already exists in this folder. Import it lazily so its code is only loaded when the user clicks "Show Component". Wrap it in a Suspense boundary with a loading fallback.',
  hints: [
    'Lazy import (at the top of the file, outside the component): const HeavyComponent = lazy(() => import("./HeavyComponent"))',
    'Wrap with Suspense: <Suspense fallback={<p>Loading...</p>}><HeavyComponent /></Suspense>',
    'The lazy import only executes (fetches the module) the first time HeavyComponent renders',
    'In dev, loading is near-instant. In production, this splits the bundle so the code isn\'t downloaded upfront.',
    'Suspense\'s fallback renders while the lazy module is being fetched',
  ],
  acceptance: [
    'HeavyComponent is imported with lazy() — not a regular import',
    'It\'s wrapped in a Suspense boundary with a fallback',
    'A "Show Component" button toggles whether HeavyComponent is rendered',
    'The app works correctly',
  ],
}

// TODO: Replace this regular import with a lazy import
// import HeavyComponent from './HeavyComponent'
// const HeavyComponent = lazy(() => import('./HeavyComponent'))

export default function Challenge() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <button onClick={() => setShow(s => !s)}>
        {show ? 'Hide Component' : 'Show Component'}
      </button>

      {/* TODO: Wrap HeavyComponent in Suspense and render it when show is true */}
      {show && <p style={{ color: '#888' }}>Add HeavyComponent here inside Suspense</p>}
    </div>
  )
}
