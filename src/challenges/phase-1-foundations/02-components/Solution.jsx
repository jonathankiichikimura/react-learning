function UserCard() {
  return (
    <div className="card">
      <span style={{ fontSize: '3rem' }}>🧑‍💻</span>
      <h3>Jonathan</h3>
      <p>React Learner</p>
    </div>
  )
}

export default function Solution() {
  return (
    <div>
      <UserCard />
    </div>
  )
}
