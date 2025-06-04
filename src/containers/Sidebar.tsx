"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import MenuSidebar from "@/components/MenuSidebar";
import { IoCart, IoFastFood } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { RiBillLine } from "react-icons/ri";
import { useLogout } from "@/services/api/hook/useAuth";
import toast from "react-hot-toast";
import { removeCookies } from "@/modules/cookies";
import { ENV } from "@/configs/environment";
import { useGetMe, useGetSidebar, useSetSidebar } from "@/lib/utils";

export default function Sidebar() {
  const router = useRouter();
  const { role } = useGetMe();
  const { isOpen } = useGetSidebar();
  const ref = useRef<HTMLDivElement>(null);
  const { setSidebar } = useSetSidebar();

  const mutation = useLogout({
    onSuccess: () => {
      toast.success("Logout Berhasil");
      removeCookies(ENV.TOKEN_KEY);
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Logout Gagal");
    },
  });

  const handleLogout = async () => {
    await mutation.mutateAsync();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSidebar]);

  return (
    <div
      className={`flex md:sticky fixed z-20 top-[4rem] flex-col items-center justify-between md:w-[20%] w-[15rem] gap-2 bg-white p-3 h-[calc(100vh-4rem)] border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
      ref={ref}
    >
      <div className="w-full flex flex-col gap-2">
        {/* Menu */}
        <div className="flex flex-col w-full gap-1 pt-2">
          {role === "user" &&
            menuItems.map((item, index) => (
              <MenuSidebar
                key={index}
                menu={item.menu}
                icon={item.icon}
                location={item.redirect}
              />
            ))}
          {role === "guest" &&
            menuItems
              .slice(0, 2)
              .map((item, index) => (
                <MenuSidebar
                  key={index}
                  menu={item.menu}
                  icon={item.icon}
                  location={item.redirect}
                />
              ))}
        </div>
      </div>

      {/* Log Out */}
      {role === "admin" ||
        (role === "user" && (
          <div
            className="flex gap-3 w-full p-3 md:px-5 border-2 font-semibold text-red-500 border-red-500 hover:text-blue-400 md:hover:text-white cursor-pointer select-none duration-300 transition-all ease-in-out rounded-lg md:hover:bg-red-500 items-center justify-start"
            onClick={() => {
              handleLogout();
            }}
          >
            {<IoIosLogOut className="text-[1.5rem]" />}
            <p className="font-medium">Log Out</p>
          </div>
        ))}
    </div>
  );
}

const menuItems = [
  { menu: "Menu", icon: IoFastFood, redirect: "/" },
  { menu: "Keranjang", icon: IoCart, redirect: "/cart" },
  { menu: "Histori", icon: RiBillLine, redirect: "/history" },
  { menu: "Profil", icon: FaRegUserCircle, redirect: "/profile" },
];
