import { useState } from 'react'

export default function Solution() {
  const [liked, setLiked] = useState(false)

  return (
    <div>
      <button
        onClick={() => setLiked(!liked)}
        style={{ color: liked ? '#f87171' : '#aaa', borderColor: liked ? '#7f1d1d' : '#3a3a3a' }}
      >
        {liked ? '❤️ Liked · 1 like' : '🤍 Like · 0 likes'}
      </button>
    </div>
  )
}
