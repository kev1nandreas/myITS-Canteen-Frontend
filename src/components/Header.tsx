"use client";

import { CiLogin } from "react-icons/ci";
import {
  decrypt,
  useGetMe,
  useGetSidebar,
  useSetMe,
  useSetSidebar,
} from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";

let isInitialized = false;

export default function Header() {
  const setAuth = useSetMe();
  const { name, role } = useGetMe();
  const setSidebar = useSetSidebar();
  const { isOpen } = useGetSidebar();
  const [isOpenSidebar, setIsOpenSidebar] = useState(isOpen);

  useEffect(() => {
    if (isInitialized) return;
    const encryptedName = window.localStorage.getItem("name");
    const encryptedRole = window.localStorage.getItem("roles");
    const name = encryptedName ? decrypt(encryptedName) : "Guest";
    const role = encryptedRole ? decrypt(encryptedRole) : "guest";
    setAuth.setMe(role, name);
    isInitialized = true;
  }, [setAuth]);

  return (
    <header className="flex top-0 items-center h-[4rem] border-b-[1px] border-slate-300 bg-white justify-between px-[2rem]">
      <div className="flex items-center cursor-pointer">
        <IoMdMenu
          className="text-2xl mr-[1.5rem] md:hidden"
          onClick={(e) => {
            e.stopPropagation();
            setSidebar.setSidebar(!isOpenSidebar);
            setIsOpenSidebar(!isOpenSidebar);
          }}
        />
        <Image
          src={"/Logo.jpg"}
          alt={"logo"}
          width={100}
          height={100}
          priority={true}
          className="w-[6rem] rounded-full pointer-events-none select-none"
          onClick={() => window.location.replace("/")}
        />
      </div>
      <div className="flex items-center gap-5">
        {role === "guest" && (
          <button
            className="p-2 px-3 flex gap-2 items-center justify-center bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 ease-in-out cursor-pointer"
            onClick={() => {
              window.location.replace("/login");
            }}
          >
            <CiLogin />
            Login
          </button>
        )}
        <div>
          <div
            className={`flex gap-3 items-center ${
              role === "guest" ? "hidden" : ""
            }`}
          >
            <div className="hidden md:block">
              {name ? (
                <p>{name}</p>
              ) : (
                <div className="h-5 w-[100px] bg-gray-200 rounded-lg animate-pulse" />
              )}
            </div>
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-blue-300 text-white font-semibold">
              <FaRegUser />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
