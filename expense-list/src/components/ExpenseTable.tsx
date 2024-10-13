import React from "react";

interface Expense {
  description: string;
  amount: number;
  category: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
  onDeleteExpense: (index: number) => void;
  filter: string;
  total: number;
}

const ExpenseTable = ({
  expenses,
  onDeleteExpense,
  filter,
  total,
}: ExpenseTableProps) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses
            .filter(
              (expense) =>
                filter === "All Categories" || expense.category === filter
            )
            .map((expense, index) => (
              <tr key={index}>
                <td>{expense.description}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.category}</td>
                <td>
                  <button onClick={() => onDeleteExpense(index)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default ExpenseTable;
