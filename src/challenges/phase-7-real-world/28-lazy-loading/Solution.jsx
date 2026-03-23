import { useState, lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

export default function Solution() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <button onClick={() => setShow(s => !s)}>
        {show ? 'Hide Component' : 'Show Component'}
      </button>

      <Suspense fallback={<p style={{ color: '#888', marginTop: '1rem' }}>Loading...</p>}>
        {show && <HeavyComponent />}
      </Suspense>
    </div>
  )
}
