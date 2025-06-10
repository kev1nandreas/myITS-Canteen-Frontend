"use client";

import HistoryCard from "@/components/HistoryCard";
import Tabs from "@/components/ui/Tabs";
import { withAuth } from "@/lib/hoc/withAuth";
import { useFetchTransaction } from "@/services/api/hook/useTransaction";
import { PATH } from "@/shared/path";
import { typecastTransactionHistoryResponse } from "@/types/response";
import { useState } from "react";

function History() {
  const [activeTab, setActiveTab] = useState("validasi");
  const { data: transactionRaw } = useFetchTransaction();
  const transactions = typecastTransactionHistoryResponse(
    transactionRaw?.data || []
  );

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
        {transactions &&
          transactions
            .filter((transaction) => {
              if (activeTab === "Menunggu Validasi")
                return transaction.t_status === "Menunggu Validasi";
              if (activeTab === "selesai")
                return transaction.t_status === "selesai";
              if (activeTab === "ditolak")
                return transaction.t_status === "ditolak";
              return true;
            })
            .map((transaction) => (
              <HistoryCard key={transaction.t_id} transaction={transaction} />
            ))}
      </div>
      {transactions && transactions.length === 0 && (
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
