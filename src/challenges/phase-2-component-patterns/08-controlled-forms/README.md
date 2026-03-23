# 08 — Controlled Forms

## Controlled vs uncontrolled inputs

There are two ways to handle form inputs in React:

**Uncontrolled** — the DOM manages the input's value. You read it when you need it (via a ref or `FormData`). The input has a mind of its own.

**Controlled** — React manages the input's value via state. Every keystroke updates state; state drives what the input shows. React is the single source of truth.

```jsx
// Uncontrolled — DOM owns the value
<input defaultValue="initial" />

// Controlled — React owns the value
<input value={name} onChange={e => setName(e.target.value)} />
```

## Why controlled inputs?

With controlled inputs you can:
- Validate on every keystroke
- Disable the submit button until the form is valid
- Reset the form programmatically (`setName('')`)
- Format input as the user types (e.g. phone number formatting)
- Derive state from multiple fields

## The controlled pattern

Every controlled input needs two things wired up:

```jsx
const [email, setEmail] = useState('')

<input
  value={email}                              // React drives the displayed value
  onChange={e => setEmail(e.target.value)}   // every keystroke updates state
/>
```

If you provide `value` without `onChange`, React makes the input read-only and warns you.

## Handling form submission

Use `onSubmit` on the `<form>` tag, not `onClick` on the button. This handles both button clicks AND pressing Enter:

```jsx
function handleSubmit(e) {
  e.preventDefault()   // CRITICAL: stop the browser from reloading the page
  // now do something with your state values
  console.log(name, email)
}

<form onSubmit={handleSubmit}>
  <input value={name} onChange={e => setName(e.target.value)} />
  <button type="submit">Submit</button>
</form>
```

## Disabling the submit button

Because React owns all the field values as state, computing whether the form is valid is just JavaScript:

```jsx
const isValid = name.trim() && email.trim() && password.length >= 8

<button type="submit" disabled={!isValid}>Submit</button>
```

## All form element types follow the same pattern

```jsx
// Text input
<input value={name} onChange={e => setName(e.target.value)} />

// Checkbox
<input type="checkbox" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} />

// Select/dropdown
<select value={selected} onChange={e => setSelected(e.target.value)}>
  <option value="a">Option A</option>
  <option value="b">Option B</option>
</select>

// Textarea
<textarea value={bio} onChange={e => setBio(e.target.value)} />
```

## Common mistakes

- Forgetting `e.preventDefault()` → page reloads and all state is lost
- Providing `value` without `onChange` → input becomes read-only
- Reading `e.target.value` for checkboxes → should be `e.target.checked`
