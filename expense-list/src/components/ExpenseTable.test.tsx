import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ExpenseTable from "./ExpenseTable";

const mockExpenses = [
  { description: "Groceries", amount: 50, category: "Groceries" },
  { description: "Electricity", amount: 100, category: "Utilities" },
];

describe("ExpenseTable", () => {
  test("renders ExpenseTable with expenses and calculates total", () => {
    const mockDeleteExpense = vi.fn();
    render(
      <ExpenseTable
        expenses={mockExpenses}
        onDeleteExpense={mockDeleteExpense}
        filter="All Categories"
        total={150}
      />
    );

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Amount")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();

    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
    expect(screen.getByText("Electricity")).toBeInTheDocument();
    expect(screen.getByText("$100.00")).toBeInTheDocument();

    expect(screen.getByText("Total: $150.00")).toBeInTheDocument();

    const deleteButtons = screen.getAllByText("Delete");
    fireEvent.click(deleteButtons[0]);
    expect(mockDeleteExpense).toHaveBeenCalledWith(0);
  });

  test("filters expenses based on category", () => {
    render(
      <ExpenseTable
        expenses={mockExpenses}
        onDeleteExpense={() => {}}
        filter="Groceries"
        total={50}
      />
    );

    expect(screen.getByText("Groceries")).toBeInTheDocument();
    expect(screen.queryByText("Electricity")).not.toBeInTheDocument();

    expect(screen.getByText("Total: $50.00")).toBeInTheDocument();
  });
});
