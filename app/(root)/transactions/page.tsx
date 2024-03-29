import { Button } from "@/components/ui/button";
import { getUserTransactions } from "@/lib/actions/transaction.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TrendingDown, TrendingUp } from "lucide-react";

const Page = async () => {
  const { userId } = auth();

  const mongoUser = await getUserById({ userId });

  const result = await getUserTransactions({ userId: mongoUser });

  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>All Transactions</p>
        <div className="flex items-center gap-4">
          <Link href="/add-transaction">
            <Button className="p-6 primary-gradient text-slate-100">
              Add Transaction
            </Button>
          </Link>
          <Button className="p-6 bg-white text-black border border-green-500">
            Download Statement
          </Button>
        </div>
      </div>

      {result.transactions.length > 0 ? (
        <Table>
          <TableCaption>A list of your recent transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className=""></TableHead>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.transactions.map((item) => (
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">
                  {item.transactionType === "income" ? (
                    <TrendingUp />
                  ) : (
                    <TrendingDown />
                  )}
                </TableCell>
                <TableCell className="font-medium ">
                  <p className="line-clamp-1">{item.name}</p>
                </TableCell>
                <TableCell>
                  <span className="font-bold">
                    {item.transactionType === "income" ? "+" : "-"}
                  </span>{" "}
                  ₹{item.amount}
                </TableCell>
                <TableCell className="capitalize">
                  {item.category || "None"}
                </TableCell>
                <TableCell className="capitalize">
                  {item.paymentMode || "Not Specified"}
                </TableCell>
                <TableCell className="text-right w-1/4">
                  <p className="line-clamp-1">{item.notes || "Empty"}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No transactions yet. Add some now!</div>
      )}
    </section>
  );
};

export default Page;
