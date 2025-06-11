"use client";

import CardDashboard from "@/components/CardDashboard";
import BarChart from "@/components/ui/Bar-Chart";
import DoughnutChart from "@/components/ui/Doughnut-Chart";
import { withAuth } from "@/lib/hoc/withAuth";
import { formatPrice, formatTopMenu, formatWeeklyEarnings } from "@/lib/utils";
import {
  useFetchVendorDailies,
  useFetchVendorTopMenus,
  useFetchVendorWeeklySales,
} from "@/services/api/hook/useVendor";
import { PATH } from "@/shared/path";
import {
  typecastDailyReportResponse,
  typecastTopMenuResponse,
  typecastWeeklySalesResponse,
  UserResponse,
} from "@/types/response";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineFastfood, MdOutlineSell } from "react-icons/md";

interface DashboardProps {
  user: UserResponse;
}

function Dashboard({ user }: DashboardProps) {
  const { data: dailyRaw } = useFetchVendorDailies();
  const { data: weeklySalesRaw } = useFetchVendorWeeklySales();
  const { data: topMenusRaw } = useFetchVendorTopMenus();

  // Typecasting the raw data to the expected response types
  const dailyReport = typecastDailyReportResponse(dailyRaw?.data);
  const weeklySales = typecastWeeklySalesResponse(weeklySalesRaw?.data);
  const topMenus = typecastTopMenuResponse(topMenusRaw?.data);

  const { dates, totalEarnings } = formatWeeklyEarnings(weeklySales);
  const { labels, data } = formatTopMenu(topMenus);

  return (
    <div className="flex flex-col md:w-[80%] h-[calc(100vh-4rem)] p-[2rem] overflow-y-auto w-full">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="opacity-50 text-sm mt-1">Hello, {user.name}</p>
      <div className="flex justify-between my-4 flex-wrap gap-2">
        <CardDashboard
          title={"Pesanan Hari Ini"}
          description={"pesanan"}
          Icon={MdOutlineSell}
          value={dailyReport?.transaction_count || 0}
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
        />
        <CardDashboard
          title={"Menu Terjual Hari Ini"}
          description={"porsi"}
          Icon={MdOutlineFastfood}
          value={dailyReport?.total_purchased || 0}
          className="bg-gradient-to-r from-green-600 to-green-400 text-white"
        />
        <CardDashboard
          title={"Pendapatan Hari Ini"}
          description={""}
          Icon={CiMoneyCheck1}
          value={formatPrice(dailyReport?.total_earnings || 0)}
          className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white"
        />
        <CardDashboard
          title={"Pengunjung Hari Ini"}
          description={"orang"}
          Icon={IoPersonOutline}
          value={dailyReport?.unique_customers || 0}
          className="bg-gradient-to-r from-purple-600 to-purple-400 text-white"
        />
      </div>
      <div className="flex gap-5 flex-wrap md:flex-nowrap mt-[1rem]">
        <div className="flex flex-col gap-3 flex-3/5 bg-white p-5 rounded-lg border border-gray-200">
          <h1 className="text-xl font-semibold">
            Data Penjualan Periode 1 Minggu Terakhir
          </h1>
          {dates.length === 0 ? (
            <p className="text-gray-500">
              Tidak ada data penjualan atau belum ada transaksi yang
              terselesaikan.
            </p>
          ) : (
            <BarChart
              labels={dates}
              labels_title="Pendapatan Harian"
              data={totalEarnings}
              classname="w-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-3 flex-2/5 bg-white p-5 rounded-lg border border-gray-200">
          <h1 className="text-xl font-semibold">
            Menu Terlaris Periode 1 Minggu Terakhir
          </h1>
          {labels.length === 0 ? (
            <p className="text-gray-500">
              Tidak ada data penjualan atau belum ada transaksi yang
              terselesaikan.
            </p>
          ) : (
            <DoughnutChart
              labels={labels}
              labels_title="Penjualan Menu"
              data={data}
              classname="w-[22rem]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard, {
  redirectTo: PATH.AUTH.LOGIN,
  allowedRoles: ["admin"],
});
