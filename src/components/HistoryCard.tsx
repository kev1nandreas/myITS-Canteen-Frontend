import { formatPrice } from "@/lib/utils";
import { CgDetailsMore } from "react-icons/cg";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

interface HistoryCardProps {
  id: string;
  date: string;
  time: string;
  status: string;
  items: string[];
  totalPrice: number;
  type: string;
}

export default function HistoryCard({
  id,
  date,
  time,
  status,
  items,
  totalPrice,
  type,
}: HistoryCardProps) {
  return (
    <div className="flex flex-col gap-4 max-w-[40rem] p-5 bg-white rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col">
          <p className="text-sm opacity-50">{id}</p>
          <p className="text-sm">{date + " " + time}</p>
        </div>
        <p
          className={`text-green-500 flex items-center gap-1 ${
            status === "selesai"
              ? "text-green-500"
              : status === "validasi"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {status === "selesai" && <FaCheckCircle />}
          {status === "validasi" && <FaClock />}
          {status === "ditolak" && <IoCloseCircle />}
          {status === "selesai" && "Selesai"}
          {status === "validasi" && "Validasi"}
          {status === "ditolak" && "Ditolak"}
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <p className="truncate md:max-w-[60%]">{items.join(", ")}</p>
        <p className="opacity-50">Jumlah: {items.length}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-sm">Total Harga:</p>
          <p className="text-lg font-bold">{formatPrice(totalPrice)}</p>
        </div>
        <p className="hidden md:block">Tipe: {type}</p>
        <button className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200">
          <CgDetailsMore />
          Lihat Detail
        </button>
      </div>
    </div>
  );
}
