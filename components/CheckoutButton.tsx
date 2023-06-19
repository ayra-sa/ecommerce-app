import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  cartItems: any
  children: React.ReactNode;
  bgColor: string,
  bgColorHover: string;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutButton = ({ cartItems, children, bgColor, bgColorHover }: Props) => {

  const handleCheckout = async () => {
    toast.loading("Redirecting... ");

    const stripe = await stripePromise;

    const response = await fetch("/api/checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems }),
    });

    const session = await response.json();

    const result = await stripe?.redirectToCheckout({
      sessionId: session.id,
    });

    if (result?.error) {
      console.error(result.error);
    }
  };

  return (
    <button onClick={handleCheckout} className={`font-bold transition-all py-2 px-5 rounded-md border-2 border-green-400 ${bgColor} ${bgColorHover}`}>
      {children}
    </button>
  );
};

export default CheckoutButton;