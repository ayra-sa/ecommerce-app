import { useStateContext } from "@/context/StateContext";
import { client } from "@/lib/sanity.client";
import { Suspense, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import calculateAverage from "@/lib/calculateAverage";
import useRandomNumbers from "@/lib/useRandomNumbers";
import Skeleton from "react-loading-skeleton";
import ProductThumbnails from "@/components/ProductThumbnails";
import ProductDetailImage from "@/components/ProductDetailImage";
import ProductDetailDescription from "@/components/ProductDetailDescription";
import Product from "@/components/Product";

type Props = {
  product: ProductType;
  products: ProductType[];
};

type SlugProps = {
  params: {
    slug: string;
  };
};


export default function ProductDetail({ product, products }: Props) {
  const { image, name, ratings } = product;
  const { setQty } = useStateContext();

  const [index, setIndex] = useState<number>(0);
  const [average, setAverage] = useState<number | null>(null);
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

  const headContext: HeadContext = {
    title: product.name,
    meta: [],
  };

  return (
    <Layout headContext={headContext}>
      <section className="container mx-auto min-h-screen mt-5">
        <div className="flex flex-col gap-y-6 md:flex-row w-full gap-x-10 md:px-5">
          <div className="flex flex-col gap-y-5 md:w-1/2 lg:w-[35%]">
            <Suspense fallback={<Skeleton height={250} />}>
              <ProductDetailImage image={image} index={index} name={name} />
            </Suspense>
            <Suspense fallback={<Skeleton height={100} />}>
              <div className="flex gap-x-2 items-center px-5 md:px-0">
                {image?.map((item, i) => {
                  return (
                    <ProductThumbnails
                      key={i}
                      item={item}
                      i={i}
                      selectIndex={index}
                      onImageIndex={setIndex}
                    />
                  );
                })}
              </div>
            </Suspense>
          </div>
          <Suspense fallback={<Skeleton count={5} />}>
            <ProductDetailDescription
              product={product}
              averageRating={average}
            />
          </Suspense>
        </div>

        <div className="mt-20 px-5 lg:px-0">
          <h2 className="title">You Might Like This</h2>
          <Suspense fallback={<Skeleton height={200} />}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20 mt-5 gap-5">
              {newProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </Suspense>
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
