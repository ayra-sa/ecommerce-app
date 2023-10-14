import { StateContext } from "@/context/StateContext";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Quicksand } from "next/font/google";
import { Toaster } from "react-hot-toast";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <StateContext>
        <Toaster />
        <div className={quicksand.className}>
          <Component {...pageProps} />
        </div>
      </StateContext>
    </SessionProvider>
  );
}
