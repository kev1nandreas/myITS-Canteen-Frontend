import { formatPrice } from "@/lib/utils";
import { CgDetailsMore } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import Confirmation from "./Confirmation";
import { useState } from "react";

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
  const [isOpenDelete, setIsOpenDelete] = useState<string | null>(null);
  const [isOpenAccept, setIsOpenAccept] = useState<string | null>(null);
  const [, setIsOpenPopup] = useState(false);

  const handleCancel = () => {
    setIsOpenDelete(null);
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting menu with id: ${id}`);
    setIsOpenDelete(null);
  };

  const handleCancelAccept = () => {
    setIsOpenAccept(null);
  };

  const handleAccept = (id: string) => {
    console.log(`Accepting order with id: ${id}`);
    setIsOpenAccept(null);
  };

  return (
    <div className="shadow-md rounded-lg">
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
                {row.status === "Selesai" ? (
                  <span className="text-green-600">Selesai</span>
                ) : row.status === "validasi" ? (
                  <span className="text-yellow-500">Validasi</span>
                ) : (
                  <span className="text-red-500">Ditolak</span>
                )}
              </td>
              <td className="flex gap-2 px-6 py-4 text-center whitespace-nowrap items-center justify-center">
                {row.status === "validasi" && (
                  <>
                    <button
                      onClick={() => {
                        setIsOpenAccept(row.id);
                      }}
                      className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                    >
                      <CiCircleCheck className="text-green-600" />
                    </button>
                    <button
                      onClick={() => {
                        setIsOpenDelete(row.id);
                      }}
                      className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                    >
                      <RxCrossCircled className="text-red-500" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setIsOpenPopup(true);
                  }}
                  className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                >
                  <CgDetailsMore />
                </button>

                {/* Confirmation */}
                {isOpenDelete === row.id && (
                  <Confirmation
                    onCancel={handleCancel}
                    onConfirm={() => handleDelete(row.id)}
                    object={"pesanan ini"}
                    type={"delete"}
                  />
                )}

                {isOpenAccept === row.id && (
                  <Confirmation
                    onCancel={handleCancelAccept}
                    onConfirm={() => handleAccept(row.id)}
                    object={row.name}
                    type={"accept"}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pop Up Detail */}
      {/* {isOpenPopUp && (
        <TransactionDetail handleClose={() => setIsOpenPopup(false)} transaction={undefined} />
      )} */}
    </div>
  );
}
