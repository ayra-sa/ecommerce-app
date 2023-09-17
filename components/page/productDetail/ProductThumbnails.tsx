 import React from "react";
import Image from "next/image";
import urlFor from '../../../lib/urlFor'

type ProductImageProps = {
  i: number;
  item: any;
  selectIndex: number;
  onImageIndex: (index: number) => void;
};

export default function ProductThumbnails({
  i,
  item,
  selectIndex,
  onImageIndex,
}: ProductImageProps) {
  return (
    <div
      onClick={() => onImageIndex(i)}
      className={`p-1 w-14 h-14 cursor-pointer border-2 rounded-lg transition-all duration-150 flex items-center ${
        selectIndex === i
          ? "border-red-400 bg-neutral-200"
          : "border-transparent bg-neutral-100"
      }`}
    >
      <Image
        src={urlFor(item).url()}
        alt={`image ${i}`}
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-auto"
        loading="lazy"
      />
    </div>
  );
}