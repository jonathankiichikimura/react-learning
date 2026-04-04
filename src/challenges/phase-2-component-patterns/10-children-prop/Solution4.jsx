function Dialog({ header, body, footer }) {
  return (
    <div style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden', background: '#1a1a1a' }}>
      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #333' }}>
        {header}
      </div>
      <div style={{ padding: '1rem' }}>
        {body}
      </div>
      <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        {footer}
      </div>
    </div>
  )
}

export default function Solution() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '320px' }}>
      <Dialog
        header={<h3 style={{ margin: 0 }}>Confirm Deletion</h3>}
        body={
          <p style={{ color: '#aaa', margin: 0 }}>
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        }
        footer={
          <>
            <button style={{ background: '#2a2a2a', color: '#ccc' }}>Cancel</button>
            <button style={{ background: '#ef4444', color: '#fff', borderColor: '#dc2626' }}>Delete</button>
          </>
        }
      />
      <Dialog
        header={<h3 style={{ margin: 0 }}>🎉 Success!</h3>}
        body={<p style={{ color: '#4ade80', margin: 0 }}>Your changes have been saved successfully.</p>}
        footer={<button>Dismiss</button>}
      />
    </div>
  )
}
