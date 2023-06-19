import { client } from "@/lib/sanity.client";
import Head from "next/head";
import Layout from "@/components/Layout";
import Product from "@/components/Product";
import Banner from "@/components/Banner";
import Category from "@/components/Category";
import { BannerType, ProductType } from "@/typing";

type Props = {
  products: [ProductType];
  categories: [];
  banner: [BannerType]
};

const Home = ({ products, categories, banner }: Props) => {
  return (
    <Layout>
      <Head>
        <title>Arya Shop | E-commerce App</title>
      </Head>
      <section className="min-h-screen container mx-auto">
        <Banner banner={banner} />
        <Category categories={categories} />
        <div>
          <h2 className="title">All Products</h2>
          <div className="lg:grid lg:grid-cols-4 lg:grid-flow-row gap-5 mb-10 mt-5">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == 'product']`;
  const categoryQuery = `*[_type == 'category']`;
  const bannerQuery = `*[_type == 'banner']`;
  const products = await client.fetch(query);
  const categories = await client.fetch(categoryQuery);
  const banner = await client.fetch(bannerQuery)

  return {
    props: {
      products,
      categories,
      banner
    },
  };
};

export default Home;
