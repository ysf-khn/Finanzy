import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>All Transactions</p>
        <Link href="/add-transaction">
          <Button className="p-6 bg-slate-900">Add Transaction</Button>
        </Link>
      </div>
    </section>
  );
};

export default Page;
