import { useState } from 'react'

export default function Solution() {
  const [bookmarks, setBookmarks] = useState([
    { id: 1, label: 'React Docs', url: 'https://react.dev' },
    { id: 2, label: 'MDN',        url: 'https://developer.mozilla.org' },
  ])
  const [newLabel, setNewLabel] = useState('')
  const [newUrl,   setNewUrl]   = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editDraft, setEditDraft] = useState({ label: '', url: '' })

  function handleAdd() {
    if (!newLabel.trim() || !newUrl.trim()) return
    setBookmarks(prev => [...prev, { id: Date.now(), label: newLabel.trim(), url: newUrl.trim() }])
    setNewLabel('')
    setNewUrl('')
  }

  function handleDelete(id) {
    setBookmarks(prev => prev.filter(b => b.id !== id))
  }

  function startEdit(b) {
    setEditingId(b.id)
    setEditDraft({ label: b.label, url: b.url })
  }

  function handleSave() {
    setBookmarks(prev => prev.map(b => b.id === editingId ? { ...b, ...editDraft } : b))
    setEditingId(null)
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
                  <button onClick={() => startEdit(b)}       style={{ background: 'none', border: 'none', color: '#aaa',    cursor: 'pointer', fontSize: '1rem' }}>✎</button>
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
