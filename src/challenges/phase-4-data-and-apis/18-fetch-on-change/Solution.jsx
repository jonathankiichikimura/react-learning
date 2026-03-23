import { useState, useEffect } from 'react'

export default function Solution() {
  const [selectedUserId, setSelectedUserId] = useState(1)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchPosts() {
      setLoading(true)
      setPosts([])
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedUserId}/posts`)
        const data = await res.json()
        if (!cancelled) setPosts(data)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPosts()

    // Cleanup: if the user changes again before this fetch finishes, ignore the stale response
    return () => { cancelled = true }
  }, [selectedUserId])

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          User:{' '}
          <select value={selectedUserId} onChange={e => setSelectedUserId(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(id => (
              <option key={id} value={id}>User {id}</option>
            ))}
          </select>
        </label>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
