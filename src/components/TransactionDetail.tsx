"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { formatPrice } from "@/lib/utils";
import TimelineStatus from "./TimelineStatus";

interface TransactionDetailProps {
  handleClose: () => void;
}

export default function TransactionDetail({
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
          <div className="flex gap-2 opacity-60">
            <p className="w-[10rem]">ID:</p>
            <p>67176-123456</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[10rem]">Tanggal:</p>
            <p>5 Juli 2025 12:30 AM</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[10rem]">Tipe:</p>
            <p>Dine In</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[10rem]">Total Harga:</p>
            <p>{formatPrice(123000)}</p>
          </div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-lg font-semibold">Daftar Item</h2>
          <ul className="list-disc pl-5">
            <li>Pizza Margherita - 1 pcs</li>
            <li>Pasta Carbonara - 2 pcs</li>
            <li>Salad Caesar - 1 pcs</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 text-left">
          <h2 className="text-lg font-semibold">Lacak Proses</h2>
          <div className="p-3">
            <TimelineStatus />
          </div>
        </div>
      </div>
    </div>
  );
}
