"use server";

import mongoose, { Schema } from "mongoose";
import { connectDB } from "../mongoose";
import { IUser } from "@/database/user.model";
import Cycle, { ICycle } from "@/database/cycle.model";
import Transaction from "@/database/transaction.model";
import { revalidatePath } from "next/cache";
import { string } from "zod";

interface CreateCycleParams {
  from: Date;
  to: Date;
  budget: number;
  user: Schema.Types.ObjectId | IUser;
}

interface EditCycleParams {
  cycleId: string;
  from: Date;
  to: Date;
  budget: number;
}

interface GetCycleParams {
  userId: string;
}

interface GetCycleExpensesParams {
  cycleId: string;
}

export async function getCurrentCycle(params: GetCycleParams) {
  try {
    connectDB();
    const { userId } = params;

    const cycle = await Cycle.findOne({ user: userId })
      .sort({ to: -1 })
      .limit(1);
    console.log("LATEST  CYCLE ", cycle);
    return JSON.parse(JSON.stringify(cycle));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCycleTotalExpenses(params: GetCycleExpensesParams) {
  try {
    connectDB();

    const { cycleId } = params;

    const cycle = await Cycle.findById(cycleId).populate({
      path: "transactions",
      model: Transaction,
    });

    const expenses = cycle.transactions.filter(
      (transaction: any) => transaction.transactionType === "expense"
    );
    const totalExpense = expenses.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );

    console.log(totalExpense);

    const totalCycleExpense = totalExpense || 0;

    return totalCycleExpense;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getRemainingCycleBalance(params: any) {
  try {
    connectDB();

    const { cycleId } = params;

    const cycle = await Cycle.findById(cycleId).populate({
      path: "transactions",
      model: Transaction,
    });

    const expenses = cycle.transactions.filter(
      (transaction: any) => transaction.transactionType === "expense"
    );
    const totalExpense = expenses.reduce(
      (acc: any, transaction: any) => acc + transaction.amount,
      0
    );

    const remainingBalance = cycle.budget - totalExpense || 0;

    return remainingBalance;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCycle(params: CreateCycleParams) {
  try {
    connectDB();

    const { from, to, budget, user } = params;
    // console.log("running");
    // const existingCycle = await Cycle.find({ user });
    // console.log(existingCycle);
    // if (existingCycle) {
    //   console.log("cycle already exists");
    //   return;
    // }

    await Cycle.create({ from, to, budget, user });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editCycleAction(params: EditCycleParams) {
  try {
    connectDB();

    const { cycleId, from, to, budget } = params;

    const cycle = await Cycle.findById(cycleId);

    if (!cycle) throw new Error("Cycle not found");

    cycle.from = from;
    cycle.to = to;
    cycle.budget = budget;

    await cycle.save();

    revalidatePath("/");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
