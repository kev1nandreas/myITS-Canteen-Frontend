"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MenuResponse } from "@/types/response";
import Input from "./ui/Input";
import SelectDropdown from "./ui/Select";
import Button from "./ui/Button";

interface PopOverCreateMenuProps {
  handleClose: () => void;
}

export default function PopOverCreateMenu({
  handleClose,
}: PopOverCreateMenuProps) {
  const methods = useForm<MenuResponse>();

  useEffect(() => {
    AOS.init({ duration: 300 });
  }, []);

  const onSubmit: SubmitHandler<MenuResponse> = async (data) => {
    console.log("Form submitted:", data);
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
              <Button onClick={handleClose} className="rounded-full w-full bg-slate-400 hover:bg-slate-500">
                Batal
              </Button>
              <Button type="submit" className="rounded-full w-full">
                Tambahkan
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
