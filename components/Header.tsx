import { useStateContext } from "@/context/StateContext";

import Cart from "./Cart";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import MyBrand from "./MyBrand";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Button from "./Button";

type Props = {};

export default function Header({}: Props) {
  const { showCart, setShowCart, cartItems } = useStateContext();
  const [expandProfile, setExpandProfile] = useState(false);

  const router = useRouter();
  const { status, data } = useSession();

  return (
    <header className="shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-5 py-4 lg:px-0">
        <MyBrand />
        <div className="flex gap-x-5 items-center">
          <button className="relative" onClick={() => setShowCart(true)}>
            <ShoppingBagIcon className="w-6 h-6" />
            <span className="ml-2 bg-red-500 rounded-full absolute w-4 h-4 text-xs flex items-center justify-center top-1 -right-1">
              {cartItems.length}
            </span>
          </button>
          {status === "authenticated" ? (
            <div
              className="flex flex-col items-center gap-y-1 relative cursor-pointer"
              onClick={() => setExpandProfile(!expandProfile)}
            >
              <Image
                src={data.user?.image!}
                alt={data.user?.name!}
                width={35}
                height={35}
                className="rounded-full"
              />
              <p className="text-xs">{data.user?.name}</p>

              {expandProfile && (
                <div className="absolute bg-white top-16 px-5 py-3 rounded-md shadow-lg">
                  <button
                    className="hover:underline font-semibold"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button variant="secondary" onClick={() => router.push("/login")}>
                Login
              </Button>
            </>
          )}
        </div>

        {showCart && <Cart />}
      </nav>
    </header>
  );
}
