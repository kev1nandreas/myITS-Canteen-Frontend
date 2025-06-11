"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MenuResponse } from "@/types/response";
import Input from "./ui/Input";
import SelectDropdown from "./ui/Select";
import Button from "./ui/Button";
import toast from "react-hot-toast";
import { useEditMenu } from "@/services/api/hook/useMenu";

interface PopOverEditMenuProps {
  handleClose: () => void;
  refetch: () => void;
  m_id: string;
  m_name: string;
  m_price: number;
  m_category: string;
  m_image: string;
  m_stock: number;
}

export default function PopOverEditMenu({
  handleClose,
  refetch,
  m_id,
  m_name,
  m_price,
  m_category,
  m_image,
  m_stock,
}: PopOverEditMenuProps) {
  const methods = useForm<MenuResponse>({
    defaultValues: {
      m_id,
      m_name,
      m_price,
      m_category,
      m_image,
      m_stock,
    },
  });

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  const mutation = useEditMenu({
    idMenu: m_id,
    onSuccess: () => {
      toast.success("Menu berhasil diperbarui!");
      refetch();
      handleClose();
    },
    onError: (error) => {
      console.error("Error updating menu:", error);
      toast.error("Gagal memperbarui menu. Silakan coba lagi.");
    },
  });

  const onSubmit: SubmitHandler<MenuResponse> = async (data) => {
    const formData = new FormData();
    formData.append("m_name", data.m_name || "");
    formData.append("m_price", data.m_price?.toString() || "0");
    formData.append("m_category", data.m_category || "");
    formData.append("m_stock", data.m_stock?.toString() || "0");
    if (data.m_image) {
      formData.append("m_image", data.m_image);
    }
    await mutation.mutateAsync(formData);
    console.log("Form Data Submitted:", data);
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 transition-all duration-300 ease-in-out"
      data-aos="fade-in"
    >
      <div className="w-[30rem] h-fit flex m-2 flex-col gap-y-6 bg-white p-8 rounded-2xl">
        <h1 className="text-2xl font-semibold mb-4 text-center">Edit Menu</h1>
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
            <Input id={"m_image"} label={"Gambar Menu"} type="file" />
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
                type="submit"
                disabled={mutation.isPending}
                className={`rounded-full w-full ${
                  mutation.isPending
                    ? "bg-blue-400"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {mutation.isPending ? "Mengubah..." : "Ubah Menu"}
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
