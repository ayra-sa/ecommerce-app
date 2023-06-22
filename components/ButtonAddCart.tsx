import { useStateContext } from "@/context/StateContext";
 

type Props = {
    product: {}
};

export default function ButtonAddCart({product}: Props) {
    const {onAdd, qty} = useStateContext()

  return (
    <button
      onClick={() => onAdd(product, qty)}
      className="bg-green-400 px-5 py-2 rounded-md font-bold transition-all hover:bg-green-500"
    >
      Add to Cart
    </button>
  );
}
