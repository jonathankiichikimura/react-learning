function PlanCard({ name, price, popular = false, isCurrent = false, recommended = false }) {
  return (
    <div className="card" style={{ minWidth: '140px', position: 'relative', paddingTop: popular ? '2rem' : undefined }}>
      {popular && (
        <span style={{
          position: 'absolute', top: '0.5rem', right: '0.5rem',
          background: '#3b82f6', color: '#fff', fontSize: '0.7rem',
          padding: '0.15rem 0.5rem', borderRadius: '999px', fontWeight: 600,
        }}>
          Most Popular
        </span>
      )}
      <h3 style={{ margin: '0 0 0.3rem' }}>{name}</h3>
      <p style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#60a5fa' }}>
        {price === 0 ? 'Free' : `$${price}/mo`}
      </p>
      {isCurrent && (
        <p style={{ fontSize: '0.75rem', color: '#4ade80', margin: '0 0 0.25rem' }}>✓ Current plan</p>
      )}
      {recommended && (
        <p style={{ fontSize: '0.75rem', color: '#aaa', margin: 0 }}>★ Recommended for you</p>
      )}
    </div>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <PlanCard name="Starter"    price={0}  isCurrent={true} />
      <PlanCard name="Pro"        price={12} popular={true} recommended={true} />
      <PlanCard name="Enterprise" price={49} />
    </div>
  )
}
