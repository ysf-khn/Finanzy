import User from "@/database/user.model";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { DarkModeToggle } from "../../DarkModeToggle";

const Navbar = async () => {
  const { userId } = auth();

  const mongoUser = await User.findOne({ clerkId: userId });

  return (
    <nav className=" py-6 px-12 flex items-center justify-between fixed z-50 shadow-sm w-full bg-white dark:bg-zinc-900">
      <Link href="/" className="">
        <h1 className="text-3xl font-bold ">
          {" "}
          <span className="bg-black dark:bg-slate-50 rounded-full">
            💲
          </span>{" "}
          <span className="text-gradient">Finanzy</span>
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        <p>Hi, {mongoUser.name}</p>
        <UserButton />
        <div className="ml-4">
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
