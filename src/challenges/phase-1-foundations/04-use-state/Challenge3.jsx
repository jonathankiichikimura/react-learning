import { useState } from 'react'

export const description = {
  title: 'Object State',
  concept: 'useState · Object state · Spread operator · Immutability',
  task: 'Build a profile editor with Name and Bio text inputs. Store both values in a SINGLE state object: { name: "", bio: "" }. Both inputs must be controlled. Show a live preview card below that updates as the user types.',
  hints: [
    'Initialize with an object: const [profile, setProfile] = useState({ name: "", bio: "" })',
    'To update one field, spread the rest: setProfile({ ...profile, name: e.target.value })',
    'Never mutate state directly: profile.name = "x" will NOT trigger a re-render',
    'Each input\'s value comes from the object: value={profile.name}',
  ],
  acceptance: [
    'Both inputs are controlled (typing updates the display immediately)',
    'Both fields share ONE state object — not two separate useState calls',
    'A live preview below shows the current name and bio',
    'Updating one field does not reset the other',
  ],
}

export default function Challenge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '320px' }}>
      {/* TODO: Add a single state object { name: '', bio: '' },
               wire up both inputs, and show a live preview card below */}
    </div>
  )
}
