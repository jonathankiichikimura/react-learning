function AliceCard() {
  return (
    <div className="card" style={{ minWidth: '130px', textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🧑‍💻</div>
      <h3 style={{ margin: '0 0 0.2rem' }}>Alice Chen</h3>
      <p style={{ color: '#aaa', fontSize: '0.8rem', margin: 0 }}>Frontend Engineer</p>
    </div>
  )
}

function BobCard() {
  return (
    <div className="card" style={{ minWidth: '130px', textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🧑‍🔬</div>
      <h3 style={{ margin: '0 0 0.2rem' }}>Bob Marsh</h3>
      <p style={{ color: '#aaa', fontSize: '0.8rem', margin: 0 }}>Data Scientist</p>
    </div>
  )
}

function CarolCard() {
  return (
    <div className="card" style={{ minWidth: '130px', textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🧑‍🎨</div>
      <h3 style={{ margin: '0 0 0.2rem' }}>Carol Wu</h3>
      <p style={{ color: '#aaa', fontSize: '0.8rem', margin: 0 }}>UX Designer</p>
    </div>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', maxWidth: '480px' }}>
      <AliceCard />
      <BobCard />
      <CarolCard />
    </div>
  )
}
