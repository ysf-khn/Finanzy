"use client";

import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "./DateRangeSelector";

const SheetComp = () => {
  const [currentCycle, setCurrentCycle] = useState(false);

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
            <DatePickerWithRange />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComp;
