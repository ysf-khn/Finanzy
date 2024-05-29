import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";

const loading = () => {
  return (
    <section className="w-full">
      <div className="md:flex max-sm:mb-4 items-center max-sm:px-2 md:px-6 justify-between font-bold mb-8 md:text-xl">
        <Skeleton className="max-sm:mb-4 w-[166px] h-[28px] rounded-md" />
        <div className="sm:flex items-center gap-4">
          <Link href="/add-transaction">
            <Skeleton className="p-6 primary-gradient text-slate-100 h-[48px] w-[164px] sm:w-auto mb-2 sm:mb-0 rounded-md" />
          </Link>
          <Skeleton className="p-6 primary-gradient text-slate-100 h-[48px] w-[164px] sm:w-auto mb-2 sm:mb-0 rounded-md" />
        </div>
      </div>
      <div className="md:container mx-auto max-sm:py-4 md:py-10 h-auto">
        <Skeleton className="w-full h-]100px] rounded-md" />
      </div>
    </section>
  );
};

export default loading;
