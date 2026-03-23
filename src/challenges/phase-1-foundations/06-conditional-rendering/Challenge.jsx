import { useState } from 'react'

export const description = {
  title: 'Conditional Rendering',
  concept: 'Ternary · && · Conditional JSX',
  task: 'Build a login/logout toggle. When logged out, show "You are logged out." and a "Log In" button. When logged in, show "Welcome back!" and a "Log Out" button. Clicking either button should switch the view.',
  hints: [
    'Use a boolean state: const [isLoggedIn, setIsLoggedIn] = useState(false)',
    'Use a ternary in JSX: {isLoggedIn ? <LoggedInView /> : <LoggedOutView />}',
    'You can also inline it directly without separate components',
    'The && operator is useful for showing something only when true: {isLoggedIn && <p>Welcome!</p>}',
    'You can put the ternary inside the return, or use an if statement before the return',
  ],
  acceptance: [
    'Initially shows "You are logged out." and a "Log In" button',
    'Clicking "Log In" switches to "Welcome back!" and a "Log Out" button',
    'Clicking "Log Out" switches back to the logged out view',
  ],
}

export default function Challenge() {
  // TODO:
  // 1. Add an isLoggedIn boolean state (starts as false)
  // 2. When logged OUT: show a message and a "Log In" button that sets isLoggedIn to true
  // 3. When logged IN: show a welcome message and a "Log Out" button that sets isLoggedIn to false
  // Use a ternary: {isLoggedIn ? (...logged in JSX...) : (...logged out JSX...)}
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function LoggedInView() {
    return (
      <div>
        <p>Welcome back!</p>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Log out</button>
      </div>
    )
  }

  function LoggedOutView() {
    return (
      <div>
        <p>You are logged out.</p>
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Log In</button>
      </div>
    )
  }

  return (
    isLoggedIn ? <LoggedInView></LoggedInView> : <LoggedOutView></LoggedOutView>
  )
}
