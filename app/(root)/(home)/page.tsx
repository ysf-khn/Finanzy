// "use client";
import { Button } from "@/components/ui/button";
import { getUserTransactions } from "@/lib/actions/transaction.action";
import {
  getOverallBalance,
  getOverallExpenses,
  getOverallIncome,
  getUserById,
} from "@/lib/actions/user.action";
import { formatNumberWithCommas, getFormattedDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { DollarSign, PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";

import CycleSheet from "@/app/components/CycleSheet";
import { getCycle } from "@/lib/actions/cycle.action";

// async function fetchUserData(userId: string | null) {
//   try {
//     const [
//       mongoUser,
//       transactions,
//       totalIncome,
//       totalExpenses,
//       totalBalance,
//       cycle,
//     ] = await Promise.all([
//       getUserById({ userId }),
//       getUserTransactions({ userId, limit: 5 }),
//       getOverallIncome({ userId }),
//       getOverallExpenses({ userId }),
//       getOverallBalance({ userId }),
//       // @ts-ignore
//       getCycle({ userId }),
//     ]);

//     // Organize data into a user object
//     const user = {
//       ...mongoUser,
//       transactions,
//       totalIncome,
//       totalExpenses,
//       totalBalance,
//       cycle,
//     };

//     return user;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     // Handle the error appropriately (e.g., display a user-friendly error message)
//   }
// }

const Page = async () => {
  const date = getFormattedDate();
  const { userId } = auth();

  // const user = await fetchUserData(userId);

  const mongoUser = await getUserById({ userId });

  const result = await getUserTransactions({ userId: mongoUser, limit: 5 });
  const totalIncome = await getOverallIncome({ userId: mongoUser });
  const totalExpenses = await getOverallExpenses({ userId: mongoUser });
  const totalBalance = await getOverallBalance({ userId: mongoUser });
  const cycle = await getCycle({ userId: mongoUser });

  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-semibold mb-12 text-xl">
        <p>It&apos;s {date}</p>
        <div className="flex gap-4">
          <Link href="/add-transaction">
            <Button className="p-6 primary-gradient">Add Transaction</Button>
          </Link>

          <CycleSheet />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="w-2/3">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-6">This Cycle</h2>
            <div className="flex items-center justify-between gap-6">
              <div className="p-8 flex-1 rounded-md border border-1 ">
                <div className="flex items-center justify-between mb-4">
                  <p>Budget</p>
                  <DollarSign size={20} color="blue" />
                </div>
                <p className="text-2xl font-bold">₹{cycle.budget}</p>
              </div>
              <div className="p-8 flex-1 rounded-md border ">
                <div className="flex items-center justify-between mb-4">
                  <p>Spent</p>
                  <TrendingDown size={20} color="red" />
                </div>
                <p className="text-2xl font-bold">₹45,231.89</p>
              </div>
              <div className="p-8 flex-1 rounded-md border border-1 ">
                <div className="flex items-center justify-between mb-4">
                  <p>Balance</p>
                  <PiggyBank size={20} color="green" />
                </div>
                <p className="text-2xl font-bold">₹45,231.89</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Overall</h2>
            <div className="flex items-center justify-between gap-6">
              <div className="p-8 flex-1 rounded-md border border-1 ">
                <div className="flex items-center justify-between mb-4">
                  <p>Income</p>
                  <TrendingUp size={20} color="green" />
                </div>
                <p className="text-2xl font-bold">
                  ₹ {formatNumberWithCommas(totalIncome)}
                </p>
              </div>
              <div className="p-8 flex-1 rounded-md border border-1 ">
                <div className="flex items-center justify-between mb-4">
                  <p>Expenses</p>
                  <TrendingDown size={20} color="red" />
                </div>
                <p className="text-2xl font-bold">
                  ₹ {formatNumberWithCommas(totalExpenses)}
                </p>
              </div>
              <div className="p-8 flex-1 rounded-md border border-1 ">
                <div className="flex items-center justify-between mb-4">
                  <p>Balance</p>
                  <PiggyBank size={20} color="blue" />
                </div>
                <p className="text-2xl font-bold">
                  ₹ {formatNumberWithCommas(totalBalance)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <h2 className="text-xl font-semibold mb-6">Recent transactions</h2>
          {result.transactions.length > 0 ? (
            result.transactions.map((item: any) => (
              <div className="flex items-center justify-between text-lg p-4 border mb-3 rounded-md">
                <div className="flex gap-2">
                  {item.transactionType === "income" ? (
                    <TrendingUp />
                  ) : (
                    <TrendingDown />
                  )}
                  <p> {item.name}</p>
                </div>
                <p>₹ {formatNumberWithCommas(item.amount)}</p>
              </div>
            ))
          ) : (
            <p>Start adding some transactions now!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
