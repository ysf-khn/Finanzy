import * as z from "zod";

export const ExpenseSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(50, { message: "Name can be a maximum of 50 characters" }),
  amount: z
    .string()
    .transform((v) => Number(v) || 0)
    .pipe(z.number().min(0).max(1000000000)),
  category: z.string(),
  paymentMode: z.string(),
  transactionType: z.string(),
  notes: z
    .string()
    .max(250, { message: "Notes can be a maximum of 250 characters" }),
});
