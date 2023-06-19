import { fixPrice } from "@/components/Banner";
import ImageItem from "@/components/ImageItem";
import Layout from "@/components/Layout";
import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { ProductType } from "@/typing";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  category: {
    title: string;
  };
  productCategory: [ProductType];
};

type ParamsProps = {
  params: {
    id: string;
  };
};

export default function CategoryDetail({ category, productCategory }: Props) {
  return (
    <Layout>
      <Head>
        <title>{`${category.title} Category`}</title>
      </Head>
      <section className="min-h-screen container mx-auto mt-5">
        <div className="w-full h-60 flex place-content-center items-center bg-green-400 rounded-md">
          <h2 className="lg:text-4xl">Category: {category.title}</h2>
        </div>

        <div className="flex gap-x-5 mt-20">
          {productCategory.map((product) => (
            <Link
              href={`/product/${product.slug.current}`}
              key={product._id}
              className="w-1/4 shadow-md rounded-md"
            >
              <figure className="w-full h-44 flex place-content-center items-center">
                <ImageItem alt={product.name} imageAsset={product.image[0].asset._ref} width="w-52" />
              </figure>
              <div className="p-5">
                <p>{product.name}</p>
                <h3>{fixPrice(product.price)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type=='category']{
          _id
      }`;

  const categories = await client.fetch(query);

  const paths = categories.map((category: any) => {
    return {
      params: { id: category._id.toString() },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { id } }: ParamsProps) => {
  const query = `*[_type=='category' && _id == '${id}'][0]`;
  const prodQuery = `*[_type=='product' && categories[0]._ref == '${id}']`;

  const category = await client.fetch(query);
  const productCategory = await client.fetch(prodQuery);

  return {
    props: { category, productCategory },
  };
};
