import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Failed({}: Props) {
  return (
    <>
      <Head>
        <title>Payment Failed</title>
      </Head>
      <div className="container mx-auto py-10 px-5">
        <Link href="/" className="inline-flex items-center gap-x-2">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
        <div className="w-full border-2 border-red-500 bg-red-100 rounded-md p-5 h-44 flex place-content-center items-center flex-col mt-3">
          <h2 className="text-2xl">Sorry, your payment failed</h2>
          <p>Please try again</p>
        </div>
      </div>
    </>
  );
}
