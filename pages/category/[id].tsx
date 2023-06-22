import CategoryBanner from "@/components/CategoryBanner";
import Layout from "@/components/Layout";
import { client } from "@/lib/sanity.client";
import { ProductType } from "@/typing";
import Head from "next/head";
import { Suspense, lazy } from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  category: {
    title: string;
  };
  productCategory: ProductType[];
};

type ParamsProps = {
  params: {
    id: string;
  };
};

const LazyProduct = lazy(() => import("@/components/Product"));

export default function CategoryDetail({ category, productCategory }: Props) {
  return (
    <Layout>
      <Head>
        <title>{`${category.title} Category`}</title>
      </Head>
      <section className="min-h-screen container mx-auto mt-5">
        <CategoryBanner title={category.title} />

        <Suspense fallback={<Skeleton height={200} count={4} />}>
          <div className="flex gap-x-5 mt-20">
            {productCategory.map((product) => (
              <LazyProduct
                key={product._id}
                className="w-1/4 shadow-md rounded-md py-5"
                product={product}
              />
            ))}
          </div>
        </Suspense>
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
