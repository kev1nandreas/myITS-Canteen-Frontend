"use client";

import MonthlyReport from "@/components/MonthlyReport";
import SelectDropdown from "@/components/ui/Select";
import WeeklyReport from "@/components/WeeklyReport";
import { useFetchVendorReports } from "@/services/api/hook/useVendor";
import { typecastMonthlyWeeklyReportResponse } from "@/types/response";
import { useState } from "react";

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("weekly");
  const { data: rawData, isLoading } = useFetchVendorReports(selectedPeriod);
  const revenues = typecastMonthlyWeeklyReportResponse(rawData?.data);

  const handlePeriodValueChange = (value: string) => {
    setSelectedPeriod(value);
  };

  return (
    <div className="md:w-[80%] flex flex-col h-[calc(100vh-4rem)] p-[2rem] overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Laporan Penjualan</h1>
      {/* Filter */}
      <div className="flex flex-col gap-1">
        <p>Periode Laporan</p>
        <SelectDropdown
          name="kedai"
          placeholder="Pilih periode"
          datas={opsiPeriode}
          onSelect={handlePeriodValueChange}
          defaultValue={selectedPeriod}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">Memuat laporan...</p>
        </div>
      )}

      {/* Data */}
      {!isLoading && selectedPeriod === "monthly" && (
        <MonthlyReport revenues={revenues} />
      )}
      {!isLoading && selectedPeriod === "weekly" && (
        <WeeklyReport revenues={revenues} />
      )}
    </div>
  );
}

const opsiPeriode = [
  { label: "Setiap Minggu", value: "weekly" },
  { label: "Setiap Bulan", value: "monthly" },
];
