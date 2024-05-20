import { auth } from "@clerk/nextjs/server";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getUserById } from "@/lib/actions/user.action";
import { getUserTransactions } from "@/lib/actions/transaction.action";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import DownloadStatement from "@/app/components/DownloadStatement";

export const metadata: Metadata = {
  title: "Finanzy | All Transactions",
  description: "View and manage your transactions here",
};

export default async function DemoPage() {
  // auth().protect();

  const { userId } = auth();

  console.log(userId);

  const mongoUser = await getUserById({ userId });

  const result = await getUserTransactions({ userId: mongoUser });

  return (
    <section className="w-full ">
      <div className="md:flex max-sm:mb-4 items-center max-sm:px-2 md:px-6 justify-between font-bold mb-8 text-xl">
        <p className="max-sm:mb-4">All Transactions</p>
        <div className="sm:flex items-center gap-4">
          <Link href="/add-transaction">
            <Button className="p-6 primary-gradient text-slate-100 w-full sm:w-auto mb-2 sm:mb-0">
              Add Transaction
            </Button>
          </Link>
          <DownloadStatement transactions={result.transactions} />
        </div>
      </div>
      <div className="md:container mx-auto max-sm:py-4 md:py-10">
        <DataTable columns={columns} data={result.transactions} />
      </div>
    </section>
  );
}
