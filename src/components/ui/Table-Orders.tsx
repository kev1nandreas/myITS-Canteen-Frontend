import { formatPrice } from "@/lib/utils";
import { CgDetailsMore } from "react-icons/cg";
import { CiCircleCheck } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import Confirmation from "./Confirmation";
import { useState } from "react";
import {
  useAcceptTransaction,
  useRejectTransaction,
} from "@/services/api/hook/useTransaction";
import toast from "react-hot-toast";
import { TransactionHistoryResponse } from "@/types/response";
import TransactionDetail from "../TransactionDetail";

interface OrderTableProps {
  transactions: TransactionHistoryResponse[];
  refetch: () => void;
}

export default function OrderTable({ transactions, refetch }: OrderTableProps) {
  const [isOpenReject, setIsOpenReject] = useState<string | null>(null);
  const [isOpenAccept, setIsOpenAccept] = useState<string | null>(null);
  const [isOpenPopUp, setIsOpenPopup] = useState<string | null>(null);

  const mutationReject = useRejectTransaction({
    idTransaction: isOpenReject || "",
    onSuccess: () => {
      toast.success("Transaksi berhasil ditolak!");
      setIsOpenReject(null);
      refetch();
    },
    onError: (error) => {
      console.error("Error rejecting transaction:", error);
      toast.error("Gagal menolak transaksi. Silakan coba lagi.");
    },
  });

  const mutationAccept = useAcceptTransaction({
    idTransaction: isOpenAccept || "",
    onSuccess: () => {
      toast.success("Transaksi berhasil diterima!");
      setIsOpenAccept(null);
      refetch();
    },
    onError: (error) => {
      console.error("Error accepting transaction:", error);
      toast.error("Gagal menerima transaksi. Silakan coba lagi.");
    },
  });

  const handleCancel = () => {
    setIsOpenReject(null);
  };

  const handleReject = async () => {
    await mutationReject.mutateAsync();
    setIsOpenReject(null);
  };

  const handleCancelAccept = () => {
    setIsOpenAccept(null);
  };

  const handleAccept = async () => {
    await mutationAccept.mutateAsync();
    setIsOpenAccept(null);
  };

  return (
    <div className="shadow-md rounded-lg overflow-auto">
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
          {transactions.map((transaction) => (
            <tr key={transaction.t_id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.c_name || "-"}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {transaction.t_time}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {formatPrice(transaction.t_total)}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {transaction.t_status === "Selesai" ? (
                  <span className="text-green-600">Selesai</span>
                ) : transaction.t_status === "Menunggu Konfirmasi" ? (
                  <span className="text-yellow-500">Menunggu Konfirmasi</span>
                ) : (
                  <span className="text-red-500">Ditolak</span>
                )}
              </td>
              <td className="flex gap-2 px-6 py-4 text-center whitespace-nowrap items-center justify-center">
                {transaction.t_status === "Menunggu Konfirmasi" && (
                  <>
                    <button
                      onClick={() => {
                        setIsOpenAccept(transaction.t_id);
                      }}
                      className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                    >
                      <CiCircleCheck className="text-green-600" />
                    </button>
                    <button
                      onClick={() => {
                        setIsOpenReject(transaction.t_id);
                      }}
                      className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                    >
                      <RxCrossCircled className="text-red-500" />
                    </button>
                  </>
                )}
                <button
                  onClick={() => {
                    setIsOpenPopup(transaction.t_id);
                  }}
                  className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                >
                  <CgDetailsMore />
                </button>

                {/* Confirmation */}
                {isOpenReject === transaction.t_id && (
                  <Confirmation
                    onCancel={handleCancel}
                    onConfirm={() => handleReject()}
                    object={"pesanan ini"}
                    type={"delete"}
                  />
                )}

                {isOpenAccept === transaction.t_id && (
                  <Confirmation
                    onCancel={handleCancelAccept}
                    onConfirm={() => handleAccept()}
                    object={transaction.c_name || "-"}
                    type={"accept"}
                  />
                )}

                {/* Pop Up Detail */}
                {isOpenPopUp === transaction.t_id && (
                  <TransactionDetail
                    handleClose={() => setIsOpenPopup(null)}
                    transaction={transaction}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
