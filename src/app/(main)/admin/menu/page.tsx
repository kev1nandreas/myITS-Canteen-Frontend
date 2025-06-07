import MenuTable from "@/components/ui/Table-Menu";

export default function MenusPage() {
  return (
    <div className="md:w-[80%] flex flex-col h-[calc(100vh-4rem)] p-[2rem] overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Menu Kedai</h1>
      <MenuTable rows={menus} />
    </div>
  );
}

const menus = [
  {
    id: "aaa",
    name: "Nasi Goreng",
    price: 15000,
    category: "Makanan",
    image: "https://example.com/nasi-goreng.jpg",
    stock: 20,
  },
  {
    id: "bbb",
    name: "Es Teh Manis",
    price: 5000,
    category: "Minuman",
    image: "https://example.com/es-teh.jpg",
    stock: 50,
  },
  {
    id: "ccc",
    name: "Keripik Singkong",
    price: 7000,
    category: "Snack",
    image: "https://example.com/keripik-singkong.jpg",
    stock: 30,
  },
];
