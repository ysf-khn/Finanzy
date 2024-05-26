// @ts-nocheck
"use client";

import {
  formatNumberWithCommas,
  formatStatementTime,
  timeAgo,
} from "@/lib/utils";
import { ExpenseSchema } from "@/lib/validations";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  TrendingDown,
  TrendingUp,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { deleteTransaction } from "@/lib/actions/transaction.action";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

export const columns: ColumnDef<typeof ExpenseSchema>[] = [
  {
    id: "null",
    cell: ({ row }) => {
      return row.original?.transactionType === "income" ? (
        <TrendingUp className="text-green-500" />
      ) : (
        <TrendingDown className="text-red-500" />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="">
          <div className="line-clamp-1 mb-1.5">
            <p className="w-[100px] md:max-w-[100px]">{row.original.name}</p>
          </div>
          <p className="text-slate-500">{timeAgo(row.original.createdAt)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          className="text-right"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="">Amount</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // <div className="text-right">Amount</div>},
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      const transactionType = row.original.transactionType;
      const sign = transactionType === "income" ? "+" : "-";

      return (
        <div className="text-right font-medium max-sm:w-[100px]">
          {sign} {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: string = row.getValue("category") || "None";

      return <div className="capitalize">{category}</div>;
    },
  },

  {
    accessorKey: "paymentMode",
    header: "Payment Method",
    cell: ({ row }) => {
      const mode: string = row.getValue("paymentMode") || "Not specified";

      return <div className="capitalize">{mode}</div>;
    },
  },

  {
    accessorKey: "notes",
    header: () => <div className="text-right max-w-[200px]">Notes</div>,

    cell: ({ row }) => {
      const notes: string = row.getValue("notes") || "Empty";

      return (
        <div className="text-right line-clamp-1">
          <p className="max-w-[200px]"> {notes}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [dialogOpen, setDialogOpen] = useState(false);
      const transaction = row.original;
      const router = useRouter();

      const handleEdit = () => {
        router.push(`/transaction/edit/${transaction._id}`);
      };

      const showTransactionDialog = () => {
        setDialogOpen(true);
      };

      return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen} asChild>
          <DialogContent className="max-sm:w-[300px]  max-sm:rounded-md">
            <DialogHeader className="p-2 max-sm:text-left">
              <DialogTitle className="mb-3">{transaction.name}</DialogTitle>
              <div className="max-sm:text-sm space-y-2">
                <p>
                  <strong>Type:</strong>{" "}
                  <span
                    className={`${
                      transaction.transactionType === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    } capitalize`}
                  >
                    {transaction.transactionType}
                  </span>
                </p>
                <p>
                  <strong>Amount:</strong> Rs.
                  {formatNumberWithCommas(transaction.amount)}
                </p>
                <p>
                  <strong>Added on: </strong>
                  {formatStatementTime(transaction.createdAt)}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  <span className="capitalize">
                    {transaction.category || "None"}
                  </span>
                </p>
                <p>
                  <strong>Payment Mode:</strong>{" "}
                  <span className="capitalize">
                    {transaction.paymentmode || "Not Specified"}
                  </span>
                </p>
                <p>
                  <strong>Notes:</strong> {transaction.notes}
                </p>
              </div>
            </DialogHeader>
          </DialogContent>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={showTransactionDialog}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  deleteTransaction({ transactionId: transaction._id });

                  toast({
                    title: "Success",
                    description: "Transaction deleted successfully.",
                  });
                  // console.log(transaction);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>

        // </>
      );
    },
  },
];
