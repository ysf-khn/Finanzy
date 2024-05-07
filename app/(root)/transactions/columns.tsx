"use client";

import { timeAgo } from "@/lib/utils";
import { ExpenseSchema } from "@/lib/validations";
import { ColumnDef } from "@tanstack/react-table";
import { TrendingDown, TrendingUp } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteTransaction } from "@/lib/actions/transaction.action";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<typeof ExpenseSchema>[] = [
  {
    // accessorKey: "icon",
    id: "null",
    cell: ({ row }) => {
      return row.original?.transactionType === "income" ? (
        <TrendingUp />
      ) : (
        <TrendingDown />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="">
          <p className="line-clamp-1 mb-1.5">{row.original.name}</p>
          <p className="text-slate-500">{timeAgo(row.original.createdAt)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      const transactionType = row.original.transactionType;
      const sign = transactionType === "income" ? "+" : "-";

      return (
        <div className="text-right font-medium">
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
    header: () => <div className="text-right">Notes</div>,

    cell: ({ row }) => {
      const notes: string = row.getValue("notes") || "Empty";

      return <div className="text-right line-clamp-1">{notes}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      const router = useRouter();

      const handleEdit = () => {
        router.push(`/transaction/edit/${transaction._id}`);
      };

      return (
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
            {/* <Link href="/transaction/edit"> */}
            <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
              Edit
            </DropdownMenuItem>
            {/* </Link> */}
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                deleteTransaction({ transactionId: transaction._id });
                console.log(transaction);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
