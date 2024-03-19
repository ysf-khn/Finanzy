"use server";

import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";
import { connectDB } from "../mongoose";
import Transaction from "@/database/transaction.model";

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
}

export async function getUserTransactions(params: GetUserTransactionsParams) {
  try {
    connectDB();

    const { userId } = params;

    const userTransactions = await Transaction.find({ user: userId });

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
  } catch (error) {
    console.log(error);
    throw error;
  }
}
