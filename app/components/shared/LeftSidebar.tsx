import { sidebarLinks } from "@/constants";
import Link from "next/link";
import React from "react";

const LeftSidebar = () => {
  return (
    <section className="sticky left-0 top-0 h-screen pt-32 w-[266px] p-6 shadow-sm z-10">
      <div className="flex flex-col flex-1 gap-6">
        {sidebarLinks.map((link) => (
          <Link
            key={link.route}
            href={link.route}
            className="text-lg hover:bg-slate-900 hover:text-slate-100 p-4 rounded-lg"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LeftSidebar;
