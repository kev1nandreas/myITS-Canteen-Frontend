"use client";

import OrderTable from "@/components/ui/Table-Orders";
import Tabs from "@/components/ui/Tabs";
import { withAuth } from "@/lib/hoc/withAuth";
import { PATH } from "@/shared/path";
import { useState } from "react";

function OrdersPage() {
  const [activeTab, setActiveTab] = useState("validasi");

  return (
    <div className="md:w-[80%] flex flex-col h-[calc(100vh-4rem)] p-[2rem] overflow-auto">
      <h1 className="text-3xl font-bold">Pesanan</h1>
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
      <OrderTable rows={Transaction} />
    </div>
  );
}

export default withAuth(OrdersPage, {
  allowedRoles: ["admin"],
  redirectTo: PATH.HOME,
});

const FilterTabs = [
  {
    label: "Validasi",
    value: "validasi",
  },
  {
    label: "Selesai",
    value: "Selesai",
  },
  {
    label: "Ditolak",
    value: "Ditolak",
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
    status: "Selesai",
    name: "Yudi Suristro",
    totalPrice: 45000,
    type: "Dine In",
  },
  {
    id: "1234b010-e57c-4af8-a1cf-e33ca08aa21f",
    date: "5 Juni 2025",
    time: "1.30 PM",
    status: "validasi",
    name: "Siti Aminah",
    totalPrice: 30000,
    type: "Take Away",
  },
  {
    id: "5678c010-e57c-4af8-a1cf-e33ca08aa21f",
    date: "6 Juni 2025",
    time: "3.15 PM",
    status: "Ditolak",
    name: "Budi Santoso",
    totalPrice: 25000,
    type: "Dine In",
  },
  {
    id: "9101d010-e57c-4af8-a1cf-e33ca08aa21f",
    date: "7 Juni 2025",
    time: "2.00 PM",
    status: "Selesai",
    name: "Ani Pratiwi",
    totalPrice: 40000,
    type: "Dine In",
  },
  {
    id: "1121e010-e57c-4af8-a1cf-e33ca08aa21f",
    date: "8 Juni 2025",
    time: "11.45 AM",
    status: "validasi",
    name: "Rudi Hartono",
    totalPrice: 35000,
    type: "Take Away",
  },
];