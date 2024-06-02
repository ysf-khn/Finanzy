"use client";

import {
  compareCycleDateToCurrentDate,
  formatNumberWithCommas,
  getCycleFormattedDate,
} from "@/lib/utils";
import { DollarSign, PiggyBank, TrendingDown } from "lucide-react";
import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Cycle } from "../forms/Cycle";

const CycleOverview = ({
  mongoUser,
  cycle,
  cycleExpenses,
  cycleBalance,
}: any) => {
  const [budgetExceeded, setBudgetExceeded] = useState(false);
  const [open, setOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  let checkCycleExpired: any;
  const budget = cycle ? cycle.budget : 0;
  if (cycle) {
    checkCycleExpired = compareCycleDateToCurrentDate(cycle.to);
  }

  const handleConfigureNewCycle = () => {
    setOpen(false);
    setSheetOpen(true);
  };

  useEffect(() => {
    if (checkCycleExpired === -1) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (cycleExpenses > budget) {
      setBudgetExceeded(true);
    } else {
      setBudgetExceeded(false);
    }
  }, [cycleExpenses, budget]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Current Cycle Expired!</DialogTitle>
            <div>
              <p className="mb-4 mt-1">Please configure a new budget cycle.</p>
              <Button onClick={handleConfigureNewCycle}>Configure Now</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        {/* @ts-ignore */}
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Configure new cycle</SheetTitle>
            <div>
              <Cycle mongoUser={mongoUser} setSheetOpen={setSheetOpen} />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <h2 className="md:text-xl font-semibold mb-4 md:mb-6">
        This Cycle{" "}
        <span>
          {cycle
            ? `(${getCycleFormattedDate(cycle.from)} to
          ${getCycleFormattedDate(cycle.to)})`
            : "(Not yet configured)"}
        </span>
      </h2>

      <div className="md:flex items-center justify-between gap-6 max-sm:space-y-3">
        <div className="p-3 md:p-8 flex-1 rounded-xl md:rounded-md border border-1 ">
          <div className="flex items-center justify-between mb-4">
            <p>Budget</p>
            <DollarSign size={20} color="blue" />
          </div>
          <p className="text-xl md:text-2xl font-bold">
            ₹ {formatNumberWithCommas(budget)}
          </p>
        </div>

        {/* big screens */}
        <div className="p-3 md:p-8 flex-1 rounded-md border max-sm:hidden">
          <div className="flex items-center justify-between mb-4">
            <p>Spent</p>
            <TrendingDown size={20} color="red" />
          </div>
          <p className=" text-2xl font-bold">
            ₹ {formatNumberWithCommas(cycleExpenses)}
          </p>
        </div>
        <div className="p-3 md:p-8 flex-1 rounded-md border border-1 max-sm:hidden">
          <div className="flex items-center justify-between mb-4">
            <p>Balance</p>
            <PiggyBank size={20} color="green" />
          </div>
          <p
            className={`text-2xl font-bold ${budgetExceeded && "text-red-500"}`}
          >
            ₹ {formatNumberWithCommas(cycleBalance)}
          </p>
        </div>

        {/* small screens */}
        <div className="max-sm:flex max-sm:gap-4 md:hidden">
          <div className="p-3 md:p-8 flex-1 rounded-xl md:rounded-md border ">
            <div className="flex items-center justify-between mb-4">
              <p>Spent</p>
              <TrendingDown size={20} color="red" />
            </div>
            <p className=" max-sm:text-lg text-2xl font-bold">
              ₹ {formatNumberWithCommas(cycleExpenses)}
            </p>
          </div>
          <div className="p-3 md:p-8 flex-1 rounded-xl md:rounded-md border border-1 ">
            <div className="flex items-center justify-between mb-4">
              <p>Balance</p>
              <PiggyBank size={20} color="green" />
            </div>
            <p
              className={`max-sm:text-lg text-2xl font-bold ${
                budgetExceeded && "text-red-500"
              }`}
            >
              ₹ {formatNumberWithCommas(cycleBalance)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CycleOverview;
