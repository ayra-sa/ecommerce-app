import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { fixPrice } from "./Banner";
import { ProductType } from "@/typing";
import ImageItem from "./ImageItem";

type Props = {
  product: ProductType;
};

export default function Product({ product }: Props) {
  return (
    <Link
      href={`/product/${product.slug.current}`}
      className="shadow-md transition-shadow w-full rounded-md py-5 hover:shadow-xl"
    >
      <figure className="w-full h-36 flex place-content-center items-center">
        <ImageItem alt={product.name} imageAsset={product.image[0].asset._ref} width="w-32" />
      </figure>
      <div className="px-5 pt-2">
        <p>{product.name}</p>
        <h3>{fixPrice(product.price)}</h3>
      </div>
    </Link>
  );
}
