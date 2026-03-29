export default function Solution() {
  const language = 'react'
  const author = 'jonathan'

  return (
    <div className="card">
      <p>Math result: {6 * 7}</p>
      <p>Author: {author.toUpperCase()}</p>
      <p>{`I am learning ${language}`}</p>
    </div>
  )
}
