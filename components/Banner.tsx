import { BannerType } from "@/typing";
import Link from "next/link";
import ImageItem from "./ImageItem";
import { fixPrice } from "@/lib/fixPrice";

type Props = {
  banner: BannerType[];
};

export default function Banner({ banner }: Props) {
  return (
    <Link
      href={`/product/${banner[0].slug.current}`}
      className="flex w-full h-80 bg-banner md:rounded-md mt-5 mb-10 text-white p-5"
    >
      <div className="w-1/2">
        <h2 className="text-4xl my-2">NEW PRODUCT!!</h2>
        <p className="text-2xl">GET SPECIAL PRICE..</p>
      </div>
      <div className="w-1/2 w flex flex-col md:flex-row gap-x-5 items-center">
        <ImageItem imageAsset={banner[0].image[0]} alt={banner[0].name} width="w-52" />
        <div>
          <h2 className="text-2xl">{banner[0].name}</h2>
          <p>Just {fixPrice(banner[0].price)}</p>
          <p>NEW PRODUCT</p>
          <p>AWESOME</p>
          <p>SUITS YOU</p>
        </div>
      </div>
    </Link>
  );
}
