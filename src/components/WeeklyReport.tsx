import { formatPrice, formatReportData } from "@/lib/utils";
import LineChart from "./ui/Line-Chart";
import SelectDropdown from "./ui/Select";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { MonthlyWeeklyReportResponse } from "@/types/response";

interface WeeklyReportProps {
  revenues?: MonthlyWeeklyReportResponse;
}

export default function WeeklyReport({ revenues }: WeeklyReportProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [showData, setShowData] = useState(5);
  const { labels, dataValues } = formatReportData(revenues);

  return (
    <div className="flex gap-3 w-full mt-4">
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md flex-2/3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">
            Tren Penjualan Setiap Minggu
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Jumlah Minggu</p>
            <SelectDropdown
              name="minggu"
              placeholder="Jumlah Minggu"
              datas={[
                { label: "5", value: "5" },
                { label: "15", value: "15" },
                { label: "30", value: "30" },
                { label: "50", value: "50" },
              ]}
              onSelect={(value) => {
                setShowData(Number(value));
              }}
              defaultValue="5"
              classname="w-[8rem]"
            />
          </div>
        </div>
        <LineChart
          labels={labels.slice(0, showData)}
          labels_title={"Penjualan Mingguan"}
          data={dataValues.slice(0, showData)}
          className="w-full"
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md flex-1/3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Data Penjualan Mingguan</h1>
          <div className="flex flex-col gap-1">
            <p className="text-sm">Baris Per Halaman</p>
            <SelectDropdown
              name="minggu"
              placeholder="Pilih minggu"
              datas={[
                { label: "5", value: "5" },
                { label: "15", value: "15" },
                { label: "30", value: "30" },
                { label: "50", value: "50" },
              ]}
              onSelect={(value) => setItemPerPage(Number(value))}
              defaultValue="5"
              classname="w-[8rem]"
            />
          </div>
        </div>
        <div className="rounded-lg overflow-auto max-h-[26rem]">
          <table className="w-full text-left">
            <thead className="bg-blue-400 text-white">
              <tr>
                <th className="px-4 py-2">Minggu Awal</th>
                <th className="px-4 py-2">Minggu Akhir</th>
                <th className="px-4 py-2">Jumlah Penjualan</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {revenues && revenues.records
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr key={index} className="">
                    <td className="px-4 py-2">{item.week_start}</td>
                    <td className="px-4 py-2">{item.week_end}</td>
                    <td className="px-4 py-2">{formatPrice(item.total_revenue)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            count={Math.ceil(dataValues.length / itemsPerPage)}
            onChange={(event, value) => setCurrentPage(value)}
          />
        </div>
      </div>
    </div>
  );
}

