"use server";

import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";
import { connectDB } from "../mongoose";
import Transaction from "@/database/transaction.model";
import { revalidatePath } from "next/cache";

interface CreateTransactionParams {
  name: string;
  amount: number;
  category?: string;
  paymentMode?: string;
  notes?: string;
  transactionType: string;
  user: Schema.Types.ObjectId | IUser;
  //   path: string;
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
      transactionType,
      user,
    } = params;

    await Transaction.create({
      name,
      amount,
      category: category ?? "",
      paymentMode: paymentMode ?? "",
      notes: notes ?? "",
      transactionType,
      user,
    });

    revalidatePath("/transactions");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
