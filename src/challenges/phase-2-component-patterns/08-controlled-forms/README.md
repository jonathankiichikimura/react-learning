# 08 — Controlled Forms

## Controlled vs uncontrolled inputs

There are two ways to handle form inputs in React:

**Uncontrolled** — the DOM owns the value. You read it when you need it (via a ref or `FormData`). React doesn't know the current value between interactions.

**Controlled** — React owns the value via state. Every keystroke updates state; state drives what the input displays. React is the single source of truth.

```jsx
// Uncontrolled — DOM owns the value, React doesn't know it
<input defaultValue="initial" />

// Controlled — React owns the value
<input value={name} onChange={e => setName(e.target.value)} />
```

When to use each:
- **Controlled**: whenever you need to read the value while the user types (validation, dependent fields, disable/enable logic). This is the React default for forms.
- **Uncontrolled**: file inputs (always uncontrolled), or when integrating a non-React library that manages the DOM itself.

---

## The controlled pattern — all element types

Every controlled input needs **two things wired up**: a `value` driven by state, and an `onChange` that updates that state.

### Text / email / number inputs

```jsx
const [email, setEmail] = useState('')

<input
  type="email"
  value={email}
  onChange={e => setEmail(e.target.value)}
/>
```

### Textarea

```jsx
const [bio, setBio] = useState('')

// textarea uses value + onChange, just like input
<textarea
  value={bio}
  onChange={e => setBio(e.target.value)}
  rows={4}
/>
// Note: use value= not defaultValue=, and never put content between the tags
```

### Select (dropdown)

```jsx
const [country, setCountry] = useState('us')

<select value={country} onChange={e => setCountry(e.target.value)}>
  <option value="us">United States</option>
  <option value="ca">Canada</option>
  <option value="uk">United Kingdom</option>
</select>
```

### Checkbox

```jsx
const [agreed, setAgreed] = useState(false)

// Checkboxes use checked (not value) and e.target.checked (not e.target.value)
<input
  type="checkbox"
  checked={agreed}
  onChange={e => setAgreed(e.target.checked)}
/>
```

### Radio buttons

```jsx
const [plan, setPlan] = useState('free')

<>
  <input type="radio" value="free"  checked={plan === 'free'}  onChange={e => setPlan(e.target.value)} /> Free
  <input type="radio" value="pro"   checked={plan === 'pro'}   onChange={e => setPlan(e.target.value)} /> Pro
  <input type="radio" value="team"  checked={plan === 'team'}  onChange={e => setPlan(e.target.value)} /> Team
</>
```

---

## Handling form submission

Attach `onSubmit` to the `<form>` tag — not `onClick` on the button. This captures both button clicks and pressing Enter.

```jsx
function handleSubmit(e) {
  e.preventDefault()  // CRITICAL — stops the browser from reloading the page
  // All field values are already in state — use them here
  console.log({ name, email, password })
}

<form onSubmit={handleSubmit}>
  <input value={name} onChange={e => setName(e.target.value)} />
  <button type="submit">Submit</button>
</form>
```

### Resetting after submit

Because you own the state, resetting is just setting values back to empty:

```jsx
function handleSubmit(e) {
  e.preventDefault()
  submitToServer({ name, email })
  // Reset
  setName('')
  setEmail('')
}
```

---

## Disabling the submit button

Because React owns all the field values as state, computing validity is just JavaScript:

```jsx
// Simple: all fields must be non-empty
const isValid = name.trim() && email.trim() && password.length > 0

// More specific: email format check, password length
const isValid = name.trim().length > 0
             && email.includes('@')
             && password.length >= 8

<button type="submit" disabled={!isValid}>Submit</button>
```

Common gotcha: `disabled={isValid}` (missing the `!`) will disable the button when valid and enable it when invalid — the opposite of what you want.

---

## Validation patterns

### 1. Submit-time validation (simplest)

Check everything in `handleSubmit`. Only show errors after the user tries to submit.

```jsx
const [errors, setErrors] = useState({})

function handleSubmit(e) {
  e.preventDefault()
  const newErrors = {}
  if (!name.trim()) newErrors.name = 'Name is required'
  if (!email.includes('@')) newErrors.email = 'Invalid email'
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }
  // All valid — proceed
}

return (
  <form onSubmit={handleSubmit}>
    <input value={name} onChange={e => setName(e.target.value)} />
    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
  </form>
)
```

### 2. Real-time validation (best UX)

Derive error state directly from field values — no separate `setErrors` needed. Show errors only after the user has started typing.

```jsx
const tooShort = username.length > 0 && username.length < 3
const isValid  = username.length >= 3

// In JSX:
{tooShort && <p>Must be at least 3 characters</p>}
<button disabled={!isValid}>Submit</button>
```

### 3. "Touched" tracking (best of both)

Track which fields have been interacted with. Show errors only for fields the user has visited.

```jsx
const [touched, setTouched] = useState({})

<input
  value={email}
  onChange={e => setEmail(e.target.value)}
  onBlur={() => setTouched(t => ({ ...t, email: true }))}
/>
{touched.email && !email.includes('@') && <p>Invalid email</p>}
```

---

## Form state as a single object

For forms with many fields, one state object is cleaner than a dozen `useState` calls:

```jsx
const [form, setForm] = useState({
  name: '',
  email: '',
  role: 'viewer',
  newsletter: false,
})

// Update a single field without losing the others
function handleChange(field, value) {
  setForm(prev => ({ ...prev, [field]: value }))
}

// Or inline with computed property names:
<input
  value={form.name}
  onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
/>
```

---

## Common mistakes

```jsx
// ❌ value without onChange — input is stuck, React warns "read-only field"
<input value={name} />

// ✅ Always pair value with onChange
<input value={name} onChange={e => setName(e.target.value)} />
```

```jsx
// ❌ Forgetting e.preventDefault() — page reloads, all state is lost
function handleSubmit(e) {
  saveData(name, email)  // This never runs because the page reloads first
}

// ✅ Always call it first
function handleSubmit(e) {
  e.preventDefault()
  saveData(name, email)
}
```

```jsx
// ❌ Using e.target.value for a checkbox — gives "on" or "off", not a boolean
<input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.value)} />

// ✅ Checkboxes use e.target.checked
<input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
```

```jsx
// ❌ disabled={isValid} — button disabled when the form IS valid
<button disabled={isValid}>Submit</button>

// ✅ disabled={!isValid} — button disabled when the form is NOT valid
<button disabled={!isValid}>Submit</button>
```

```jsx
// ❌ Content inside a controlled textarea (treated as defaultValue, ignored by React)
<textarea value={bio}>Some initial text</textarea>

// ✅ Pass it as the initial state value instead
const [bio, setBio] = useState('Some initial text')
<textarea value={bio} onChange={e => setBio(e.target.value)} />
```

```jsx
// ❌ Mutating state directly — React won't re-render
form.name = 'Alice'
setForm(form)

// ✅ Always create a new object
setForm({ ...form, name: 'Alice' })
```
