import { useStateContext } from "@/context/StateContext";
import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { ProductType } from "@/typing";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MinusSmallIcon, PlusSmallIcon, StarIcon } from "@heroicons/react/24/solid";
import Layout from "@/components/Layout";
import { fixPrice } from "@/components/Banner";
import Product from "@/components/Product";
import CheckoutButton from "@/components/CheckoutButton";
import { PortableText } from "@portabletext/react";
import ImageItem from "@/components/ImageItem";


type Props = {
  product: ProductType;
  products: [ProductType];
};

type SlugProps = {
  params: {
    slug: string;
  };
};

export default function ProductDetail({ product, products }: Props) {
  const { image, name, details, price, ratings } = product;
  const { onAdd, qty, setQty, decQty, incQty } = useStateContext();

  
  const prods = [product]
  
  const [index, setIndex] = useState<number>(0);
  const [randomNum, setRandomNum] = useState<number[]>([0]);
  const [average, setAverage] = useState<number | null>(null)

  let randomProduct;
  let newProducts: any[] = [];

  const getRandomNumbers = (min: number, max: number, n: number) => {
    let result: any[] = [];

    while (result.length < n) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

      if (!result.includes(randomNumber)) {
        result.push(randomNumber);
      }
    }

    return result;
  };

  const calculateAverage = () => {
    const sum = ratings.reduce((total: number, rating: number) => total + rating, 0);
    const average = sum / ratings.length;
    setAverage(average);
  };

  useEffect(() => {
    const randomNumbers = getRandomNumbers(1, 7, 5);
    setRandomNum(randomNumbers);
    setIndex(0)
    setQty(1)
  }, [product.slug, setQty]);

  useEffect(() => {
    calculateAverage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug])


  randomNum.forEach((r) => {
    randomProduct = products[r];
    newProducts.push(randomProduct);
  });


  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <section className="container mx-auto min-h-screen mt-5">
        <div className="flex flex-col gap-y-6 md:flex-row w-full gap-x-10">
          <div className="flex flex-col gap-y-5 md:w-[35%]">
            <div className="bg-neutral-200 flex justify-center items-center rounded-xl w-full h-96 py-10">
              <figure className="relative max-w-[80%] h-auto">
                <ImageItem alt={name} imageAsset={image && image[index] || image[0]} width="w-full" />
              </figure>
            </div>
            <div className="flex gap-x-2 items-center px-5 md:px-0">
              {image?.map((item, i) => (
                <Image
                  src={urlFor(item).url()}
                  key={i}
                  alt={`image ${i}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={`p-1 w-12 h-auto cursor-pointer border-2 rounded-lg transition-all duration-150 ${
                    index === i
                      ? "border-red-400 bg-neutral-200"
                      : "border-transparent bg-neutral-100"
                  }`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>

          <div className="md:w-1/2 space-y-5 px-5 md:px-0">
            <div>
              <h1 className="text-2xl">{name}</h1>
              <div className="flex gap-x-2 items-center mt-1">
                <StarIcon height={25} color="#FFC400" />
                <p className="font-semibold">{average?.toFixed(1)} <span className="text-neutral-500">({ratings.length})</span></p>
              </div>
            </div>
            <h3 className="text-3xl">{fixPrice(price)}</h3>
            <div className="w-2/3">
              <h4>Details: </h4>
              <PortableText value={details[0]} />
            </div>
            <div className="inline-flex items-center gap-x-1 border border-neutral-400 w-[30%] lg:w-[15%] text-center rounded-md p-1">
              <button
                onClick={decQty}
                className={`flex-1 ${
                  qty === 1
                    ? "cursor-not-allowed"
                    : "text-green-500 cursor-pointer"
                }`}
                disabled={qty === 1 && true}
              >
                <MinusSmallIcon className="w-10 h-10 md:w-auto md:h-auto" />
              </button>
              <span className="flex-1 text-2xl lg:text-lg font-semibold">
                {qty}
              </span>
              <button
                onClick={incQty}
                className="flex-1 font-bold text-green-500"
              >
                <PlusSmallIcon className="w-10 h-10 md:w-auto md:h-auto" />
              </button>
            </div>
            <div className="flex gap-x-5">
              <button
                onClick={() => onAdd(product, qty)}
                className="bg-green-400 px-5 py-2 rounded-md font-bold transition-all hover:bg-green-500"
              >
                Add to Cart
              </button>
              <CheckoutButton cartItems={prods} bgColor="bg-transparent" bgColorHover="hover:bg-green-400">Buy Item</CheckoutButton>
            </div>
          </div>
        </div>

        <div className="mt-20 px-5 md:px-0">
          <h2 className="title">You Might Like This</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 mb-20 mt-5 gap-5">
            {newProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type=='product']{
        slug {
            current
        }
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product: ProductType) => {
    return {
      params: {
        slug: product.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }: SlugProps) => {
  const query = `*[_type=='product' && slug.current == '${slug}'][0]`;
  const productQuery = `*[_type=='product']`;

  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    props: { product, products },
  };
};
