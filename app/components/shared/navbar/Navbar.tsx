import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className=" py-6 px-12 flex items-center justify-between fixed z-50 shadow-sm w-full bg-white ">
      <Link href="/" className="">
        <h1 className="text-3xl font-bold ">
          {" "}
          <span className="bg-black rounded-full">💲</span> Finanzy
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        <p>Hi, Yusuf!</p>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
