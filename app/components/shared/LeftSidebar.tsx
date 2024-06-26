"use client";

import { sidebarLinks } from "@/constants";
import { ArrowLeftRight, Banknote, LayoutDashboard } from "lucide-react";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 h-screen pt-32 max-sm:hidden lg:w-[310px] p-6 shadow-sm z-10 dark:bg-zinc-900">
      <div className="flex flex-col flex-1 gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              key={link.route}
              href={link.route}
              className={`${
                isActive ? "primary-gradient font-semibold text-white" : ""
              }  flex items-center justify-start gap-3 text-lg p-4 rounded-lg`}
            >
              {link.label === "Dashboard" ? (
                <LayoutDashboard
                  size={20}
                  color={isActive ? "white" : "green"}
                />
              ) : link.label === "All Transactions" ? (
                <Banknote size={20} color={isActive ? "white" : "green"} />
              ) : (
                <ArrowLeftRight
                  size={20}
                  color={isActive ? "white" : "green"}
                />
              )}
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default LeftSidebar;
