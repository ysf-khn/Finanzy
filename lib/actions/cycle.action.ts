"use server";

import { Schema } from "mongoose";
import { connectDB } from "../mongoose";
import { IUser } from "@/database/user.model";
import Cycle from "@/database/cycle.model";

interface CreateCycleParams {
  from: Date;
  to: Date;
  budget: number;
  user: Schema.Types.ObjectId | IUser;
}

interface GetCycleParams {
  userId: string;
}

export async function getCycle(params: GetCycleParams) {
  try {
    connectDB();

    const { userId } = params;

    const cycle = await Cycle.findOne({ user: userId });
    return cycle;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createCycle(params: CreateCycleParams) {
  try {
    connectDB();

    const { from, to, budget, user } = params;
    console.log("running");
    const existingCycle = await Cycle.find({ user });
    console.log(existingCycle);
    if (existingCycle) {
      console.log("cycle already exists");
      return;
    }

    await Cycle.create({ from, to, budget, user });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
