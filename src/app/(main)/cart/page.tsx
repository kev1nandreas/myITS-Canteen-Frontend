/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CartMenu from "@/components/CartMenu";
import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/Checkbox";
import Loading from "@/components/ui/LoadingUI";
import RadioButton from "@/components/ui/Radio-Button";
import SelectDropdown from "@/components/ui/Select";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDineIn, setIsDineIn] = useState(false);

  const methods = useForm({
    mode: "all",
    reValidateMode: "onSubmit",
  });

  useEffect(() => {
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
        const total = parsedCart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        setTotalPrice(total);
      }
    }
    setIsLoading(false);
  }, []);

  const handleTransactionTypeChange = (value: string) => {
    setIsDineIn(value === "dine_in");
  };

  const calculateTotalPrice = () => {
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      if (Array.isArray(parsedCart)) {
        const total = parsedCart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        setTotalPrice(total);
      }
    } else {
      setTotalPrice(0);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmitForm = (data: any) => {
    const formData = {
      ...data,
      totalPrice: totalPrice,
      cartItems: cart,
    };
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="md:w-[80%] flex flex-col h-[calc(100vh-4rem)] p-[2rem] overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Pesanan Anda</h1>
      {cart.length === 0 ? (
        <div className="flex items-center justify-center w-full">
          <p className="text-lg">Anda belum memilih menu</p>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            className="flex justify-between my-4 gap-[2rem] flex-wrap"
            onSubmit={methods.handleSubmit(handleSubmitForm)}
          >
            <div className="flex flex-col md:flex-1/3 w-[calc(100vw-4rem)] gap-4">
              <h1 className="font-semibold text-xl">Rincian Pesanan</h1>
              <div className="flex flex-col bg-white p-4 border border-gray-200 rounded-lg">
                {cart.map((item, index) => (
                  <CartMenu
                    key={item.id}
                    index={index}
                    total={cart.length}
                    id={item.id.toString()}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    image={item.image}
                    calculateTotalPrice={calculateTotalPrice}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-4 mt-6">
                {/* Payment */}
                <h1 className="text-xl font-semibold">Rincian Pembayaran</h1>
                <div className="flex gap-4 p-4 border rounded-lg justify-between items-center bg-white border-gray-200">
                  <p>Total Harga</p>
                  <p className="text-lg font-semibold">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
                <div className="flex flex-col gap-4 p-4 border rounded-lg justify-between bg-white border-gray-200">
                  <p>Pilih Metode Pembayaran</p>
                  <SelectDropdown
                    name={"jenis-pembayaran"}
                    placeholder={"Jenis pembayaran"}
                    datas={transMethods}
                    control={methods.control}
                    required={true}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-1/3 gap-4 w-[calc(100vw-4rem)]">
              <h1 className="text-xl font-semibold">Rincian Reservasi</h1>
              <div className="flex flex-col gap-8 p-4 border rounded-lg justify-between bg-white border-gray-200">
                <div className="flex flex-col gap-4">
                  <p>Pilih Jenis Transaksi</p>
                  <RadioButton
                    name="transactionType"
                    data={[
                      { label: "Dine In", value: "dine_in" },
                      { label: "Take Away", value: "take_away" },
                    ]}
                    control={methods.control}
                    onSelect={handleTransactionTypeChange}
                    required={true}
                  />
                </div>
                {isDineIn && (
                  <>
                    <div className="flex gap-4 w-full">
                      <div className="flex flex-col flex-1/2 gap-4">
                        <p>Pilih Jam Datang</p>
                        <SelectDropdown
                          name={"jam-datang"}
                          placeholder={"Jam Datang"}
                          datas={[
                            { label: "12:00", value: "12:00" },
                            { label: "13:00", value: "13:00" },
                            { label: "14:00", value: "14:00" },
                            { label: "15:00", value: "15:00" },
                          ]}
                          control={methods.control}
                          required={true}
                        />
                      </div>
                      <div className="flex flex-col flex-1/2 gap-4">
                        <p>Pilih Jam Pergi</p>
                        <SelectDropdown
                          name={"jam-pergi"}
                          placeholder={"Jam Pergi"}
                          datas={[
                            { label: "12:00", value: "12:00" },
                            { label: "13:00", value: "13:00" },
                            { label: "14:00", value: "14:00" },
                            { label: "15:00", value: "15:00" },
                          ]}
                          control={methods.control}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <p>Pilih Kursi</p>
                      <CheckBox
                        name="kursi"
                        control={methods.control}
                        options={chair}
                        defaultValue={[]}
                        required={true}
                      />
                    </div>
                  </>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-full py-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Konfirmasi Pesanan
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

const transMethods = [
  { label: "Cash", value: "cash" },
  { label: "Credit Card", value: "credit_card" },
  { label: "Debit Card", value: "debit_card" },
  { label: "E-Wallet", value: "e_wallet" },
];

const chair = [
  { label: "A1", value: "A1" },
  { label: "A2", value: "A2" },
  { label: "A3", value: "A3" },
  { label: "B1", value: "B1" },
  { label: "B2", value: "B2" },
  { label: "B3", value: "B3" },
  { label: "C1", value: "C1" },
  { label: "C2", value: "C2" },
  { label: "C3", value: "C3" },
  { label: "D1", value: "D1" },
  { label: "D2", value: "D2" },
  { label: "D3", value: "D3" },
];
