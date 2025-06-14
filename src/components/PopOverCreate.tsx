"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MenuResponse } from "@/types/response";
import Input from "./ui/Input";
import SelectDropdown from "./ui/Select";
import Button from "./ui/Button";
import { useCreateMenu } from "@/services/api/hook/useMenu";
import toast from "react-hot-toast";
import { parseFormData } from "@/lib/utils";

interface PopOverCreateMenuProps {
  handleClose: () => void;
  refetch: () => void;
}

export default function PopOverCreateMenu({
  handleClose,
  refetch,
}: PopOverCreateMenuProps) {
  const methods = useForm<MenuResponse>();

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  const mutation = useCreateMenu({
    onSuccess: () => {
      toast.success("Menu berhasil ditambahkan!");
      refetch();
      handleClose();
    },
    onError: (error) => {
      console.error("Error creating menu:", error);
      toast.error("Gagal menambahkan menu. Silakan coba lagi.");
    },
  });

  const onSubmit: SubmitHandler<MenuResponse> = async (data) => {
    data.m_image =
      data.m_image && data.m_image[0] ? data.m_image[0] : undefined;
    const formData = parseFormData(data);
    if (formData.get("m_image") === undefined) {
      formData.delete("m_image");
    }
    await mutation.mutateAsync(formData);
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 transition-all duration-300 ease-in-out"
      data-aos="fade-in"
    >
      <div className="w-[30rem] h-fit flex m-2 flex-col gap-y-6 bg-white p-8 rounded-2xl">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Tambahkan Menu
        </h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              id={"m_name"}
              label={"Nama Menu"}
              validation={{
                required: "Nama menu harus diisi",
              }}
            />
            <div className="flex gap-3">
              <Input
                id={"m_price"}
                label={"Harga"}
                validation={{
                  required: "Harga harus diisi",
                }}
              />
              <Input
                id={"m_stock"}
                label={"Stok Tersedia"}
                type="number"
                validation={{
                  required: "Stok harus diisi",
                  min: {
                    value: 0,
                    message: "Stok tidak boleh kurang dari 0",
                  },
                }}
              />
            </div>
            <Input
              id={"m_image"}
              label={"Gambar Menu"}
              type="file"
              validation={{
                required: "Gambar harus diunggah",
              }}
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="m_category">Kategori</label>
              <SelectDropdown
                name={"m_category"}
                placeholder={"Pilih Kategori"}
                datas={categories}
                control={methods.control}
              />
            </div>

            <div className="flex w-full gap-3 mt-4">
              <Button
                onClick={handleClose}
                className="rounded-full w-full bg-slate-400 hover:bg-slate-500"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={mutation.isPending}
                className={`rounded-full w-full ${
                  mutation.isPending
                    ? "bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {mutation.isPending ? "Menambahkan..." : "Tambah Menu"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

const categories = [
  {
    label: "Makanan",
    value: "Makanan",
  },
  {
    label: "Minuman",
    value: "Minuman",
  },
  {
    label: "Snack",
    value: "Snack",
  },
];
