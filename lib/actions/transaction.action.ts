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

interface DeleteTransactionParams {
  transactionId: string;
}

interface GetTransactionByIdParams {
  transactionId: string;
}

interface EditTransactionParams {
  transactionId: string;
  name: string;
  amount: number;
  transactionType: string;
  category: string;
  paymentMode: string;
  notes: string;
}

export async function getTransactionById(params: GetTransactionByIdParams) {
  try {
    connectDB();

    const { transactionId } = params;

    const transaction = await Transaction.findById(transactionId);

    return transaction;
  } catch (error) {
    console.log(error);
    throw error;
  }
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

    if (!userTransactions) return null;

    return { transactions: userTransactions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editTransaction(params: EditTransactionParams) {
  try {
    connectDB();

    const {
      transactionId,
      name,
      amount,
      transactionType,
      category,
      paymentMode,
      notes,
    } = params;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    transaction.name = name;
    transaction.amount = amount;
    transaction.transactionType = transactionType;
    transaction.category = category;
    transaction.paymentMode = paymentMode;
    transaction.notes = notes;

    await transaction.save();

    revalidatePath("/transactions");
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

    await Cycle.findByIdAndUpdate(cycle, {
      $push: { transactions: newTransaction._id },
    });

    revalidatePath("/payments");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteTransaction(params: DeleteTransactionParams) {
  try {
    connectDB();

    const { transactionId } = params;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    await transaction.deleteOne({ _id: transactionId });

    await Cycle.updateMany(
      { _id: transaction.cycle },
      { $pull: { transactions: transactionId } }
    );

    revalidatePath("/payments");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
