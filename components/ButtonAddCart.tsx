import { useStateContext } from "@/context/StateContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = {
  product: {};
};

export default function ButtonAddCart({ product }: Props) {
  const { onAdd, qty } = useStateContext();
  const { status } = useSession();
  const router = useRouter();

  const handleClickAdd = () => {
    if (status === "authenticated") {
      onAdd(product, qty);
    } else {
      document.cookie = `redirectUrl=${encodeURIComponent(
        router.asPath
      )}; path=/`;

      router.push(`/login?from=${encodeURIComponent(router.asPath)}`);
    }
  };

  return (
    <button
      onClick={handleClickAdd}
      className="bg-green-400 px-5 py-2 rounded-md font-bold transition-all hover:bg-green-500"
    >
      Add to Cart
    </button>
  );
}
