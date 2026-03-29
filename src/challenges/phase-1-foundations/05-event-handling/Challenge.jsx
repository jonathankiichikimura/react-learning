import { useState } from 'react'

export const description = {
  title: 'Event Handling',
  concept: 'onClick · Event handlers · State',
  task: 'Build a "Like" button that toggles between liked and unliked when clicked. When unliked it shows "🤍 Like · 0 likes". When liked it shows "❤️ Liked · 1 like". The button\'s appearance should visually change too.',
  hints: [
    'Attach a click handler: <button onClick={handleClick}> or inline: <button onClick={() => setLiked(!liked)}>',
    'Toggle a boolean: setLiked(!liked) — the ! operator flips true to false and vice versa',
    'Use a ternary to show different content: {liked ? "❤️ Liked" : "🤍 Like"}',
    'You can also change styles conditionally: style={{ color: liked ? "red" : "gray" }}',
  ],
  acceptance: [
    'A button is rendered on screen',
    'Clicking the button toggles between liked and unliked',
    'Shows "🤍 Like · 0 likes" when not liked',
    'Shows "❤️ Liked · 1 like" when liked',
    'Clicking again un-likes it',
  ],
}

export default function Challenge() {
  // TODO:
  // 1. Create a liked boolean state: const [liked, setLiked] = useState(false)
  const [liked, setLiked] = useState(false)
  // 2. Add an onClick handler that toggles liked
  // 3. Use a ternary to display the right emoji and text based on liked

  function handleClick() {
    setLiked(!liked)
  }

  return (
    <div>
      <button onClick={handleClick}>
        {liked ? "❤️ Liked · 1 like" : "🤍 Like · 0 likes"}
      </button>
    </div>
  )
}
