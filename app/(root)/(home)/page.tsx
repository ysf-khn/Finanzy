import { Button } from "@/components/ui/button";
import { getUserTransactions } from "@/lib/actions/transaction.action";
import {
  getOverallBalance,
  getOverallExpenses,
  getOverallIncome,
  getUserById,
} from "@/lib/actions/user.action";
import { formatNumberWithCommas, getFormattedDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";

import CycleSheet from "@/app/components/CycleSheet";
import {
  getCurrentCycle,
  getCycleTotalExpenses,
  getRemainingCycleBalance,
} from "@/lib/actions/cycle.action";
import { Metadata } from "next";
import CycleOverview from "@/app/components/CycleOverview";

import HomeTransactionDialog from "@/app/components/HomeTransactionDialog";

export const metadata: Metadata = {
  title: "Finanzy | Personalized Expense Management",
  description:
    "Finanzy helps you personalize your budget, completely your way!",
};

const Page = async () => {
  const date = getFormattedDate();
  const { userId } = auth();

  console.log(userId);

  try {
    const mongoUser = await getUserById({ userId });

    const [result, totalIncome, totalExpenses, totalBalance, cycle] =
      await Promise.all([
        getUserTransactions({ userId: mongoUser, limit: 5 }),
        getOverallIncome({ userId: mongoUser }),
        getOverallExpenses({ userId: mongoUser }),
        getOverallBalance({ userId: mongoUser }),
        getCurrentCycle({ userId: mongoUser }),
      ]);

    const [cycleExpenses, cycleBalance] = cycle
      ? await Promise.all([
          getCycleTotalExpenses({ cycleId: cycle._id }),
          getRemainingCycleBalance({ cycleId: cycle._id }),
        ])
      : [null, null];

    return (
      <>
        <HomeTransactionDialog
          mongoUser={JSON.stringify(mongoUser)}
          cycle={cycle}
        />

        <section className="w-full max-sm:px-2 px-6">
          <div className="md:flex items-center justify-between font-semibold max-sm:mb-8 md:mb-12 md:text-xl">
            <p className="max-sm:mb-4">It&apos;s {date}</p>
            <div className="sm:flex gap-4">
              <Link href="/add-transaction">
                <Button className="p-6 primary-gradient w-full sm:w-auto mb-2 sm:mb-0">
                  Add Transaction
                </Button>
              </Link>

              <CycleSheet currentCycle={cycle} />
            </div>
          </div>

          <div className="md:flex gap-6">
            <div className="md:w-2/3">
              <div className="mb-6">
                <CycleOverview
                  mongoUser={JSON.stringify(mongoUser)}
                  cycle={cycle}
                  cycleExpenses={cycleExpenses}
                  cycleBalance={cycleBalance}
                />
              </div>

              <div className="mb-6">
                <h2 className="md:text-xl font-semibold mb-4 md:mb-6">
                  Overall
                </h2>
                <div className="md:flex items-center justify-between gap-6 max-sm:space-y-3">
                  <div className="p-3 md:p-8 flex-1 rounded-xl md:rounded-md border border-1 ">
                    <div className="flex items-center justify-between mb-4">
                      <p>Income</p>
                      <TrendingUp size={20} color="green" />
                    </div>
                    <p className="text-xl md:text-2xl font-bold">
                      ₹ {formatNumberWithCommas(totalIncome)}
                    </p>
                  </div>

                  {/* large screens */}
                  <div className="p-8 flex-1 rounded-md border border-1 max-sm:hidden">
                    <div className="flex items-center justify-between mb-4">
                      <p>Expenses</p>
                      <TrendingDown size={20} color="red" />
                    </div>
                    <p className="text-2xl font-bold">
                      ₹ {formatNumberWithCommas(totalExpenses)}
                    </p>
                  </div>
                  <div className="p-8 flex-1 rounded-md border border-1 max-sm:hidden">
                    <div className="flex items-center justify-between mb-4">
                      <p>Balance</p>
                      <PiggyBank size={20} color="blue" />
                    </div>
                    <p className="text-2xl font-bold">
                      ₹ {formatNumberWithCommas(totalBalance)}
                    </p>
                  </div>

                  {/* small screens */}
                  <div className="max-sm:flex max-sm:gap-4 hidden">
                    <div className="p-3 md:p-8 flex-1 rounded-xl md:rounded-md border border-1 ">
                      <div className="flex items-center justify-between mb-4">
                        <p>Expenses</p>
                        <TrendingDown size={20} color="red" />
                      </div>
                      <p className="max-sm:text-lg text-2xl font-bold">
                        ₹ {formatNumberWithCommas(totalExpenses)}
                      </p>
                    </div>
                    <div className="p-3 md:p-8 flex-1 rounded-xl md:rounded-md border border-1 ">
                      <div className="flex items-center justify-between mb-4">
                        <p>Balance</p>
                        <PiggyBank size={20} color="blue" />
                      </div>
                      <p className={`max-sm:text-lg text-2xl font-bold `}>
                        ₹{" "}
                        {/* <span className={totalBalance <= 0 ? "text-black" : ""}> */}
                        {formatNumberWithCommas(totalBalance)}
                        {/* </span> */}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/3">
              <h2 className="md:text-xl font-semibold mb-4 md:mb-6">
                Recent transactions
              </h2>
              {result!.transactions.length > 0 ? (
                result!.transactions.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between md:text-lg p-4 border mb-3 rounded-xl md:rounded-md"
                  >
                    <div className="flex gap-2">
                      {item.transactionType === "income" ? (
                        <TrendingUp />
                      ) : (
                        <TrendingDown />
                      )}
                      <p className="max-w-[120px] line-clamp-1"> {item.name}</p>
                    </div>
                    <p>₹ {formatNumberWithCommas(item.amount)}</p>
                  </div>
                ))
              ) : (
                <p>No recent transactions 😐. Go add some!</p>
              )}
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default Page;
