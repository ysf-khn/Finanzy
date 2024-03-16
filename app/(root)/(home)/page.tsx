"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>It&apos;s Thursday, 14/03/2024</p>
        <Link href="/add-transaction">
          <Button className="p-6 bg-slate-900">Add Transaction</Button>
        </Link>
      </div>
      <div className="flex gap-6 bg-slate-200 p-6 rounded-sm">
        <div className="flex flex-col flex-1 justify-center gap-4 p-6 rounded-md border shadow-md w-full bg-white">
          <div className="flex justify-between font-semibold mb-2">
            <p className=" text-xl">Current Cycle</p>
            <p>11/03/2024 to 11/04/2024</p>
          </div>
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className=" rounded-md p-4 flex-1 text-center bg-slate-900 text-slate-50 shadow-md">
              <p className="font-bold">200,000</p>
              <p>Budget</p>
            </div>
            <div className=" rounded-md p-4 flex-1 text-center bg-red-400 shadow-md">
              <p className="font-bold">50K</p>
              <p>Spent</p>
            </div>
            <div className=" rounded-md p-4 flex-1 text-center bg-green-400 shadow-md">
              <p className="font-bold">150K</p>
              <p>Remaining</p>
            </div>
          </div>
          <div className="text-slate-500 font-semibold">
            You have $ 150K to spend in the remaining 24 days.
          </div>
          <div className="text-slate-500 font-semibold">
            Suggested expense per day : $ 6.2k
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4 p-6 rounded-md border shadow-md w-full bg-white">
          <div className="flex justify-between p-4 font-semibold text-xl">
            <p>Overall</p>
            <p>📈</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className=" rounded-md p-4 flex-1 text-center bg-green-400 shadow-md">
              <p className="font-bold">540K</p>
              <p>Income</p>
            </div>
            <div className=" rounded-md p-4 flex-1 text-center bg-red-400 shadow-md">
              <p className="font-bold">50K</p>
              <p>Expenses</p>
            </div>
            <div className=" rounded-md p-4 flex-1 text-center bg-slate-900 text-slate-50 shadow-md">
              <p className="font-bold">150K</p>
              <p>Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
