import { client } from "@/lib/sanity.client";
import Layout from "@/components/Layout";
import { GetServerSideProps } from "next";
import Skeleton from "react-loading-skeleton";
import { Suspense } from "react";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import Product from "@/components/Product";


interface Props {
  products: ProductType[];
  categories: [];
  banner: BannerType[];
}

const headContext: HeadContext = {
  title: "AyShop | E-commerce App",
  meta: [
    {
      name: "description",
      content: "AyShop created with Next js",
    },
  ],
};

const Home = ({ products, categories, banner }: Props) => {
  return (
    <Layout headContext={headContext}>
      <section className="min-h-screen container mx-auto">
        <Suspense fallback={<Skeleton height={300} />}>
          <Banner banner={banner} />
        </Suspense>
        <Suspense fallback={<Skeleton height={50} count={4} />}>
          <Category categories={categories} />
        </Suspense>
        <div className="px-5 lg:px-0">
          <h2 className="title">All Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-5 mb-10 mt-5">
            <Suspense fallback={<Skeleton height={200} count={products.length} />}>
              {products?.map((product) => (
                <Product key={product._id} product={product} />
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