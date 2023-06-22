import { client } from "@/lib/sanity.client";
import Head from "next/head";
import Layout from "@/components/Layout";
import { BannerType, ProductType } from "@/typing";
import { GetServerSideProps } from "next";
import Skeleton from "react-loading-skeleton";
import { lazy, Suspense } from "react";

const LazyBanner = lazy(() => import("@/components/Banner"));
const LazyCategory = lazy(() => import("@/components/Category"));
const LazyProduct = lazy(() => import("@/components/Product"));

interface Props {
  products: ProductType[];
  categories: [];
  banner: BannerType[];
}

const Home = ({ products, categories, banner }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Arya Shop | E-commerce App</title>
      </Head>
      <section className="min-h-screen container mx-auto">
        <Suspense fallback={<Skeleton height={300} />}>
          <LazyBanner banner={banner} />
        </Suspense>
        <Suspense fallback={<Skeleton height={50} count={categories.length} />}>
          <LazyCategory categories={categories} />
        </Suspense>
        <div>
          <h2 className="title">All Products</h2>
          <div className="lg:grid lg:grid-cols-4 lg:grid-flow-row gap-5 mb-10 mt-5">
            <Suspense fallback={<Skeleton height={200} count={products.length} />}>
              {products?.map((product) => (
                <LazyProduct key={product._id} product={product} />
              ))}
            </Suspense>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const query = `*[_type == 'product']`;
  const categoryQuery = `*[_type == 'category']`;
  const bannerQuery = `*[_type == 'banner']`;
  const products: ProductType[] = await client.fetch(query);
  const categories: [] = await client.fetch(categoryQuery);
  const banner: BannerType[] = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      categories,
      banner,
    },
  };
};

export default Home;