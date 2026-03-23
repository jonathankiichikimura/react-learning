import { useState, useEffect } from 'react'

export const description = {
  title: 'Fetching Data',
  concept: 'useEffect · fetch · Loading & error states',
  task: 'Fetch a list of users from https://jsonplaceholder.typicode.com/users when the component mounts. Show "Loading..." while the request is in flight, an error message if it fails, and the list of user names and emails once the data arrives.',
  hints: [
    'Use useEffect with an empty [] deps array to run once on mount',
    'Track three states: loading (boolean), error (string|null), users (array)',
    'fetch() is Promise-based: fetch(url).then(res => res.json()).then(data => setUsers(data))',
    'You can\'t make the useEffect callback itself async — define an inner async function instead:',
    '  useEffect(() => { async function load() { ... } load() }, [])',
    'Set loading to false in a finally block so it always clears, even on error',
    'Test the error state by temporarily changing the URL to something invalid',
  ],
  acceptance: [
    '"Loading..." appears while the request is in flight',
    'A list of user names and emails renders when the data arrives',
    'Changing the URL to something broken shows an error message',
    'loading, error, and users are stored as separate state variables',
  ],
}

export default function Challenge() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // TODO:
  // Add a useEffect that fetches from 'https://jsonplaceholder.typicode.com/users'
  // Handle loading, error, and success states

  if (loading) return <p>Loading...</p>
  if (error)   return <p style={{ color: '#f87171' }}>Error: {error}</p>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          <strong>{user.name}</strong> — {user.email}
        </li>
      ))}
    </ul>
  )
}
