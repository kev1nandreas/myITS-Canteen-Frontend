"use client";

import HistoryCard from "@/components/HistoryCard";
import Tabs from "@/components/ui/Tabs";
import { withAuth } from "@/lib/hoc/withAuth";
import { PATH } from "@/shared/path";
import { useState } from "react";

function History() {
  const [activeTab, setActiveTab] = useState("validasi");

  return (
    <div className="flex flex-col md:w-[80%] h-[calc(100vh-4rem)] p-[2rem] overflow-y-auto w-full">
      <h1 className="text-3xl font-bold">Histori Transaksi</h1>
      <div className="flex items-center justify-start mt-4 mb-6 border-b border-gray-200 gap-4">
        {FilterTabs.map((tab) => (
          <Tabs
            key={tab.value}
            label={tab.label}
            active={activeTab === tab.value}
            onClick={() => setActiveTab(tab.value)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {Transaction.filter((transaction) => {
          if (activeTab === "validasi")
            return transaction.status === "validasi";
          if (activeTab === "selesai") return transaction.status === "selesai";
          if (activeTab === "ditolak") return transaction.status === "ditolak";
          return true;
        }).map((transaction) => (
          <HistoryCard
            key={transaction.id}
            id={transaction.id}
            date={transaction.date}
            time={transaction.time}
            status={transaction.status}
            items={transaction.items}
            totalPrice={transaction.totalPrice}
            type={transaction.type}
          />
        ))}
      </div>
    </div>
  );
}

export default withAuth(History, {
  redirectTo: PATH.AUTH.LOGIN,
  allowedRoles: ["user", "admin"],
});

const FilterTabs = [
  {
    label: "Validasi",
    value: "validasi",
  },
  {
    label: "Selesai",
    value: "selesai",
  },
  {
    label: "Ditolak",
    value: "ditolak",
  },
  {
    label: "Semua",
    value: "semua",
  },
];

const Transaction = [
  {
    id: "3455a010-e57c-4af8-a1cf-e33ca08aa21f",
    date: "4 Juni 2025",
    time: "12.24 PM",
    status: "selesai",
    items: ["Nasi Goreng", "Ayam Penyet", "Es Teh Manis"],
    totalPrice: 45000,
    type: "Dine In",
  },
  {
    id: "1234b010-e57c-4af8-a1cf-e33ca08aa21f",
    date: "5 Juni 2025",
    time: "1.30 PM",
    status: "validasi",
    items: ["Mie Goreng", "Sate Ayam"],
    totalPrice: 30000,
    type: "Take Away",
  },
  {
    id: "5678c010-e57c-4af8-a1cf-e33ca08aa21f",
    date: "6 Juni 2025",
    time: "3.15 PM",
    status: "ditolak",
    items: ["Nasi Campur", "Teh Botol"],
    totalPrice: 25000,
    type: "Dine In",
  },
  {
    id: "9101d010-e57c-4af8-a1cf-e33ca08aa21f",
    date: "7 Juni 2025",
    time: "2.00 PM",
    status: "selesai",
    items: ["Bakso", "Es Jeruk"],
    totalPrice: 40000,
    type: "Dine In",
  },
  {
    id: "1121e010-e57c-4af8-a1cf-e33ca08aa21f",
    date: "8 Juni 2025",
    time: "11.45 AM",
    status: "validasi",
    items: ["Soto Ayam", "Kerupuk"],
    totalPrice: 35000,
    type: "Take Away",
  },
];
