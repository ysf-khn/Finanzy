import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import EditCycleSheet from "./EditCycleSheet";

const CycleSheet = async ({ currentCycle }: any) => {
  const { userId } = auth();
  const mongoUser = await getUserById({ userId });

  return <EditCycleSheet cycle={currentCycle} mongoUser={mongoUser} />;
};

export default CycleSheet;
