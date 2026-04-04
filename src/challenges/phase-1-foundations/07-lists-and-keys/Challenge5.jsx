import { useState } from 'react'

export const description = {
  title: 'Add & Inline Edit',
  concept: 'Array state · Adding items · Inline editing · Conditional rendering per item',
  task: 'Build a bookmark manager. Users add a bookmark (label + URL). Each bookmark shows its label and a shortened URL, an ✎ edit icon, and a × delete button. Clicking ✎ switches that specific item into an inline edit mode (two inputs + save/cancel). Saving commits the changes; canceling discards them. Only one item can be edited at a time.',
  hints: [
    'Track which item is being edited: const [editingId, setEditingId] = useState(null)',
    'Track the draft values: const [editDraft, setEditDraft] = useState({ label: "", url: "" })',
    'When clicking ✎: setEditingId(bookmark.id) and setEditDraft({ label: b.label, url: b.url })',
    'When saving: map over bookmarks and replace the matching one with { ...b, ...editDraft }',
    'For a unique ID when adding: use Date.now()',
  ],
  acceptance: [
    'Filling the label + URL inputs and clicking Add appends a new bookmark',
    'Each bookmark has an ✎ (edit) and × (delete) button',
    'Clicking ✎ enters inline edit mode for that item — two inputs appear',
    'Clicking ✓ saves the edits; clicking ✕ discards them',
    'Only one item can be in edit mode at a time',
  ],
}

export default function Challenge() {
  const [bookmarks, setBookmarks] = useState([
    { id: 1, label: 'React Docs', url: 'https://react.dev' },
    { id: 2, label: 'MDN',        url: 'https://developer.mozilla.org' },
  ])
  const [newLabel, setNewLabel] = useState('')
  const [newUrl,   setNewUrl]   = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState({ label: '', url: '' })

  function handleAdd() {
    // TODO: guard against empty fields, append with Date.now() id, clear inputs
  }

  function handleDelete(id) {
    // TODO: filter out
  }

  function startEdit(b) {
    // TODO: set editingId and editDraft
  }

  function handleSave() {
    // TODO: map bookmarks, replace matching id with editDraft, clear editingId
  }

  return (
    <div style={{ maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Label" style={{ flex: 1 }} />
        <input value={newUrl}   onChange={e => setNewUrl(e.target.value)}   placeholder="URL"   style={{ flex: 2 }} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {bookmarks.map(b => (
          <li key={b.id} style={{ padding: '0.5rem 0.75rem', background: '#1a1a1a', borderRadius: '6px' }}>
            {editingId === b.id ? (
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input value={editDraft.label} onChange={e => setEditDraft({ ...editDraft, label: e.target.value })} style={{ flex: 1 }} />
                <input value={editDraft.url}   onChange={e => setEditDraft({ ...editDraft, url:   e.target.value })} style={{ flex: 2 }} />
                <button onClick={handleSave}>✓</button>
                <button onClick={() => setEditingId(null)} style={{ background: '#2a2a2a' }}>✕</button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 600 }}>{b.label}</span>
                  <span style={{ color: '#555', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                    {b.url.replace('https://', '')}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <button onClick={() => startEdit(b)}  style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '1rem' }}>✎</button>
                  <button onClick={() => handleDelete(b.id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', fontSize: '1rem' }}>×</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
