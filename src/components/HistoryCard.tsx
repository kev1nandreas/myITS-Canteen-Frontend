import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import TransactionDetail from "./TransactionDetail";
import { TransactionHistoryResponse } from "@/types/response";

interface HistoryCardProps {
  transaction: TransactionHistoryResponse;
}

export default function HistoryCard({ transaction }: HistoryCardProps) {
  const [isOpenPopUp, setIsOpenPopup] = useState(false);

  return (
    <div className="flex flex-col gap-4 max-w-[40rem] p-5 bg-white rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex flex-col">
          <p className="text-sm opacity-50">{transaction.t_id}</p>
          <p className="text-sm">{transaction.t_time}</p>
        </div>
        <p
          className={`text-green-500 flex items-center gap-1 ${
            transaction.t_status === "selesai"
              ? "text-green-500"
              : transaction.t_status === "Menunggu Konfirmasi"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {transaction.t_status === "selesai" && <FaCheckCircle />}
          {transaction.t_status === "Menunggu Konfirmasi" && <FaClock />}
          {transaction.t_status === "ditolak" && <IoCloseCircle />}
          {transaction.t_status === "selesai" && "Selesai"}
          {transaction.t_status === "Menunggu Konfirmasi" &&
            "Menunggu Konfirmasi"}
          {transaction.t_status === "ditolak" && "Ditolak"}
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <p className="truncate md:max-w-[60%]">
          {transaction.items.map((item) => item.m_name).join(", ")}
        </p>
        <p className="opacity-50">Jumlah: {transaction.items.length}</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-sm">Total Harga:</p>
          <p className="text-lg font-bold">
            {formatPrice(transaction.t_total)}
          </p>
        </div>
        <p className="hidden md:block">
          Tipe: {transaction.t_is_dine ? "Dine In" : "Take Away"}
        </p>
        <button
          onClick={() => setIsOpenPopup(true)}
          className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
        >
          <CgDetailsMore />
          Lihat Detail
        </button>
      </div>

      {/* Pop Up Detail */}
      {isOpenPopUp && (
        <TransactionDetail
          transaction={transaction}
          handleClose={() => setIsOpenPopup(false)}
        />
      )}
    </div>
  );
}
