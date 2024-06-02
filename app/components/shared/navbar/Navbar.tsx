import User from "@/database/user.model";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { DarkModeToggle } from "../../DarkModeToggle";
import { Wallet } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const { userId } = auth();

  const mongoUser = await User.findOne({
    clerkId: userId,
  });

  return (
    <nav className=" py-3 max-sm:px-6 md:px-12 md:py-6 flex items-center justify-between fixed z-50 shadow-sm w-full bg-white dark:bg-zinc-900">
      <Link href="/" className="">
        <h1 className="text-3xl font-bold flex items-center">
          {" "}
          <span className="bg-black p-3 dark:bg-slate-50 rounded-full mr-3 max-sm:hidden">
            <Wallet color="green" size={26} />
          </span>{" "}
          <span className="text-gradient">Finanzy</span>
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        <p className="max-sm:hidden">Hi, {mongoUser.name}</p>
        <UserButton />
        <div className="md:ml-4">
          <DarkModeToggle />
        </div>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
