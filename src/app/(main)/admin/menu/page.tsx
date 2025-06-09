"use client";

import PopOverCreateMenu from "@/components/PopOverCreate";
import Button from "@/components/ui/Button";
import SearchBar from "@/components/ui/Search";
import MenuTable from "@/components/ui/Table-Menu";
import { withAuth } from "@/lib/hoc/withAuth";
import { PATH } from "@/shared/path";
import { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function MenusPage() {
  const [filterMenus, setFilterMenus] = useState("");
  const [filteredMenus, setFilteredMenus] = useState(menus);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (filterMenus.trim() === "") {
        setFilteredMenus(menus);
      } else {
        const lowerCaseFilter = filterMenus.toLowerCase();
        const filtered = menus.filter((menu) =>
          menu.name.toLowerCase().includes(lowerCaseFilter)
        );
        setFilteredMenus(filtered);
      }
    }, 1000);
  }, [filterMenus]);

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
          handleClose={() => {
            setIsAdding(false);
          }}
        />
      )}

      <MenuTable rows={filteredMenus} />
    </div>
  );
}

export default withAuth(MenusPage, {
  allowedRoles: ["admin"],
  redirectTo: PATH.ADMIN,
});

const menus = [
  {
    id: "aaa",
    name: "Nasi Goreng",
    price: 15000,
    category: "Makanan",
    image: "",
    stock: 20,
    last_modified: "",
  },
  {
    id: "bbb",
    name: "Es Teh Manis",
    price: 5000,
    category: "Minuman",
    image: "",
    stock: 50,
    last_modified: "",
  },
  {
    id: "ccc",
    name: "Keripik Singkong",
    price: 7000,
    category: "Snack",
    image: "",
    stock: 30,
    last_modified: "",
  },
];
