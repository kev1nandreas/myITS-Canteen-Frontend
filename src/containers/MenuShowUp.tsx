import Category from "@/components/Category";
import Menu from "@/components/Menu";
import SelectDropdown from "@/components/ui/Select";
import { Typography } from "@/components/ui/Typography";
import {
  useFetchMenubyCanteen,
  useFetchVendorbyCanteen,
} from "@/services/api/hook/useCanteen";
import { useFetchMenubyVendor } from "@/services/api/hook/useVendor";
import { typecastMenuResponse, typecastVendorResponse } from "@/types/response";
import { useState } from "react";
import { MdEditLocationAlt } from "react-icons/md";
import { PiBowlFood, PiHamburger } from "react-icons/pi";
import { RiDrinksLine } from "react-icons/ri";

interface MenuShowUpProps {
  canteenName: string;
}

export default function MenuShowUp({ canteenName }: MenuShowUpProps) {
  const canteenId = JSON.parse(
    window.localStorage.getItem("canteen") || "{}"
  ).id;

  // Fetch vendors by canteen
  const { data } = useFetchVendorbyCanteen(canteenId);
  const kedaisFetched =
    typecastVendorResponse(data?.data)?.map((vendor) => ({
      label: vendor.v_name,
      value: vendor.v_name,
    })) || [];
  const kedais = [{ label: "Semua Kedai", value: "all" }, ...kedaisFetched];

  // State for selected vendor
  const [selectedVendor, setSelectedVendor] = useState<string>("all");

  // Fetch menus by canteen
  const { data: menusRaw, isLoading } = useFetchMenubyCanteen(canteenId);
  const { data: vendorMenusRaw } = useFetchMenubyVendor(selectedVendor);

  // Determine which menus to show
  const menus =
    selectedVendor === "all"
      ? typecastMenuResponse(menusRaw?.data)
      : typecastMenuResponse(vendorMenusRaw?.data);

  const handleValueChange = (value: string) => {
    setSelectedVendor(value);
  };

  const [isSelectedCat, setIsSelectedCat] = useState("");

  // Filter menus by selected category
  const filteredMenus = menus?.filter((menu) => {
    if (isSelectedCat === "") return true;
    return menu.m_category === isSelectedCat;
  });

  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-4rem)] p-[2rem] overflow-y-auto">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Menu {canteenName}</h1>
        <button
          className="md:px-6 md:py-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 ease-in-out cursor-pointer flex items-center gap-3"
          onClick={() => {
            window.localStorage.removeItem("canteen");
            window.localStorage.removeItem("cart");
            window.location.replace("/");
          }}
        >
          <MdEditLocationAlt className="md:text-xl" />
          <p className="hidden md:block">Ganti Kantin</p>
        </button>
      </div>
      {/* Category & Kedai Group */}
      <div className="flex flex-wrap w-full md:gap-10">
        {/* Kategori */}
        <div>
          <Typography text={"h6"} className="w-full text-left mt-[1.5rem]">
            Kategori
          </Typography>
          <div className="flex w-[calc(100vw-4rem)] md:w-fit items-center justify-start pt-[1rem] gap-5 overflow-x-auto">
            {categories.map((category, index) => (
              <Category
                key={index}
                name={category.name}
                icon={category.image}
                active={isSelectedCat === category.name}
                handleClick={() => {
                  setIsSelectedCat(
                    isSelectedCat === category.name ? "" : category.name
                  );
                }}
              />
            ))}
          </div>
        </div>

        {/* Kedai */}
        <div>
          <Typography
            text={"h6"}
            className="w-full text-left mt-[1.5rem] pb-[1rem]"
          >
            Kedai
          </Typography>
          {}
          <SelectDropdown
            name="kedai"
            placeholder="Filter berdasar kedai"
            datas={kedais}
            onSelect={handleValueChange}
          />
        </div>
      </div>

      {/* Menu */}
      <Typography text={"h6"} className="w-full text-left mt-[1.5rem]">
        Menu
      </Typography>
      <div className="flex flex-wrap items-center justify-start w-full mt-[1rem] gap-5">
        {isLoading && (
          <Typography text={"body"} className="w-full text-center">
            Memuat menu...
          </Typography>
        )}
        {filteredMenus &&
          filteredMenus.map((menu) => (
            <Menu
              key={menu.m_id}
              id={menu.m_id ?? ""}
              name={menu.m_name}
              price={menu.m_price}
              image={menu.m_image || "/Menu/blank-bg.png"}
            />
          ))}
      </div>
    </div>
  );
}

const categories = [
  {
    name: "Makanan",
    image: PiBowlFood,
  },
  {
    name: "Minuman",
    image: RiDrinksLine,
  },
  {
    name: "Snack",
    image: PiHamburger,
  },
];
