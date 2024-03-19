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
import Image from "next/image";

const Page = async () => {
  const { userId } = auth();

  const mongoUser = await getUserById({ userId });

  const result = await getUserTransactions({ userId: mongoUser });

  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>All Transactions</p>
        <Link href="/add-transaction">
          <Button className="p-6 bg-slate-900">Add Transaction</Button>
        </Link>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
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
            <TableRow>
              <TableCell className="font-medium">
                <Image
                  src={`/${
                    item.transactionType === "income"
                      ? "increase.png"
                      : "decrease.png"
                  }`}
                  height={32}
                  width={32}
                  alt="Icon"
                />
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>₹{item.amount}</TableCell>
              <TableCell>{item.category || "None"}</TableCell>
              <TableCell>{item.paymentMode || "Not Specified"}</TableCell>
              <TableCell className="text-right">
                {item.notes || "Empty"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Page;
