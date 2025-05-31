"use client";

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

export default function Header() {
  const setAuth = useSetMe();
  const { name } = useGetMe();
  const setSidebar = useSetSidebar();
  const { isOpen } = useGetSidebar();
  const [isOpenSidebar, setIsOpenSidebar] = useState(isOpen);

  useEffect(() => {
    const encryptedName = window.localStorage.getItem("name");
    const encryptedRole = window.localStorage.getItem("roles");
    const name = encryptedName ? decrypt(encryptedName) : "Guest";
    const role = encryptedRole ? decrypt(encryptedRole) : "guest";
    setAuth.setMe(role, name);
  }, [setAuth]);

  return (
    <header className="flex items-center h-[4rem] border-b-[1px] border-slate-300 bg-white justify-between px-[2rem]">
      <div className="flex items-center cursor-pointer">
        <IoMdMenu
          className="text-2xl mr-[2rem] md:hidden"
          onClick={e => {
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
          className="w-[6rem] rounded-full pointer-events-none select-none"
          onClick={() => window.location.replace("/")}
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
