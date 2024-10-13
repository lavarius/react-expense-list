import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must e at least 3 characters long" }),
  amount: z.number().positive({ message: "Amount must be a positve number" }),
  category: z.enum(["", "Groceries", "Utilities", "Entertainment"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface ExpenseFormProps {
  onAddExpense: (expense: ExpenseFormData) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: ExpenseFormData) => {
    onAddExpense(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("description")} placeholder="Description" />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      <div>
        <input
          {...register("amount", { valueAsNumber: true })}
          type="number"
          step="0.01"
          placeholder="Amount"
        />
        {errors.amount && <span>{errors.amount.message}</span>}
      </div>
      <div>
        <select {...register("category")}>
          <option value="">Select Category</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        {errors.category && <span>{errors.category.message}</span>}
      </div>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
