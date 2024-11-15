import React from "react";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <div className="h-14 flex w-full justify-center items-center top-0 fixed bg-background z-10 px-3 ">
      <div className="flex w-full max-w-screen-lg justify-between items-center">
        <h1 className="font-extrabold text-2xl text-slate-700">
          Simply Invoice
        </h1>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
