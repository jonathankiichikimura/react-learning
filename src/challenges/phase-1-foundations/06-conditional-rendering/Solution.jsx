import { useState } from 'react'

export default function Solution() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome back!</p>
          <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
        </div>
      ) : (
        <div>
          <p>You are logged out.</p>
          <button onClick={() => setIsLoggedIn(true)}>Log In</button>
        </div>
      )}
    </div>
  )
}
