import Transaction from "@/app/forms/Transaction";
import { getTransactionById } from "@/lib/actions/transaction.action";
import React from "react";

interface ParamProps {
  params: { id: string };
}

const Page = async ({ params }: ParamProps) => {
  const result = await getTransactionById({ transactionId: params.id });

  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>Edit Transaction</p>
      </div>

      <div className="w-1/2 bg-white dark:bg-zinc-900 p-4 rounded-sm shadow-sm mx-auto">
        <Transaction type="edit" transactionDetails={JSON.stringify(result)} />
      </div>
    </section>
  );
};

export default Page;
