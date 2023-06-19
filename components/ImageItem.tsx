import Image from "next/image";
import React from "react";
import urlFor from "@/lib/urlFor";
import { SanityImageAsset } from "@/typing";

type Props = {
  alt: string;
  imageAsset: SanityImageAsset;
  width: string;
};

const ImageItem: React.FC<Props> = ({ alt, imageAsset, width }) => {
  return (
    <Image
      alt={alt}
      src={urlFor(imageAsset).url() || ''}
      width={0}
      height={0}
      className={`${width} h-auto`}
      sizes="100vw"
      loading="lazy"
      // priority
    />
  );
};

export default ImageItem;
