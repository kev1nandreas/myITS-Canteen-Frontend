import Category from "@/components/Category";
import Menu from "@/components/Menu";
import SelectDropdown from "@/components/ui/Select";
import { Typography } from "@/components/ui/Typography";
import { useFetchVendorbyCanteen } from "@/services/api/hook/useCanteen";
import { typecastVendorResponse } from "@/types/response";
import { MdEditLocationAlt } from "react-icons/md";
import { PiBowlFood, PiHamburger } from "react-icons/pi";
import { RiDrinksLine } from "react-icons/ri";

interface MenuShowUpProps {
  canteenName: string;
}

const handleValueChange = (value: string) => {
  console.log("Selected value:", value);
};

export default function MenuShowUp({ canteenName }: MenuShowUpProps) {
  const canteenId = JSON.parse(
    window.localStorage.getItem("canteen") || "{}"
  ).id;
  const { data } = useFetchVendorbyCanteen(canteenId);
  const kedaisFetched =
    typecastVendorResponse(data?.data)?.map((vendor) => ({
      label: vendor.v_name,
      value: vendor.v_id,
    })) || [];
  const kedais = [{ label: "Semua Kedai", value: "all" }, ...kedaisFetched];

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
        {menus.map((menu) => (
          <Menu
            key={menu.id}
            id={menu.id}
            name={menu.name}
            price={menu.price}
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

const menus = [
  {
    id: "aaa",
    name: "Nasi Goreng",
    price: 15000,
    category: "Makanan",
  },
  {
    id: "bbb",
    name: "Es Teh Manis",
    price: 5000,
    category: "Minuman",
  },
  {
    id: "ccc",
    name: "Keripik Singkong",
    price: 7000,
    category: "Snack",
  },
];
