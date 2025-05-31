import { MdEditLocationAlt } from "react-icons/md";

interface MenuShowUpProps {
  canteenName: string;
}

export default function MenuShowUp({ canteenName }: MenuShowUpProps) {
  return (
    <div className="flex flex-col items-center w-full h-[calc(100vh-4rem)] p-[2rem]">
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Menu {canteenName}</h1>
        <button
          className="md:px-6 md:py-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 ease-in-out cursor-pointer flex items-center gap-3"
          onClick={() => {
            window.localStorage.removeItem("canteen");
            window.location.replace("/");
          }}
        >
          <MdEditLocationAlt className="md:text-xl" />
          <p className="hidden md:block">Ganti Kantin</p>
        </button>
      </div>
    </div>
  );
}
