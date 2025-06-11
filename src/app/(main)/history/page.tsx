"use client";

import HistoryCard from "@/components/HistoryCard";
import Tabs from "@/components/ui/Tabs";
import { withAuth } from "@/lib/hoc/withAuth";
import { useFetchTransaction } from "@/services/api/hook/useTransaction";
import { PATH } from "@/shared/path";
import { typecastTransactionHistoryResponse } from "@/types/response";
import { useState } from "react";

function History() {
  const [activeTab, setActiveTab] = useState("Menunggu Konfirmasi");
  const { data: transactionRaw, isLoading } = useFetchTransaction();
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
        {filteredTransactions &&
          filteredTransactions.map((transaction) => (
            <HistoryCard key={transaction.t_id} transaction={transaction} />
          ))}
      </div>
      {isLoading && (
        <p className="text-center text-gray-500 mt-4">Memuat transaksi...</p>
      )}
      {transactions && filteredTransactions && !isLoading && filteredTransactions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          Tidak ada transaksi yang ditemukan.
        </p>
      )}
    </div>
  );
}

export default withAuth(History, {
  redirectTo: PATH.AUTH.LOGIN,
  allowedRoles: ["user", "admin"],
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
