import * as z from "zod";

export const ExpenseSchema = z.object({
  name: z.string().min(3).max(100),
  amount: z.number().gte(0),
  category: z.string().min(3).max(20),
  mode: z.string().min(3).max(20),
  notes: z.string().min(5),
});
