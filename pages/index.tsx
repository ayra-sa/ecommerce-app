import Layout from "@/components/Layout";
import { fetchBanner, fetchCategories, fetchProducts } from "@/lib/fetchQuery";
import { useQuery } from "@tanstack/react-query";
import { FC, Suspense, startTransition, useEffect } from "react";

import Skeleton from "react-loading-skeleton";
import { LazyBanner, LazyCategories, LazyProducts } from "@/components/lazy";
import LoadingCategories from "@/components/loading/LoadingCategories";
import LoadingProducts from "@/components/loading/LoadingProducts";

const Home: FC = () => {
  const bannerQueryKey = ["banner"];
  const categoryQueryKey = ["categories"];
  const productQueryKey = ["products"];
  const bannerQuery = useQuery<BannerType[]>(bannerQueryKey, fetchBanner);
  const categoriesQuery = useQuery<CategoryType[]>(
    categoryQueryKey,
    fetchCategories
  );
  const productsQuery = useQuery<ProductType[]>(
    productQueryKey,
    fetchProducts  
  );

  // useHydrate([bannerQuery, categoriesQuery, productsQuery])

  // useEffect(() => {
  //   bannerQuery.refetch();
  //   categoriesQuery.refetch();
  //   productsQuery.refetch();
  // }, []);

  const headContext: HeadContext = {
    title: "AyShop | E-commerce App",
    meta: [
      {
        name: "description",
        content: "AyShop created with Next js",
      },
    ],
  };

  return (
    <Layout headContext={headContext}>
      <section className="min-h-screen container mx-auto">
        <Suspense fallback={<Skeleton height={320} />}>
          <LazyBanner banner={bannerQuery.data} />
        </Suspense>

        <Suspense fallback={<LoadingCategories />}>
          <LazyCategories categories={categoriesQuery.data} />
        </Suspense>

        <Suspense
          fallback={<LoadingProducts count={[1, 2, 3, 4, 5, 6, 7, 8]} />}
        >
          <LazyProducts products={productsQuery.data} />
        </Suspense>
      </section>
    </Layout>
  );
};

export default Home;
