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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ExpenseSchema } from "@/lib/validations";
import { createTransaction } from "@/lib/actions/transaction.action";
import { categoryItems, paymentModes } from "@/constants";

interface TransactionParams {
  mongoUser: string;
  transactionType: string;
}

const Transaction = ({ mongoUser, transactionType }: TransactionParams) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      name: "",
      amount: 0,
      category: "",
      mode: "",
      notes: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ExpenseSchema>) {
    setIsSubmitting(true);
    console.log(values, mongoUser);
    console.log(transactionType);
    try {
      await createTransaction({
        name: values.name,
        amount: values.amount,
        category: values.category,
        paymentMode: values.mode,
        notes: values.notes,
        transactionType: transactionType,
        user: JSON.parse(mongoUser),
        // path:''
      });
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-green-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Shawarma" {...field} />
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
                Amount <span className="text-green-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="₹" {...field} type="number" min={0} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment mode</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
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
                <Textarea placeholder="Add notes" onChange={field.onChange} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {transactionType === "income" ? "Add Income" : "Add Expense"}
        </Button>
      </form>
    </Form>
  );
};

export default Transaction;
