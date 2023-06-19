import { useStateContext } from "@/context/StateContext";
import urlFor from "@/lib/urlFor";
import {
  MinusSmallIcon,
  PlusSmallIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useRef } from "react";
import { fixPrice } from "./Banner";
import CheckoutButton from "./CheckoutButton";

type Props = {};

export default function Cart({}: Props) {
  const cartRef = useRef<HTMLDivElement>(null);
  
  const {
    setShowCart,
    cartItems,
    qty,
    onRemove,
    toggleCartItemQuanitity,
    totalPrice,
  } = useStateContext();


  return (
    <div
      className="fixed z-10 inset-0 bg-neutral-500 bg-opacity-60 shadow-md"
      ref={cartRef}
    >
      <div className="w-[30%] h-full bg-white ml-auto relative">
        <div className="flex items-center justify-between px-10 py-5 border-b border-b-neutral-300">
          <span>Your Cart ({cartItems.length})</span>
          <button onClick={() => setShowCart(false)} className="w-5 h-5">
            <XMarkIcon />
          </button>
        </div>

        <div className="py-5 h-full">
          {cartItems.length >= 1 &&
            cartItems.map((item: any) => (
              <div key={item._id} className="flex items-center gap-x-3 mb-5 px-10">
                <Image
                  src={urlFor(item.image[0].asset._ref).url()}
                  alt={item.name}
                  width={65}
                  height={65}
                  className="rounded-md border-2 border-neutral-500"
                />
                <div className="flex justify-between w-full items-center">
                  <div>
                    <h2>{item.name}</h2>
                    <div>
                      <div className="flex items-center gap-x-1 border border-neutral-400 text-center rounded-md mt-2 p-1 w-20 h-8">
                        <button
                          className="flex-1 text-green-500 cursor-pointer"
                          onClick={() => toggleCartItemQuanitity(item._id, "dec")}
                        >
                          <MinusSmallIcon />
                        </button>
                        <span className="flex-1 text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          className="flex flex-1 font-bold text-green-500"
                          onClick={() =>
                            toggleCartItemQuanitity(item._id, "inc")
                          }
                        >
                          <PlusSmallIcon />
                        </button>
                      </div>

                      <p>{fixPrice(item.price)}</p>
                    </div>
                  </div>

                  <button className="w-5 h-5" onClick={() => onRemove(item)}>
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}

          {cartItems.length >= 1 ? (
            <div className="flex justify-between border-t border-t-neutral-300 py-5 absolute bottom-5 w-full right-0 px-10">
              <h3>Total: {fixPrice(totalPrice)}</h3>
              <CheckoutButton cartItems={cartItems} bgColor="bg-green-400" bgColorHover="hover:bg-green-500">Checkout</CheckoutButton>
            </div>
          ) : (
            <h3 className="text-center mt-10 text-xl">
              Let&apos;s go shopping
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}
