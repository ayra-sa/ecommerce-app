import { StateContext } from "@/context/StateContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";
import { Toaster } from "react-hot-toast";

const quicksand = Quicksand({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Toaster />
      <div className={quicksand.className}>
        <Component {...pageProps} />
      </div>
    </StateContext>
  );
}
