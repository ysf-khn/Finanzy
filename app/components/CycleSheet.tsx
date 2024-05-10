import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cycle } from "../forms/Cycle";

import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";

const CycleSheet = async () => {
  const { userId } = auth();
  const mongoUser = await getUserById({ userId });

  return (
    <Sheet>
      <SheetTrigger className="font-normal text-sm dark:bg-transparent border text-gradient rounded-md px-4">
        {" "}
        {/* <Button className="p-6 dark:bg-transparent border text-gradient">
          {currentCycle ? "Edit Current Cycle" : "Set Current Cycle"}
        </Button> */}
        Edit Current Cycle
      </SheetTrigger>
      {/* @ts-ignore */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configure current cycle</SheetTitle>
          <SheetDescription>
            <Cycle mongoUser={JSON.stringify(mongoUser)} />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CycleSheet;
