import { formatPrice } from "@/lib/utils";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

interface RowData {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

export default function MenuTable({ rows }: { rows: RowData[] }) {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nama Menu</th>
            <th className="px-6 py-3 text-center">Harga</th>
            <th className="px-6 py-3 text-center">Kategori</th>
            <th className="px-6 py-3 text-center">Stok</th>
            <th className="px-6 py-3 text-center">Gambar</th>
            <th className="px-6 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {formatPrice(row.price)}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">{row.category}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap">{row.stock}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap">{row.image}</td>
              <td className="flex gap-2 px-6 py-4 text-center whitespace-nowrap items-center justify-center">
                <button className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200">
                  <MdEdit className="text-green-600" />
                </button>
                <button className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200">
                  <FaRegTrashAlt  className="text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
