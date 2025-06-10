/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PopOverCreateMenu from "@/components/PopOverCreate";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/Search";
import MenuTable from "@/components/ui/Table-Menu";
import { withAuth } from "@/lib/hoc/withAuth";
import { useFetchVendorMenu } from "@/services/api/hook/useVendor";
import { PATH } from "@/shared/path";
import { typecastMenuResponse } from "@/types/response";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function MenusPage() {
  const [filterMenus, setFilterMenus] = useState("");
  const { data: menusRaw, isLoading, refetch } = useFetchVendorMenu();
  const menus = typecastMenuResponse(menusRaw?.data) || [];
  const [filteredMenus, setFilteredMenus] = useState(menus);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (filterMenus) {
        const lowerFilter = filterMenus.toLowerCase();
        setFilteredMenus(
          menus.filter((menu) =>
            menu.m_name.toLowerCase().includes(lowerFilter)
          )
        );
      } else {
        setFilteredMenus(menus);
      }
    }, 1000);
  }, [filterMenus, menus]);

  return (
    <div className="md:w-[80%] flex flex-col h-[calc(100vh-4rem)] p-[2rem] overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Menu Kedai</h1>
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="w-[25rem]">
          <SearchBar
            value={filterMenus}
            onChange={(value) => setFilterMenus(value)}
            placeholder="Cari menu..."
          />
        </div>
        <Button
          onClick={() => {
            setIsAdding(true);
          }}
          className="rounded-lg flex justify-center items-center gap-2 h-full"
        >
          <IoMdAddCircleOutline className="text-xl" />{" "}
          <span className="md:block hidden">Tambah Menu</span>
        </Button>
      </div>

      {isAdding && (
        <PopOverCreateMenu
          refetch={refetch}
          handleClose={() => {
            setIsAdding(false);
          }}
        />
      )}
      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      )}
      {!isLoading && menus.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p>Tidak ada menu yang ditemukan.</p>
        </div>
      )}
      {!isLoading && <MenuTable rows={filteredMenus} refetch={refetch} />}
    </div>
  );
}

export default withAuth(MenusPage, {
  allowedRoles: ["admin"],
  redirectTo: PATH.ADMIN,
});
