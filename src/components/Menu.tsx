/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Counter from "./ui/Counter";
import { ENV } from "@/configs/environment";

interface CategoryProps {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export default function Menu({ id, name, price, image }: CategoryProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === id);
    if (existingItem) {
      setCount(existingItem.quantity);
    }
  }, [id]);

  const handleClick = () => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id,
        name,
        price,
        image: image || "/Menu/blank-bg.png",
        quantity: 1,
      });
    }
    setCount(existingItem ? existingItem.quantity : 1);

    window.localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleInc = () => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
      setCount(existingItem.quantity);
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleDec = () => {
    const cart = JSON.parse(window.localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === id);

    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity -= 1;
      setCount(existingItem.quantity);
      if (existingItem.quantity === 0) {
        cart.splice(cart.indexOf(existingItem), 1);
      }
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-3 rounded-lg w-[10rem] cursor-pointer bg-white border border-gray-200">
      <div className="flex flex-col justify-center items-center gap-5 opacity-70">
        <div className="flex items-center justify-center w-[6rem] h-[6rem] rounded-full bg-gray-100 overflow-hidden">
          <Image
            src={
              image?.startsWith("storage/")
                ? `${ENV.URI.BASE_IMAGE_URL}${image}`
                : image || "/Menu/blank-bg.png"
            }
            alt={"Image of " + name}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold">{name}</p>
          <p>{formatPrice(price)}</p>
        </div>
        {count === 0 && (
          <button
            onClick={handleClick}
            className="px-4 py-2 text-sm flex items-center justify-center gap-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 duration-200 ease-in-out cursor-pointer"
          >
            <FaPlus />
            Tambah
          </button>
        )}
        {count > 0 && (
          <Counter
            count={count}
            onIncrement={handleInc}
            onDecrement={handleDec}
          />
        )}
      </div>
    </div>
  );
}
