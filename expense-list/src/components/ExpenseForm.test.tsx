import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import ExpenseForm from "./ExpenseForm";

describe("ExpenseForm", () => {
  test("renders ExpenseForm and validates input", async () => {
    const mockAddExpense = vi.fn();
    render(<ExpenseForm onAddExpense={mockAddExpense} />);

    // Check if the form renders correctly
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Expense" })
    ).toBeInTheDocument();

    // Submit the form with invalid data
    fireEvent.click(screen.getByRole("button", { name: "Add Expense" }));
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "-1" },
    });
    fireEvent.select(screen.getByRole("combobox"), { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Expense" }));

    // Check if the error messages appear
    // expect(
    //   await screen.findByText("Description must be at least 3 characters long")
    // ).toBeInTheDocument();
    // expect(screen.getByText("Amount field is required")).toBeInTheDocument();
    // expect(
    //   screen.getByText("Amount must be a positive number")
    // ).toBeInTheDocument();
    // expect(
    //   await screen.findByText("Please select a category")
    // ).toBeInTheDocument();
    // Wait for error messages to appear
    await waitFor(() => {
      expect(
        screen.getByText("Description must be at least 3 characters long")
      ).toBeInTheDocument();
      expect(screen.getByText("Amount field is required")).toBeInTheDocument();
      expect(
        screen.getByText("Amount must be a positive number")
      ).toBeInTheDocument();
      expect(screen.getByText("Please select a category")).toBeInTheDocument();
    });

    // Reset the form
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test Expense" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "50" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Groceries" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add Expense" }));

    // Check if the mock function was called with correct data
    expect(mockAddExpense).toHaveBeenCalledWith({
      description: "Test Expense",
      amount: 50,
      category: "Groceries",
    });
  });
});
