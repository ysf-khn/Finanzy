import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import Transaction from "@/app/forms/Transaction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = async () => {
  const { userId } = auth();
  const mongoUser = await getUserById({ userId });

  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>Add Transaction</p>
      </div>

      <Tabs
        defaultValue="income"
        className="w-1/2 bg-white p-4 rounded-sm shadow-sm"
      >
        <TabsList className="w-full">
          <TabsTrigger
            value="income"
            className="w-1/2 data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50"
          >
            Income
          </TabsTrigger>
          <TabsTrigger
            value="expense"
            className="w-1/2 data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50"
          >
            Expense
          </TabsTrigger>
        </TabsList>
        <TabsContent value="income">
          <Transaction
            mongoUser={JSON.stringify(mongoUser)}
            transactionType="income"
          />
        </TabsContent>
        <TabsContent value="expense">
          <Transaction
            mongoUser={JSON.stringify(mongoUser)}
            transactionType="expense"
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Page;
