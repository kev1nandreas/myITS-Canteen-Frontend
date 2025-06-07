"use client";

import CardDashboard from "@/components/CardDashboard";
import BarChart from "@/components/ui/Bar-Chart";
import DoughnutChart from "@/components/ui/Doughnut-Chart";
import { withAuth } from "@/lib/hoc/withAuth";
import { formatPrice } from "@/lib/utils";
import { PATH } from "@/shared/path";
import { UserResponse } from "@/types/response";
import { CiMoneyCheck1 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineFastfood, MdOutlineSell } from "react-icons/md";

interface DashboardProps {
  user: UserResponse;
}

function Dashboard({ user }: DashboardProps) {
  return (
    <div className="flex flex-col md:w-[80%] h-[calc(100vh-4rem)] p-[2rem] overflow-y-auto w-full">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="opacity-50 text-sm mt-1">Hello, {user.name}</p>
      <div className="flex justify-between my-4 flex-wrap gap-2">
        <CardDashboard
          title={"Pesanan Hari Ini"}
          description={"pesanan"}
          Icon={MdOutlineSell}
          value={20}
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white"
        />
        <CardDashboard
          title={"Menu Terjual Hari Ini"}
          description={"porsi"}
          Icon={MdOutlineFastfood}
          value={20}
          className="bg-gradient-to-r from-green-600 to-green-400 text-white"
        />
        <CardDashboard
          title={"Pendapatan Hari Ini"}
          description={""}
          Icon={CiMoneyCheck1}
          value={formatPrice(123456)}
          className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-white"
        />
        <CardDashboard
          title={"Pengunjung Hari Ini"}
          description={"orang"}
          Icon={IoPersonOutline}
          value={20}
          className="bg-gradient-to-r from-purple-600 to-purple-400 text-white"
        />
      </div>
      <div className="flex gap-5 flex-wrap md:flex-nowrap mt-[1rem]">
        <div className="flex flex-col gap-3 flex-3/5 bg-white p-5 rounded-lg border border-gray-200">
          <h1 className="text-xl font-semibold">
            Data Penjualan Periode 1 - 31 Juli 2025
          </h1>
          <BarChart
            labels={["January", "February", "March", "April", "May"]}
            labels_title="Monthly Sales"
            data={[12, 19, 3, 5, 2]}
            classname="w-full"
          />
        </div>
        <div className="flex flex-col gap-3 flex-2/5 bg-white p-5 rounded-lg border border-gray-200">
          <h1 className="text-xl font-semibold">
            Menu Terlaris Periode 1 - 31 Juli 2025
          </h1>
          <DoughnutChart
            labels={["January", "February", "March", "April", "May"]}
            labels_title="Monthly Sales"
            data={[12, 19, 3, 5, 2]}
            classname="w-[22rem]"
          />
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dashboard, {
  redirectTo: PATH.AUTH.LOGIN,
  allowedRoles: ["admin"],
});
