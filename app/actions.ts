"use server";

import { getUserById } from "@/lib/actions/user.action";

export async function getMongoUserId(userId: any) {
  const mongoUser = await getUserById({ userId });
  return mongoUser;
}
