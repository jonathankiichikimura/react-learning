import { useState, useEffect } from 'react'

export const description = {
  title: 'Fetch on Change',
  concept: 'useEffect dependencies · Refetch on state change',
  task: 'Build a user post explorer. A dropdown lets you select a user (IDs 1–5). When the selection changes, fetch that user\'s posts from JSONPlaceholder and display their titles. Show a loading state between each fetch.',
  hints: [
    'Put selectedUserId in the deps array: useEffect(() => { ... }, [selectedUserId])',
    'The effect re-runs every time selectedUserId changes',
    'Reset posts to [] and loading to true at the start of each fetch',
    'URL: `https://jsonplaceholder.typicode.com/users/${selectedUserId}/posts`',
    'Each user has ~10 posts — just display their titles',
  ],
  acceptance: [
    'A dropdown shows user IDs 1–5',
    'Selecting a user fetches and displays their posts',
    'A loading state shows between selections',
    'Posts update correctly each time a new user is selected',
  ],
}

export default function Challenge() {
  const [selectedUserId, setSelectedUserId] = useState(1)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // TODO:
  // Add a useEffect that fetches posts for the selectedUserId.
  // Put selectedUserId in the dependency array so it re-runs on change.
  // Reset loading to true and posts to [] at the start of each fetch.

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
