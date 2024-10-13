import React, { useState, useMemo } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";

interface Expense {
  description: string;
  amount: number;
  category: string;
}

// function App() {
const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState("All Categories");

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (index: number) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const filteredExpenses = useMemo(() => {
    return filter === "All Categories"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);
  }, [expenses, filter]);

  const total = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={addExpense} />
      <div>
        <label htmlFor="filter">Filter by Category: </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All Categories">All Categories</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>
      <ExpenseTable
        expenses={expenses}
        onDeleteExpense={deleteExpense}
        filter={filter}
        total={total}
      />
    </div>
  );
};

export default App;
