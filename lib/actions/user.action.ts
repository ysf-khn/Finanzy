"use server";

import User, { IUser } from "@/database/user.model";
import { connectDB } from "../mongoose";

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

export async function CreateUser(userData: UserDataParams) {
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

export async function UpdateUser(params: UpdateUserParams) {
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

export async function DeleteUser(params: { clerkId: string }) {
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
