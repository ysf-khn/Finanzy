import * as z from "zod";

export const ExpenseSchema = z.object({
  name: z.string().min(3).max(100),
  amount: z.string().min(1),
  category: z.string(),
  mode: z.string(),
  notes: z.string(),
});
