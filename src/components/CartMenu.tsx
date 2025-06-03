/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Counter from "./ui/Counter";
import { useState } from "react";

interface CartMenuProps {
  id: string;
  index: number;
  total: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  calculateTotalPrice: () => void;
}

export default function CartMenu({
  id,
  index,
  total,
  name,
  price,
  quantity,
  image,
  calculateTotalPrice,
}: CartMenuProps) {
  const [count, setCount] = useState(quantity);

  const handleDecrement = () => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === id);

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      window.localStorage.setItem("cart", JSON.stringify(cart));
    } else if (existingItem && existingItem.quantity === 1) {
      const updatedCart = cart.filter((item: any) => item.id !== id);
      window.localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.location.reload();
    }
    setCount(existingItem ? existingItem.quantity : 0);
    calculateTotalPrice();
  };

  const handleIncrement = () => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === id);
    existingItem.quantity += 1;
    setCount(existingItem.quantity);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotalPrice();
  };

  return (
    <div
      className={`flex items-center gap-5 md:gap-10 p-4 border-gray-200 ${
        index === total - 1 ? "" : "border-b"
      }`}
    >
      <div className="flex items-center justify-center w-[5rem] h-[5rem] rounded-lg bg-gray-100 overflow-hidden">
        <Image
          src={image || "/Menu/blank-bg.png"}
          alt={"Image of " + name}
          width={200}
          height={200}
        />
      </div>
      <div className="flex flex-col items-start gap-3">
        <p className="w-[10rem] font-semibold md:text-lg">
          {name}
        </p>
        <div className="flex items-center w-fit gap-3 justify-between md:w-[17rem]">
          <div className="w-fit gap-3">
            <p className=" w-[5rem] text-sm">{formatPrice(price)}</p>
            <p className=" w-[6rem]">{formatPrice(price * count)}</p>
          </div>
          <div className="w-fit flex items-center">
            <Counter
              count={count}
              onDecrement={handleDecrement}
              onIncrement={handleIncrement}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
