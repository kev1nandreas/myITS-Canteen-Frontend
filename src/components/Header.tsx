"use client";

import { decrypt } from "@/lib/utils";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  const nameEncrypted = localStorage.getItem("name")
  const name = nameEncrypted ? decrypt(nameEncrypted) : "Guest";

  return (
    <header className="flex items-center h-[4rem] border-b-[1px] border-slate-300 bg-white justify-between px-[2rem]">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => window.location.replace("/")}
      >
        <Image
          src={"/Logo.jpg"}
          alt={"logo"}
          width={100}
          height={100}
          className="w-[6rem] rounded-full pointer-events-none select-none"
        />
      </div>
      <div className="flex gap-3 items-center">
        <p>{name}</p>
        <div className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-blue-300 text-white font-semibold">
          <FaRegUser />
        </div>
      </div>
    </header>
  );
}
