import React from "react";
import Navbar from "../components/shared/navbar/Navbar";
import LeftSidebar from "../components/shared/LeftSidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="pt-32 p-4 w-full bg-slate-50">
          <div>{children}</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;
