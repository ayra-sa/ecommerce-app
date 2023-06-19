import urlFor from "@/lib/urlFor";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ImageItem from "./ImageItem";

type Props = {
  categories: any;
};

export default function Category({ categories }: Props) {
  return (
    <div className="shadow-md w-full rounded-md px-5 py-10 mb-20">
      <h2 className="title">Category</h2>
      <div className="flex gap-x-3 items-center mt-5">
        {categories.map((category: any) => {
          return (
            <Link href={`category/${category._id}`} key={category._id} className="border border-slate-300 rounded-md px-5 py-2 w-[10%] flex flex-col items-center gap-y-3 transition-all hover:border-slate-500">
                <ImageItem alt={category.title} imageAsset={category.image.asset._ref} width="w-32" />
              <h3>{category.title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
