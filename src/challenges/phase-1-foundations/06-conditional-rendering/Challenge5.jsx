export const description = {
  title: 'Complex Conditions',
  concept: 'Conditional rendering · Multiple independent conditions · && · ternary',
  task: 'Build a PlanCard component with four independent conditional UI pieces: (1) a "Most Popular" badge if popular is true, (2) "Free" when price is 0 or "$X/mo" otherwise, (3) a "✓ Current plan" indicator when isCurrent is true, and (4) a "★ Recommended for you" line when recommended is true. Render three cards with different prop combinations.',
  hints: [
    'Each condition is independent — render each one separately with && or a ternary',
    '{popular && <span>Most Popular</span>}',
    '{price === 0 ? "Free" : `$${price}/mo`}',
    '{isCurrent && <p>✓ Current plan</p>}',
    'Stack multiple && conditions at different positions in the JSX tree',
  ],
  acceptance: [
    'The "Most Popular" badge only appears when popular={true}',
    '"Free" shows for price={0}; "$X/mo" shows for any positive price',
    '"✓ Current plan" shows only when isCurrent={true}',
    '"★ Recommended for you" shows only when recommended={true}',
    'Three PlanCard instances render with different prop combinations',
  ],
}

function PlanCard({ name, price, popular = false, isCurrent = false, recommended = false }) {
  // TODO: Implement the four conditional pieces described above
  return (
    <div className="card" style={{ minWidth: '140px', position: 'relative' }}>
      {/* TODO: "Most Popular" badge — only when popular */}
      <h3 style={{ margin: '0 0 0.3rem' }}>{name}</h3>
      <p style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 0.5rem', color: '#60a5fa' }}>
        {/* TODO: "Free" or "$price/mo" */}
      </p>
      {/* TODO: "✓ Current plan" — only when isCurrent */}
      {/* TODO: "★ Recommended for you" — only when recommended */}
    </div>
  )
}

export default function Challenge() {
  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <PlanCard name="Starter"    price={0}  isCurrent={true} />
      <PlanCard name="Pro"        price={12} popular={true} recommended={true} />
      <PlanCard name="Enterprise" price={49} />
    </div>
  )
}
