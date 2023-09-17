import ProductDetailRating from "./ProductDetailRating";
import { fixPrice } from "@/lib/fixPrice";
import ProductQuantities from "./ProductQuantities";
import { PortableText } from "@portabletext/react";
import CheckoutButton from "../../button/CheckoutButton";
import ButtonAddCart from "../../button/ButtonAddCart";
import { useSession } from "next-auth/react";
import Button from "@/components/button/Button";

type Props = {
  product?: ProductType;
  averageRating: number | null;
};

export default function ProductDetailDescription({
  product,
  averageRating,
}: Props) {
  const prods = [product];
  const { status } = useSession();

  if (!product) {
    return null;
  }

  return (
    <div className="md:w-1/2 space-y-5 px-5 md:px-0">
      <div>
        <h1 className="text-2xl">{product?.name}</h1>
        <ProductDetailRating
          averageRating={averageRating}
          ratingsCount={product?.ratings.length}
        />
      </div>
      <h3 className="text-3xl">{fixPrice(product?.price)}</h3>
      <div className="w-11/12 md:w-4/5 lg:w-2/3">
        <h4>Details: </h4>
        <PortableText value={product?.details[0]} />
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
