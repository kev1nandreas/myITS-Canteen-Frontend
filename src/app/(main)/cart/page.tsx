/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CartMenu from "@/components/CartMenu";
import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/Checkbox";
import Input from "@/components/ui/Input";
import Loading from "@/components/ui/LoadingUI";
import RadioButton from "@/components/ui/Radio-Button";
import SelectDropdown from "@/components/ui/Select";
import Switch from "@/components/ui/Switch";
import { withAuth } from "@/lib/hoc/withAuth";
import { formatPrice } from "@/lib/utils";
import { useFetchChairbyCanteen } from "@/services/api/hook/useCanteen";
import { useCheckout } from "@/services/api/hook/useCheckout";
import { PATH } from "@/shared/path";
import { typecastChairResponse, UserResponse } from "@/types/response";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ProfileProps {
  user: UserResponse;
}

function Cart({ user }: ProfileProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDineIn, setIsDineIn] = useState(false);
  const [redeem, setRedeem] = useState(false);
  const [point] = useState(user.point || 0);
  const [chair, setChair] = useState<{ label: string; value: string }[]>([]);
  const [canteenId, setCanteenId] = useState<string>();
  const router = useRouter();

  const methods = useForm({
    mode: "all",
    reValidateMode: "onSubmit",
  });

  const timeIn = methods.watch("time_in");
  const timeOut = methods.watch("time_out");
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const canteen = JSON.parse(window.localStorage.getItem("canteen") || "{}");
    if (canteen && canteen.id) {
      setCanteenId(canteen.id);
    } else {
      setCanteenId("1");
    }
  }, []);

  const {
    data: chairData,
    isLoading: isChairLoading,
    refetch: refetchChair,
  } = useFetchChairbyCanteen(canteenId ?? "1", {
    time_in: `${today} ${timeIn || "08:00"}:00`,
    time_out: `${today} ${timeOut || "16:00"}:00`,
  });

  useEffect(() => {
    if (!timeIn || !timeOut) return;
    setTimeout(() => {
      refetchChair();
      if (chairData) {
        const chairs =
          typecastChairResponse(chairData.data)?.map((chair) => ({
            label: chair.chair_name,
            value: chair.ch_id,
          })) || [];
        setChair(chairs);
      } else {
        setChair([]);
      }
    }, 2000);
  }, [timeIn, timeOut, isDineIn, chairData, refetchChair]);

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

  const countDiscount = () => {
    if (point > totalPrice) {
      return totalPrice;
    }
    return point;
  };

  const handleTransactionTypeChange = (value: string) => {
    setIsDineIn(value === "true");
  };

  const handleReedeemChange = (value: boolean) => {
    setRedeem(value);
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

  const mutation = useCheckout({
    onSuccess: () => {
      toast.success("Pesanan berhasil dibuat!");
      localStorage.removeItem("cart");
      router.push("/");
    },
    onError: (error) => {
      console.error("Transaction failed:", error);
      toast.error(`Error: ${error.message || "Something went wrong"}`);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmitForm = async (data: any) => {
    const formData = {
      ...data,
      is_dine: data.is_dine === "true",
      time_in: `${today} ${timeIn || "08:00"}:00`,
      time_out: `${today} ${timeOut || "16:00"}:00`,
      total_price: totalPrice,
      discount: redeem ? countDiscount() : 0,
      k_id: canteenId,
      cartItems: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };
    await mutation.mutateAsync(formData);
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
                <div className="flex flex-col gap-1 p-4 border rounded-lg bg-white border-gray-200">
                  <Switch
                    id="discount"
                    label={`Gunakan ${formatPrice(countDiscount())} Poin`}
                    name="discount"
                    control={methods.control}
                    valueChange={handleReedeemChange}
                  />
                  <div className="flex justify-between items-center mt-4 opacity-60">
                    <p>Total Belanja</p>
                    <p>{formatPrice(totalPrice)}</p>
                  </div>
                  <div className="flex justify-between items-center opacity-60">
                    <p>Diskon</p>
                    <p>
                      {redeem ? formatPrice(countDiscount()) : formatPrice(0)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Total Pembayaran</p>
                    <p className="text-lg font-semibold">
                      {redeem
                        ? formatPrice(totalPrice - countDiscount())
                        : formatPrice(totalPrice)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 p-4 border rounded-lg justify-between bg-white border-gray-200">
                  <p>Pilih Metode Pembayaran</p>
                  <SelectDropdown
                    name={"payment"}
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
                    name="is_dine"
                    data={[
                      { label: "Dine In", value: "true" },
                      { label: "Take Away", value: "false" },
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
                        <Input
                          type="time"
                          id={"time_in"}
                          label={"Pilih Jam Datang"}
                          min="08:00"
                          max="16:00"
                          className="gap-4"
                          validation={
                            timeIn && timeOut
                              ? {
                                  validate: (value: string) => {
                                    const [hours, minutes] = value
                                      .split(":")
                                      .map(Number);
                                    const [outHours, outMinutes] = timeOut
                                      .split(":")
                                      .map(Number);
                                    if (
                                      hours > outHours ||
                                      (hours === outHours &&
                                        minutes >= outMinutes)
                                    ) {
                                      return "Jam datang harus sebelum jam pergi";
                                    }
                                    return true;
                                  },
                                }
                              : undefined
                          }
                        />
                      </div>
                      <div className="flex flex-col flex-1/2 gap-4">
                        <Input
                          type="time"
                          id={"time_out"}
                          label={"Pilih Jam Pergi"}
                          min="08:00"
                          max="16:00"
                          className="gap-4"
                          validation={
                            timeIn && timeOut
                              ? {
                                  validate: (value: string) => {
                                    const [hours, minutes] = value
                                      .split(":")
                                      .map(Number);
                                    const [inHours, inMinutes] = timeIn
                                      .split(":")
                                      .map(Number);
                                    if (
                                      hours < inHours ||
                                      (hours === inHours &&
                                        minutes <= inMinutes)
                                    ) {
                                      return "Jam pergi harus setelah jam datang";
                                    }
                                    return true;
                                  },
                                }
                              : undefined
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <p>Pilih Kursi</p>
                      {isChairLoading && <p>Memeriksa ketersediaan kursi</p>}
                      {!isLoading && (
                        <CheckBox
                          name="kursi"
                          control={methods.control}
                          options={chair}
                          defaultValue={[]}
                          required={true}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
              <Button
                type="submit"
                disabled={mutation.isPending || cart.length === 0}
                className={`w-full bg-blue-500 text-white hover:bg-blue-600 rounded-full py-2 mt-4`}
              >
                {mutation.isPending ? "Memproses pesanan..." : "Buat Pesanan"}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
}

export default withAuth(Cart, {
  redirectTo: PATH.AUTH.LOGIN,
  allowedRoles: ["user", "admin"],
});

const transMethods = [
  { label: "Cash", value: "cash" },
  { label: "Card", value: "card" },
  { label: "Qris", value: "qris" },
];
