import * as z from "zod";

export const ExpenseSchema = z.object({
  name: z.string().min(3).max(100),
  amount: z
    .string()
    .transform((v) => Number(v) || 0)
    .pipe(z.number().min(0)),
  category: z.string(),
  paymentMode: z.string(),
  transactionType: z.string(),
  notes: z.string(),
});
