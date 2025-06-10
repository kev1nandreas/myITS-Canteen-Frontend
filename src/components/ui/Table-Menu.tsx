"use client";

import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Confirmation from "./Confirmation";
import Image from "next/image";
import PopOverEditMenu from "../PopOverEdit";
import { MenuResponse } from "@/types/response";
import { useDeleteMenu } from "@/services/api/hook/useMenu";
import toast from "react-hot-toast";

interface MenuTableProps {
  rows: MenuResponse[];
  refetch: () => void;
}

export default function MenuTable({ rows, refetch }: MenuTableProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleCancel = () => {
    setSelectedId(null);
  };

  const mutation = useDeleteMenu({
    idMenu: selectedId || "",
    onSuccess: () => {
      toast.success("Menu berhasil dihapus!");
      refetch();
      setSelectedId(null);
    },
    onError: (error) => {
      toast.error("Gagal menghapus menu. Silakan coba lagi.");
      console.error("Error deleting menu:", error);
      setSelectedId(null);
    },
  });

  const handleDelete = async () => {
    await mutation.mutateAsync();
  };

  return (
    <div className="shadow-md rounded-lg overflow-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-blue-400 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Nama Menu</th>
            <th className="px-6 py-3 text-center">Harga</th>
            <th className="px-6 py-3 text-center">Kategori</th>
            <th className="px-6 py-3 text-center">Stok</th>
            <th className="px-6 py-3 text-center">Gambar</th>
            <th className="px-6 py-3 text-center">Terakhir diubah</th>
            <th className="px-6 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.m_id} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap">{row.m_name}</td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {formatPrice(row.m_price)}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {row.m_category}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {row.m_stock}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-[4rem] h-[4rem] rounded-xl bg-gray-100 overflow-hidden">
                    <Image
                      src={row.m_image || "/Menu/blank-bg.png"}
                      alt={"Image of " + row.m_name}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {row.last_modified || "-"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedId(row.m_id || "");
                      setIsEditOpen(true);
                    }}
                    className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                  >
                    <MdEdit className="text-green-600" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(row.m_id || "");
                    }}
                    className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                  >
                    <FaRegTrashAlt className="text-red-500" />
                  </button>
                </div>

                {/* Confirmation */}
                {selectedId == row.m_id && (
                  <Confirmation
                    onCancel={handleCancel}
                    onConfirm={() => handleDelete()}
                    object={row.m_name}
                    type={"delete"}
                  />
                )}

                {/* Edit Pop Up */}
                {selectedId == row.m_id && isEditOpen && (
                  <PopOverEditMenu
                    handleClose={() => {
                      setIsEditOpen(false);
                      setSelectedId(null);
                    }}
                    refetch={refetch}
                    m_id={row.m_id}
                    m_name={row.m_name}
                    m_price={row.m_price}
                    m_category={row.m_category}
                    m_image={row.m_image || ""}
                    m_stock={row.m_stock}
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
