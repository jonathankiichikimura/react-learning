import { useState } from 'react'

function ExpenseForm({ onAddExpense }) {
  const [desc,   setDesc]   = useState('')
  const [amount, setAmount] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const parsed = parseFloat(amount)
    if (!desc.trim() || isNaN(parsed) || parsed <= 0) return
    onAddExpense({ id: Date.now(), desc: desc.trim(), amount: parsed })
    setDesc('')
    setAmount('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <input placeholder="Description (e.g. Coffee)"     value={desc}   onChange={e => setDesc(e.target.value)}   />
      <input placeholder="Amount (e.g. 4.50)" type="number" min="0" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} />
      <button type="submit">Add Expense</button>
    </form>
  )
}

function BudgetSummary({ expenses, budget }) {
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)
  const percent    = Math.min((totalSpent / budget) * 100, 100)
  const remaining  = budget - totalSpent
  const isOver     = percent >= 80

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
        <span style={{ color: '#aaa' }}>Spent: <strong style={{ color: '#ddd' }}>${totalSpent.toFixed(2)}</strong></span>
        <span style={{ color: '#aaa' }}>Budget: <strong style={{ color: '#ddd' }}>${budget}</strong></span>
      </div>
      <div style={{ height: '8px', background: '#2a2a2a', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ width: `${percent}%`, height: '100%', background: isOver ? '#f87171' : '#4ade80', borderRadius: '999px', transition: 'width 0.3s, background 0.3s' }} />
      </div>
      <p style={{ fontSize: '0.8rem', color: remaining < 0 ? '#f87171' : '#777', margin: 0 }}>
        {remaining >= 0
          ? `$${remaining.toFixed(2)} remaining`
          : `$${Math.abs(remaining).toFixed(2)} over budget`}
      </p>
    </div>
  )
}

export default function Solution() {
  const [expenses, setExpenses] = useState([])
  const budget = 500

  function handleAddExpense(expense) {
    setExpenses(prev => [...prev, expense])
  }

  return (
    <div style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <BudgetSummary expenses={expenses} budget={budget} />
      <ExpenseForm onAddExpense={handleAddExpense} />
    </div>
  )
}
