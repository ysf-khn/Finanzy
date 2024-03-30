"use server";

import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";
import { connectDB } from "../mongoose";
import Transaction from "@/database/transaction.model";
import { revalidatePath } from "next/cache";
import Cycle from "@/database/cycle.model";

interface CreateTransactionParams {
  name: string;
  amount: number;
  category?: string;
  paymentMode?: string;
  notes?: string;
  cycle: string;
  transactionType: string;
  user: Schema.Types.ObjectId | IUser;
}

interface GetUserTransactionsParams {
  userId: string | null;
  limit?: number;
}

export async function getUserTransactions(params: GetUserTransactionsParams) {
  try {
    connectDB();

    const { userId, limit } = params;

    const userTransactions = await Transaction.find({ user: userId })
      .sort({
        createdAt: -1,
      })
      // @ts-ignore
      .limit(limit);

    return { transactions: userTransactions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createTransaction(params: CreateTransactionParams) {
  try {
    connectDB();

    const {
      name,
      amount,
      category,
      paymentMode,
      notes,
      cycle,
      transactionType,
      user,
    } = params;

    const newTransaction = await Transaction.create({
      name,
      amount,
      category: category ?? "",
      paymentMode: paymentMode ?? "",
      notes: notes ?? "",
      transactionType,
      cycle,
      user,
    });

    const cycleObject = await Cycle.findByIdAndUpdate(cycle, {
      $push: { transactions: newTransaction._id },
    });

    revalidatePath("/transactions");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
