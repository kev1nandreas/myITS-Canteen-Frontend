"use client";

import CartMenu from "@/components/CartMenu";
import { formatPrice } from "@/lib/utils";
import { useEffect, useState } from "react";

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
    return (
      <div className="md:w-[80%] flex items-center justify-center w-full h-[calc(100vh-4rem)]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="md:w-[80%] flex flex-col h-[calc(100vh-4rem)] p-[2rem] overflow-auto">
      <h1 className="text-3xl font-bold mb-4">Pesanan Anda</h1>
      {cart.length === 0 ? (
        <div className="flex items-center justify-center w-full">
          <p className="text-lg">Keranjang Anda kosong</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <CartMenu
                key={item.id}
                id={item.id.toString()}
                name={item.name}
                quantity={item.quantity}
                price={item.price * item.quantity}
                image={item.image}
                calculateTotalPrice={calculateTotalPrice}
              />
            ))}
          </div>
          <div className="flex w-[calc(100vw-4rem)] md:max-w-[20rem] justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg">
            <p>Total Price: </p>
            <p className="font-semibold text-xl">
              {formatPrice(totalPrice > 0 ? totalPrice : 0)}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
