"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cycle } from "../forms/Cycle";

const EditCycleSheet = ({ cycle, mongoUser }: any) => {
  const [editCycle, setEditCycle] = useState(false);

  useEffect(() => {
    if (cycle) {
      setEditCycle(true);
    }
  }, [cycle]);

  return (
    <Sheet>
      <SheetTrigger
        className={`font-normal text-sm dark:bg-transparent border text-gradient rounded-md px-4 py-4 sm:py-0 w-full sm:w-auto ${
          cycle ? "" : ""
        }`}
      >
        {" "}
        {/* <Button className="p-6 dark:bg-transparent border text-gradient">
          {currentCycle ? "Edit Current Cycle" : "Set Current Cycle"}
        </Button> */}
        {editCycle ? "Edit Current Cycle" : "Set Current Cycle"}
      </SheetTrigger>
      {/* @ts-ignore */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-3">
            {editCycle ? "Edit cycle details" : "Configure current cycle"}
          </SheetTitle>
          <Cycle
            mongoUser={JSON.stringify(mongoUser)}
            editCycle={editCycle}
            cycleData={cycle}
          />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default EditCycleSheet;
