import { useStateContext } from "@/context/StateContext";
import { client } from "@/lib/sanity.client";
import { ProductType } from "@/typing";
import Head from "next/head";
import { Suspense, lazy, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import calculateAverage from "@/lib/calculateAverage";
import useRandomNumbers from "@/lib/useRandomNumbers";
import Skeleton from "react-loading-skeleton";

type Props = {
  product: ProductType;
  products: [ProductType];
};

type SlugProps = {
  params: {
    slug: string;
  };
};

const LazyProductDetailImage = lazy(
  () => import("@/components/ProductDetailImage")
);
const LazyProductThumbnails = lazy(
  () => import("@/components/ProductThumbnails")
);
const LazyProductDetailDescription = lazy(
  () => import("@/components/ProductDetailDescription")
);
const LazyProduct = lazy(() => import("@/components/Product"))

export default function ProductDetail({ product, products }: Props) {
  const { image, name, ratings } = product;
  const { setQty } = useStateContext();

  const [index, setIndex] = useState<number>(0);
  const [average, setAverage] = useState<number | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const randomNum = useRandomNumbers(1, 7, 5);

  const newProducts = randomNum.map((r) => products[r]);

  useEffect(() => {
    setIndex(0);
    setQty(1);
  }, [product.slug, setQty]);

  useEffect(() => {
    const averageResult = calculateAverage(ratings);
    setAverage(averageResult);
  }, [product.slug, ratings]);

  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <section className="container mx-auto min-h-screen mt-5">
        <div className="flex flex-col gap-y-6 md:flex-row w-full gap-x-10 md:px-5">
          <div className="flex flex-col gap-y-5 md:w-1/2 lg:w-[35%]">
            <Suspense fallback={<Skeleton height={250} />}>
              <LazyProductDetailImage image={image} index={index} name={name} />
            </Suspense>
            <div className="flex gap-x-2 items-center px-5 md:px-0">
              <Suspense fallback={<Skeleton height={100} />}>
                {image?.map((item, i) => {
                  return (
                    <LazyProductThumbnails
                      key={i}
                      item={item}
                      i={i}
                      selectIndex={index}
                      onImageIndex={setIndex}
                    />
                  );
                })}
              </Suspense>
            </div>
          </div>
          <Suspense fallback={<Skeleton count={5} />}>
            <LazyProductDetailDescription product={product} averageRating={average} />
          </Suspense>
        </div>

        <div className="mt-20 px-5 lg:px-0">
          <h2 className="title">You Might Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20 mt-5 gap-5">
            <Suspense fallback={<Skeleton height={200} />}>
              {newProducts.map((product) => (
                <LazyProduct key={product._id} product={product} />
              ))}
            </Suspense>
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
