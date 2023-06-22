import { ProductType } from "@/typing";
import React from "react";
import ProductDetailRating from "./ProductDetailRating";
import { fixPrice } from "@/lib/fixPrice";
import ProductQuantities from "./ProductQuantities";
import { PortableText } from "@portabletext/react";
import CheckoutButton from "./CheckoutButton";
import ButtonAddCart from "./ButtonAddCart";

type Props = {
    product: ProductType
    averageRating: number | null
};

export default function ProductDetailDescription({product, averageRating}: Props) {
    const {name, details, price, ratings} = product
    const prods = [product]

  return (
    <div className="md:w-1/2 space-y-5 px-5 md:px-0">
      <div>
        <h1 className="text-2xl">{name}</h1>
        <ProductDetailRating averageRating={averageRating} ratingsCount={ratings.length}/>
      </div>
      <h3 className="text-3xl">{fixPrice(price)}</h3>
      <div className="w-2/3">
        <h4>Details: </h4>
        <PortableText value={details[0]} />
      </div>
      <ProductQuantities />
      <div className="flex gap-x-5">
        <ButtonAddCart product={product} />
        <CheckoutButton
          cartItems={prods}
          bgColor="bg-transparent"
          bgColorHover="hover:bg-green-400"
        >
          Buy Item
        </CheckoutButton>
      </div>
    </div>
  );
}