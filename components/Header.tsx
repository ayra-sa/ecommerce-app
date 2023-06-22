import { useStateContext } from "@/context/StateContext";
 
import Cart from "./Cart";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import MyBrand from "./MyBrand";

type Props = {};

export default function Header({}: Props) {
  const { showCart, setShowCart, cartItems } =
    useStateContext();

  return (
    <header className="shadow-md">
      <nav className="container mx-auto flex justify-between p-5 lg:px-0">
        <MyBrand />
        <button className="relative" onClick={() => setShowCart(true)}>
          <ShoppingBagIcon className="w-6 h-6" />
          <span className="ml-2 bg-red-500 rounded-full absolute w-4 h-4 text-xs flex items-center justify-center top-1 -right-1">
            {cartItems.length}
          </span>
        </button>

        {showCart && <Cart />}
      </nav>
    </header>
  );
}
