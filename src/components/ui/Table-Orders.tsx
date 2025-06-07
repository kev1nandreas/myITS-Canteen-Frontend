import { formatPrice } from "@/lib/utils";
import { CgDetailsMore } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";

interface RowData {
  id: string;
  date: string;
  time: string;
  status: string;
  name: string;
  totalPrice: number;
  type: string;
}

export default function OrderTable({ rows }: { rows: RowData[] }) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nama Pemesan</th>
            <th className="px-6 py-3 text-center">Tanggal</th>
            <th className="px-6 py-3 text-center">Jumlah</th>
            <th className="px-6 py-3 text-center">Status</th>
            <th className="px-6 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {row.date + " " + row.time}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {formatPrice(row.totalPrice)}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {row.status === "selesai" ? (
                  <span className="text-green-600">Selesai</span>
                ) : row.status === "validasi" ? (
                  <span className="text-yellow-500">Validasi</span>
                ) : (
                  <span className="text-red-500">Ditolak</span>
                )}
              </td>
              <td className="flex gap-2 px-6 py-4 text-center whitespace-nowrap items-center justify-center">
                <button className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200">
                  <CiCircleCheck className="text-green-600" />
                </button>
                <button className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200">
                  <RxCrossCircled className="text-red-500" />
                </button>
                <button className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200">
                  <CgDetailsMore />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
