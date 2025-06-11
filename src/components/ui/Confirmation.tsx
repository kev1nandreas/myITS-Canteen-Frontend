"use client";

import { CiWarning } from "react-icons/ci";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

interface ConfirmationProps {
  onCancel: () => void;
  onConfirm: () => void;
  object?: string;
  type: "delete" | "logout" | "accept";
}

export default function Confirmation({
  onCancel,
  onConfirm,
  object,
  type,
}: ConfirmationProps) {
  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 transition-all duration-300 ease-in-out"
      data-aos="fade-in"
    >
      <div className="w-[30rem] h-fit flex flex-col m-2 gap-y-6 bg-white p-8 rounded-2xl text-center">
        <div className="flex justify-center">
          <CiWarning className="text-red-700 text-[7rem]" />
        </div>
        <h1 className="text-3xl font-semibold">Apakah kamu yakin?</h1>
        <p className="opacity-70 break-words max-w-full px-4 whitespace-normal">
          {type === "delete" &&
            `Kamu benar-benar yakin ingin menghapus ${object}? Perubahan akan dilakukan secara permanen`}
          {type === "accept" &&
            `Kamu benar-benar yakin ingin melakukan perubahan? Perubahan akan dilakukan secara permanen`}
          {type === "logout" &&
            `Kamu benar-benar yakin ingin keluar dari halaman admin?`}
        </p>
        <div className="flex justify-center gap-x-3 text-white">
          <button
            onClick={onCancel}
            className="w-[8rem] bg-gray-400 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer duration-300 transition-all ease-in-out"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className={`w-[8rem] p-2 px-4 rounded-md cursor-pointer duration-300 transition-all ease-in-out ${
              type === "delete" && "bg-red-700 hover:bg-red-800"
            } ${type === "accept" && "bg-green-600 hover:bg-green-700"} ${
              type === "logout" && "bg-red-main hover:bg-red-700"
            }`}
          >
            {type === "delete" && "Hapus"}
            {type === "accept" && "Lanjutkan"}
            {type === "logout" && "Keluar"}
          </button>
        </div>
      </div>
    </div>
  );
}
