import { useState } from 'react'

export const description = {
  title: 'Sibling Communication',
  concept: 'Lifting state · Sibling components · Callbacks up · Data down · One-way data flow',
  task: 'Build a "Budget Tracker" where ExpenseForm and BudgetSummary are siblings. ExpenseForm accepts a description and amount, then calls onAddExpense to notify the parent. BudgetSummary shows total spent, the $500 budget, and a progress bar. Neither component holds state — everything lives in the parent. When ExpenseForm fires onAddExpense, both components update automatically.',
  hints: [
    'Parent holds: const [expenses, setExpenses] = useState([])',
    'ExpenseForm manages its OWN local input state (desc, amount) — but not the expenses list',
    'When the form submits, it calls onAddExpense({ desc, amount: parseFloat(amount) }) and resets inputs',
    'BudgetSummary receives expenses and budget as props and derives everything from them',
    'totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0)',
    'Progress bar width: Math.min((totalSpent / budget) * 100, 100) + "%"',
  ],
  acceptance: [
    'ExpenseForm and BudgetSummary are defined as separate component functions',
    'Neither sibling holds the expenses array — only the parent does',
    'Adding an expense immediately updates the progress bar in BudgetSummary',
    'The progress bar turns red/orange when spending exceeds 80% of the budget',
    'Remaining amount is shown and goes negative if over budget',
  ],
}

function ExpenseForm({ onAddExpense }) {
  // This component manages its own input state, but NOT the expenses list
  // TODO: Add desc and amount state
  // On submit, call onAddExpense({ id: Date.now(), desc, amount: parseFloat(amount) }) and clear inputs

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {/* TODO: Two controlled inputs (description, amount) + submit button */}
    </form>
  )
}

function BudgetSummary({ expenses, budget }) {
  // TODO: Derive totalSpent from expenses using .reduce()
  // Derive percent = Math.min((totalSpent / budget) * 100, 100)
  // Show spent, budget, progress bar, and remaining amount

  return (
    <div className="card">
      {/* TODO */}
    </div>
  )
}

export default function Challenge() {
  const [expenses, setExpenses] = useState([])
  const budget = 500

  function handleAddExpense(expense) {
    // TODO: append expense to expenses array
  }

  return (
    <div style={{ maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <BudgetSummary expenses={expenses} budget={budget} />
      <ExpenseForm onAddExpense={handleAddExpense} />
    </div>
  )
}
