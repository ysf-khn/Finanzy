import { getTransactionById } from "@/lib/actions/transaction.action";
import React from "react";

interface ParamProps {
  params: { id: string };
}

const Page = async ({ params }: ParamProps) => {
  const result = await getTransactionById({ transactionId: params.id });
  console.log(result);

  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>Edit Transaction</p>
      </div>
    </section>
  );
};

export default Page;
