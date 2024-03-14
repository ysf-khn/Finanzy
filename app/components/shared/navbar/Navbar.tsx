import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-slate-300 py-6 px-12 flex items-center justify-between fixed z-50 shadow-sm w-full border-b border-black">
      <Link href="/" className="">
        <h1 className="text-3xl font-bold ">Finanzy</h1>
      </Link>
      <div>
        Hi, Yusuf
        <span> 👨🏼‍🦰</span>
      </div>
    </nav>
  );
};

export default Navbar;
