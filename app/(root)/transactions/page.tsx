import { auth } from "@clerk/nextjs";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getUserById } from "@/lib/actions/user.action";
import { getUserTransactions } from "@/lib/actions/transaction.action";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DemoPage() {
  const { userId } = auth();

  const mongoUser = await getUserById({ userId });

  const result = await getUserTransactions({ userId: mongoUser });

  return (
    <section className="w-full ">
      <div className="flex items-center px-6 justify-between font-bold mb-8 text-xl">
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
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={result.transactions} />
      </div>
    </section>
  );
}
