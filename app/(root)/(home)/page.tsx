"use client";
import { Button } from "@/components/ui/button";
import { getFormattedDate } from "@/lib/utils";
import { DollarSign, PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const date = getFormattedDate();

  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>It&apos;s {date}</p>
        <Link href="/add-transaction">
          <Button className="p-6 primary-gradient">Add Transaction</Button>
        </Link>
      </div>
      <div className="flex gap-6 bg-slate-200 dark:bg-zinc-900 p-6 rounded-sm">
        <div className="flex flex-col flex-1 justify-center gap-4 p-6 rounded-md border shadow-md w-full bg-white dark:bg-black">
          <div className="flex justify-between font-semibold mb-2">
            <p className=" text-xl">Current Cycle</p>
            <p>11 March - 11 April</p>
          </div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className=" rounded-lg flex-1 border-2 p-3 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-2">
                <p>Budget</p>
                <DollarSign size={18} />
              </div>
              <p className="font-bold text-[28px]">200,000</p>
            </div>
            <div className=" rounded-lg flex-1 shadow-md border border-1 p-3 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-2">
                <p>Spent</p>
                <TrendingDown size={18} />
              </div>
              <p className="font-bold text-[28px]">50K</p>
            </div>
            <div className=" rounded-lg flex-1 shadow-md border border-1 p-3 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-2">
                <p>Remaining</p>
                <PiggyBank size={18} />
              </div>
              <p className="font-bold  text-[28px]">150K</p>
            </div>
          </div>
          <div className="text-slate-500 font-semibold">
            You have $ 150K to spend in the remaining 24 days.
          </div>
          <div className="text-slate-500 font-semibold">
            Suggested expense per day : $ 6.2k
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4 p-6 rounded-md border shadow-md w-full bg-white dark:bg-black">
          <div className="flex justify-between p-4 font-semibold text-xl">
            <p>Overall</p>
            <p>📈</p>
          </div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className=" rounded-lg flex-1 border-2 p-3 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-2">
                <p>Income</p>
                <TrendingUp size={18} />
              </div>
              <p className="font-bold text-[28px]">200,000</p>
            </div>
            <div className=" rounded-lg flex-1 shadow-md border border-1 p-3 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-2">
                <p>Expenses</p>
                <TrendingDown size={18} />
              </div>
              <p className="font-bold text-[28px]">50K</p>
            </div>
            <div className=" rounded-lg flex-1 shadow-md border border-1 p-3 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-2">
                <p>Remaining</p>
                <PiggyBank size={18} />
              </div>
              <p className="font-bold  text-[28px]">150K</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
