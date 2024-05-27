import { auth } from "@clerk/nextjs/server";
import { getUserById } from "@/lib/actions/user.action";
import Transaction from "@/app/forms/Transaction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentCycle } from "@/lib/actions/cycle.action";

const Page = async () => {
  const { userId } = auth();
  const mongoUser = await getUserById({ userId });
  const cycle = await getCurrentCycle({ userId: mongoUser });

  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>Add Transaction</p>
      </div>

      <Tabs
        defaultValue="expense"
        className="md:w-1/2 bg-white dark:bg-zinc-900 p-4 rounded-sm shadow-sm mx-auto"
      >
        <TabsList className="w-full">
          <TabsTrigger
            value="income"
            className="w-1/2 data-[state=active]:bg-slate-900 dark:data-[state=active]:bg-black data-[state=active]:text-slate-50"
          >
            Income
          </TabsTrigger>
          <TabsTrigger
            value="expense"
            className="w-1/2 data-[state=active]:bg-slate-900 dark:data-[state=active]:bg-black data-[state=active]:text-slate-50"
          >
            Expense
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expense">
          <Transaction
            mongoUser={JSON.stringify(mongoUser)}
            transactionType="expense"
            // @ts-ignore
            cycleId={cycle ? JSON.stringify(cycle._id) : null}
          />
        </TabsContent>
        <TabsContent value="income">
          <Transaction
            mongoUser={JSON.stringify(mongoUser)}
            transactionType="income"
            // @ts-ignore
            cycleId={cycle ? JSON.stringify(cycle._id) : null}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Page;
