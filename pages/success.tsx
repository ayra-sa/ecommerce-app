import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Success({}: Props) {
  return (
    <>
      <Head>
        <title>Success</title>
      </Head>
      <div className="container mx-auto py-10 px-5">
        <Link href="/" className="inline-flex items-center gap-x-2">
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
        <div className="w-full border-2 border-green-500 bg-green-100 rounded-md p-5 h-44 flex place-content-center items-center flex-col mt-3">
          <h2 className="text-2xl">Your Payment Success</h2>
          <p>Thank you for your purchasing for the item</p>
        </div>
      </div>
    </>
  );
}
