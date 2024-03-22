import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LeftSidebar = () => {
  return (
    <section className="sticky left-0 top-0 h-screen pt-32 w-[310px] p-6 shadow-sm z-10 dark:bg-zinc-900">
      <div className="flex flex-col flex-1 gap-6">
        {sidebarLinks.map((link) => (
          <Link
            key={link.route}
            href={link.route}
            className="flex items-center justify-start gap-3 text-lg hover:bg-slate-900 hover:text-slate-100 p-4 rounded-lg"
          >
            <Image
              className="rounded-full primary-gradient p-2"
              src={link.iconUrl}
              alt={link.label}
              width={35}
              height={35}
            />
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LeftSidebar;
