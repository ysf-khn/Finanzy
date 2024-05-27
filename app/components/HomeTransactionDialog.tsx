"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Transaction from "@/app/forms/Transaction";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HomeTransactionDialog = ({ mongoUser, cycle }: any) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDialogOpen(true);
  }, []);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="m-4">
            <Tabs
              defaultValue="expense"
              className=" bg-white dark:bg-zinc-900 p-4 rounded-sm shadow-sm mx-auto"
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
                  mongoUser={mongoUser}
                  transactionType="expense"
                  // @ts-ignore
                  cycleId={cycle ? JSON.stringify(cycle._id) : null}
                />
              </TabsContent>
              <TabsContent value="income">
                <Transaction
                  mongoUser={mongoUser}
                  transactionType="income"
                  // @ts-ignore
                  cycleId={cycle ? JSON.stringify(cycle._id) : null}
                />
              </TabsContent>
            </Tabs>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HomeTransactionDialog;
