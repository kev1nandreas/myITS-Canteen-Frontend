"use client";

import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Confirmation from "./Confirmation";
import Image from "next/image";
import PopOverEditMenu from "../PopOverEdit";

interface MenuResponse {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  last_modified: string;
}

export default function MenuTable({ rows }: { rows: MenuResponse[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleCancel = () => {
    setSelectedId(null);
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting menu with id: ${id}`);
    setSelectedId(null);
  };

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
            <th className="px-6 py-3 text-center">Terakhir diubah</th>
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
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {row.category}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                {row.stock}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center w-[4rem] h-[4rem] rounded-xl bg-gray-100 overflow-hidden">
                    <Image
                      src={row.image || "/Menu/blank-bg.png"}
                      alt={"Image of " + row.name}
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
                      setSelectedId(row.id);
                      setIsEditOpen(true);
                    }}
                    className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                  >
                    <MdEdit className="text-green-600" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(row.id);
                    }}
                    className="flex items-center justify-center p-1 px-2 rounded-lg cursor-pointer gap-2 border border-gray-200 hover:bg-gray-100 transition-colors ease-in-out duration-200"
                  >
                    <FaRegTrashAlt className="text-red-500" />
                  </button>
                </div>

                {/* Confirmation */}
                {selectedId == row.id && (
                  <Confirmation
                    onCancel={handleCancel}
                    onConfirm={() => handleDelete(row.id)}
                    object={row.name}
                    type={"delete"}
                  />
                )}

                {/* Edit Pop Up */}
                {selectedId == row.id && isEditOpen && (
                  <PopOverEditMenu
                    handleClose={() => {
                      setIsEditOpen(false);
                      setSelectedId(null);
                    }}
                    m_id={row.id}
                    m_name={row.name}
                    m_price={row.price}
                    m_category={row.category}
                    m_image={row.image}
                    m_stock={row.stock}
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
