"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ExpenseSchema } from "@/lib/validations";
import {
  createTransaction,
  editTransaction,
} from "@/lib/actions/transaction.action";
import { categoryItems, paymentModes, transactiontypeItems } from "@/constants";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface TransactionParams {
  mongoUser?: string;
  mongoUserId?: string;
  transactionType?: string;
  cycleId?: string;
  type?: string;
  transactionDetails?: string;
}

const Transaction = ({
  mongoUser,
  transactionType,
  cycleId,
  type,
  transactionDetails,
}: TransactionParams) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const parsedTransactionDetails =
    transactionDetails && JSON.parse(transactionDetails || "");

  // 1. Define your form.
  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      name: parsedTransactionDetails?.name || "",
      amount: parsedTransactionDetails?.amount.toString() || "",
      category: parsedTransactionDetails?.category || "",
      paymentMode: parsedTransactionDetails?.paymentMode || "",
      notes: parsedTransactionDetails?.notes,
      transactionType:
        parsedTransactionDetails?.transactionType || transactionType,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ExpenseSchema>) {
    setIsSubmitting(true);

    console.log(cycleId);

    try {
      if (type === "edit") {
        await editTransaction({
          transactionId: parsedTransactionDetails._id,
          name: values.name,
          amount: values.amount,
          category: values.category,
          paymentMode: values.paymentMode,
          // @ts-ignore
          notes: values.notes,
          transactionType: values.transactionType,
        });
        toast({
          title: "Success",
          description: "Transaction edited successfully.",
          variant: "default",
        });
        router.push("/transactions");
      } else {
        await createTransaction({
          name: values.name,
          amount: values.amount,
          category: values.category,
          paymentMode: values.paymentMode,
          notes: values.notes,
          transactionType: transactionType!,
          cycle: cycleId ? JSON.parse(cycleId!) : null,
          user: JSON.parse(mongoUser!),
        });
        toast({
          title: "Success",
          description: "Transaction created successfully.",
          variant: "default",
        });
      }

      router.push("/transactions");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-sm:text-left"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-gradient">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Shawarma"
                  {...field}
                  className="dark:bg-black"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {/* Amount <span className="text-gradient">*</span> */}
                Amount
              </FormLabel>
              <FormControl>
                <Input placeholder="₹" {...field} className="dark:bg-black" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {type === "edit" && (
          <FormField
            control={form.control}
            name="transactionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="dark:bg-black">
                      <SelectValue placeholder="Select the transaction type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {transactiontypeItems.map((transacType) => (
                      <SelectItem
                        key={transacType.value}
                        value={transacType.value}
                        className="cursor-pointer"
                      >
                        {transacType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="dark:bg-black">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryItems.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment mode</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="dark:bg-black">
                    <SelectValue placeholder="Select a payment mode" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentModes.map((mode) => (
                    <SelectItem
                      key={mode.value}
                      value={mode.value}
                      className="cursor-pointer"
                    >
                      {mode.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add notes"
                  {...field}
                  onChange={field.onChange}
                  className="dark:bg-black"
                ></Textarea>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="primary-gradient text-slate-100"
        >
          {type === "edit"
            ? "Save Changes"
            : transactionType === "income"
            ? "Add Income"
            : "Add Expense"}
        </Button>
      </form>
    </Form>
  );
};

export default Transaction;
