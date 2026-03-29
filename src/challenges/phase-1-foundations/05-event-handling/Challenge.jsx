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
  // 1. Add a boolean state to track whether the post is liked
  // 2. Wire up the button to toggle the liked state
  // 3. Display different content based on whether it's liked or not

  return (
    <div>
      <button>
        🤍 Like · 0 likes
      </button>
    </div>
  )
}
