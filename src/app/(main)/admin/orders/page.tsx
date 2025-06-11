"use client";

import OrderTable from "@/components/ui/Table-Orders";
import Tabs from "@/components/ui/Tabs";
import { withAuth } from "@/lib/hoc/withAuth";
import { useFetchVendorTransaction } from "@/services/api/hook/useTransaction";
import { PATH } from "@/shared/path";
import { typecastTransactionHistoryResponse } from "@/types/response";
import { useState } from "react";

function OrdersPage() {
  const [activeTab, setActiveTab] = useState("Menunggu Konfirmasi");
  const {
    data: transactionRaw,
    refetch,
    isLoading,
  } = useFetchVendorTransaction();
  const transactions = typecastTransactionHistoryResponse(
    transactionRaw?.data || []
  );

  const filteredTransactions = transactions?.filter((transaction) => {
    if (activeTab === "Menunggu Konfirmasi")
      return transaction.t_status === "Menunggu Konfirmasi";
    if (activeTab === "Selesai") return transaction.t_status === "Selesai";
    if (activeTab === "Ditolak") return transaction.t_status === "Ditolak";
    return true;
  });

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
      {isLoading && (
        <p className="text-center text-gray-500 mt-4">Memuat pesanan...</p>
      )}
      {transactions &&
        filteredTransactions &&
        !isLoading &&
        filteredTransactions.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            Tidak ada pesanan yang ditemukan.
          </p>
        )}
      {!isLoading &&
        filteredTransactions &&
        filteredTransactions.length > 0 && (
          <OrderTable
            transactions={filteredTransactions || []}
            refetch={refetch}
          />
        )}
    </div>
  );
}

export default withAuth(OrdersPage, {
  allowedRoles: ["admin"],
  redirectTo: PATH.HOME,
});

const FilterTabs = [
  {
    label: "Menunggu Konfirmasi",
    value: "Menunggu Konfirmasi",
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
