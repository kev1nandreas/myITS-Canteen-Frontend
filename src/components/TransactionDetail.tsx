"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { formatPrice } from "@/lib/utils";
import TimelineStatus from "./TimelineStatus";
import { TransactionHistoryResponse } from "@/types/response";

interface TransactionDetailProps {
  transaction: TransactionHistoryResponse;
  handleClose: () => void;
}

export default function TransactionDetail({
  transaction,
  handleClose,
}: TransactionDetailProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 transition-all duration-300 ease-in-out"
      data-aos="fade-in"
    >
      <div
        ref={ref}
        className="w-[30rem] h-fit flex m-2 flex-col gap-y-6 bg-white p-8 rounded-2xl text-center"
      >
        <h1 className="text-2xl font-semibold mb-4">Detail Transaksi</h1>
        {/* General Informations */}
        <div className="flex flex-col gap-1 text-left">
          <div className="flex gap-2 opacity-60 text-sm">
            <p className="w-[8rem]">ID:</p>
            <p className="overflow-hidden">{transaction.t_id}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[8rem]">Tanggal:</p>
            <p>{transaction.t_time}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[8rem]">Tipe:</p>
            <p>{transaction.t_is_dine ? "Dine In" : "Take Away"}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[8rem]">Total Harga:</p>
            <p>{formatPrice(transaction.t_total)}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[8rem]">Kursi:</p>
            <p>
              {transaction.reservation?.chairs
                .map((chair) => chair.ch_name)
                .join(", ") || "-"}
            </p>
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-lg font-semibold">Daftar Item</h2>
          <ul className="list-disc pl-5">
            {transaction.items.map((item) => (
              <li key={item.m_id}>
                {item.m_name} - {item.m_quantity} x {formatPrice(item.m_price)}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-lg font-semibold">Lacak Proses</h2>
          <div className="p-3">
            <TimelineStatus
              status={transaction.t_status}
              created_time={transaction.t_time}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
