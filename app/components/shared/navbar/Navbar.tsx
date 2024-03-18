import User from "@/database/user.model";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const { userId } = auth();

  const mongoUser = await User.findOne({ clerkId: userId });

  return (
    <nav className=" py-6 px-12 flex items-center justify-between fixed z-50 shadow-sm w-full bg-white ">
      <Link href="/" className="">
        <h1 className="text-3xl font-bold ">
          {" "}
          <span className="bg-black rounded-full">💲</span> Finanzy
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        <p>
          <span className="text-green-500">Hi</span>, {mongoUser.name}
        </p>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
