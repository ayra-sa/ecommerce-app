import { useStateContext } from "@/context/StateContext";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {};

export default function ProductQuantities({}: Props) {
  const { qty, decQty, incQty } = useStateContext();

  return (
    <div className="inline-flex items-center gap-x-1 border border-neutral-400 w-[30%] lg:w-[15%] text-center rounded-md p-1">
      <button
        onClick={decQty}
        className={`flex-1 ${
          qty === 1 ? "cursor-not-allowed" : "text-green-500 cursor-pointer"
        }`}
        disabled={qty === 1 && true}
      >
        <MinusSmallIcon className="w-10 h-10 md:w-auto md:h-auto" />
      </button>
      <span className="flex-1 text-2xl lg:text-lg font-semibold">{qty}</span>
      <button onClick={incQty} className="flex-1 font-bold text-green-500">
        <PlusSmallIcon className="w-10 h-10 md:w-auto md:h-auto" />
      </button>
    </div>
  );
}