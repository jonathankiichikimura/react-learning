import { useState } from 'react'
import { phases, allChallenges } from './challenges/registry'

export default function App() {
  const [selectedId, setSelectedId] = useState(1)
  const [showSolution, setShowSolution] = useState(false)
  const [expandedPhases, setExpandedPhases] = useState([1])

  const current = allChallenges.find(c => c.id === selectedId)
  const ActiveComponent = showSolution ? current.Solution : current.Challenge

  function selectChallenge(id) {
    setSelectedId(id)
    setShowSolution(false)
  }

  function togglePhase(id) {
    setExpandedPhases(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-title">React Challenges</div>
        <nav>
          {phases.map(phase => {
            const isOpen = expandedPhases.includes(phase.id)
            const hasActive = phase.challenges.some(c => c.id === selectedId)
            return (
              <div key={phase.id} className="phase-group">
                <button
                  className={`phase-header ${isOpen ? 'open' : ''} ${hasActive ? 'has-active' : ''}`}
                  onClick={() => togglePhase(phase.id)}
                >
                  <span className="phase-num">{phase.id}</span>
                  <span className="phase-name">{phase.title}</span>
                  <span className="phase-chevron">{isOpen ? '▾' : '▸'}</span>
                </button>
                {isOpen && (
                  <div className="phase-challenges">
                    {phase.challenges.map(c => (
                      <button
                        key={c.id}
                        className={`challenge-btn ${c.id === selectedId ? 'active' : ''}`}
                        onClick={() => selectChallenge(c.id)}
                      >
                        <span className="challenge-num">{String(c.id).padStart(2, '0')}</span>
                        <span>{c.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>

      <div className="main">
        <header className="challenge-header">
          <div>
            <h2>{current.description.title}</h2>
            <span className="badge">{current.description.concept}</span>
          </div>
          <button
            className={`solution-toggle ${showSolution ? 'showing' : ''}`}
            onClick={() => setShowSolution(s => !s)}
          >
            {showSolution ? '← Back to Challenge' : 'Peek at Solution'}
          </button>
        </header>

        <div className="content-area">
          <aside className="description">
            <section className="desc-section">
              <h3 className="desc-label">Task</h3>
              <p className="desc-text">{current.description.task}</p>
            </section>

            {current.description.hints && (
              <details className="hints">
                <summary>Hints ({current.description.hints.length})</summary>
                <ul>
                  {current.description.hints.map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ul>
              </details>
            )}

            <section className="desc-section">
              <h3 className="desc-label">You're done when...</h3>
              <ul className="acceptance-list">
                {current.description.acceptance.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="desc-section">
              <h3 className="desc-label">Edit this file</h3>
              <code className="file-path">
                src/challenges/{current.phaseFolder}/{current.slug}/Challenge.jsx
              </code>
            </section>
          </aside>

          <div className="preview-area">
            <div className="preview-label">
              {showSolution ? '✓ Solution' : '⚡ Your Work'}
            </div>
            <div className="preview">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
