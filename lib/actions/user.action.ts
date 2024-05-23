"use server";

import User, { IUser } from "@/database/user.model";
import { connectDB } from "../mongoose";
import Transaction from "@/database/transaction.model";

interface UserDataParams {
  clerkId: string;
  name: string;
  email: string;
  picture: string;
}

interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
}

interface GetUserByIdParams {
  userId: string | null;
}

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectDB();

    const { userId } = params;
    console.log("Thisis user id: " + userId);
    const user = await User.findOne({ clerkId: userId });

    if (!user) return console.log("User not found");

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOverallIncome(params: GetUserByIdParams) {
  try {
    connectDB();

    const { userId } = params;

    const pipeline = [
      {
        $match: {
          // @ts-ignore
          user: userId._id,
          transactionType: "income",
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
        },
      },
    ];

    const results = await Transaction.aggregate(pipeline);

    if (!results) return 0;

    const totalIncome = results[0]?.totalIncome || 0;
    return totalIncome;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOverallExpenses(params: GetUserByIdParams) {
  try {
    connectDB();

    const { userId } = params;

    const pipeline = [
      {
        $match: {
          // @ts-ignore
          user: userId._id,
          transactionType: "expense",
        },
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: "$amount" },
        },
      },
    ];

    const results = await Transaction.aggregate(pipeline);

    if (!results) return 0;

    const totalExpenses = results[0]?.totalExpenses || 0;
    return totalExpenses;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOverallBalance(params: GetUserByIdParams) {
  try {
    connectDB();

    const { userId } = params;

    const pipeline = [
      {
        $match: {
          // @ts-ignore
          user: userId._id,
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "income"] }, "$amount", 0],
            },
          },
          totalExpenses: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      {
        $project: {
          netIncome: { $subtract: ["$totalIncome", "$totalExpenses"] },
          _id: 0,
        },
      },
    ];

    const results = await Transaction.aggregate(pipeline);

    if (!results) return 0;

    const netIncome = results[0]?.netIncome || 0;

    return netIncome;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createUser(userData: UserDataParams) {
  try {
    connectDB();

    const newUser = await User.create(userData);

    console.log("User created");
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectDB();

    const { clerkId, updateData } = params;

    const mongoUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    return mongoUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: { clerkId: string }) {
  try {
    connectDB();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
