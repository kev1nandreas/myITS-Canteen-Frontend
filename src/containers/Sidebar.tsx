"use client";

import React from "react";
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

export default function Sidebar() {
  const router = useRouter();

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

  const menuItems = [
    { menu: "Menu", icon: IoFastFood, redirect: "/" },
    { menu: "Keranjang", icon: IoCart, redirect: "/trash" },
    { menu: "Histori", icon: RiBillLine, redirect: "/events" },
    { menu: "Profil", icon: FaRegUserCircle, redirect: "/liked" },
  ];

  return (
    <div className="flex flex-col items-center justify-between w-[20%] gap-2 bg-white p-3 h-[calc(100vh-4rem)]">
      <div className="w-full flex flex-col gap-2">
        {/* Menu */}
        <div className="flex flex-col w-full gap-1 pt-2">
          {menuItems.map((item, index) => (
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
      <div
        className="flex gap-3 w-full p-3 md:px-5 border-2 font-semibold text-red-500 border-red-500 hover:text-blue-400 md:hover:text-white cursor-pointer select-none duration-300 transition-all ease-in-out rounded-lg md:hover:bg-red-500 items-center justify-center md:justify-start"
        onClick={() => {
          handleLogout();
        }}
      >
        {<IoIosLogOut className="text-[1.5rem]" />}
        <p className="font-medium md:block hidden">Log Out</p>
      </div>
    </div>
  );
}
