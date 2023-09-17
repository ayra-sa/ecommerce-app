import { useStateContext } from "@/context/StateContext";
import { Suspense, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import useRandomNumbers from "@/lib/useRandomNumbers";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchProductDetail, fetchProducts } from "@/lib/fetchQuery";
import LoadingProductDetail from "@/components/loading/LoadingProductDetail";
import {
  LazyProduct,
  LazyProductDetailDescription,
  LazyProductDetailImage,
  LazyProductThumbnails,
} from "@/components/lazy";
import calculateAverage from "@/lib/calculateAverage";
import LoadingProducts from "@/components/loading/LoadingProducts";

export default function ProductDetail() {
  const { slug } = useRouter().query;

  const { data: product } = useQuery(["product", slug], fetchProductDetail);
  const { data: products } = useQuery<ProductType[]>(
    ["products"],
    fetchProducts
  );

  const { setQty } = useStateContext();

  const [index, setIndex] = useState<number>(0);
  const [average, setAverage] = useState<number | null>(null);

  const randomNum = useRandomNumbers(1, 7, 5);
  let newProducts;

  if (products) {
    newProducts = randomNum.map((r) => products[r]);
  }

  const headContext: HeadContext = {
    title: product ? product.name : "Loading...",
    meta: [],
  };

  useEffect(() => {
    setIndex(0);
    setQty(1);
  }, [slug, setQty]);

  useEffect(() => {
    if (product && product.ratings) {
      const averageResult = calculateAverage(product.ratings);
      setAverage(averageResult);
    }
  }, [slug, product]);

  return (
    <Layout headContext={headContext}>
      <section className="container mx-auto min-h-screen mt-5">
        <div className="flex flex-col gap-y-6 md:flex-row w-full gap-x-10 md:px-5">
          <Suspense fallback={<LoadingProductDetail />}>
            <div className="flex flex-col gap-y-5 md:w-1/2 lg:w-[35%]">
              <LazyProductDetailImage
                image={product?.image}
                index={index}
                name={product?.name}
              />
              <div className="flex gap-x-2 items-center px-5 md:px-0">
                {product?.image.map((item: any, i: number) => {
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
              </div>
            </div>
            <LazyProductDetailDescription
              product={product}
              averageRating={average}
            />
          </Suspense>
        </div>

        <div className="mt-20 px-5 lg:px-0">
          <Suspense fallback={<LoadingProducts count={[1, 2, 3, 4]} />}>
            <h2 className="title">You Might Like This</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20 mt-5 gap-5">
              {newProducts?.map((product) => (
                <LazyProduct key={product._id} product={product} />
              ))}
            </div>
          </Suspense>
        </div>
      </section>
    </Layout>
  );
}
