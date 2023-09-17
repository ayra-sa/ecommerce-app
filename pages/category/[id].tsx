import Layout from "@/components/Layout";
import { LazyCategoryBanner, LazyProduct } from "@/components/lazy";
import LoadingBannerCategory from "@/components/loading/LoadingBannerCategory";
import LoadingProducts from "@/components/loading/LoadingProducts";
import { fetchCategoryDetail, fetchProductCategory } from "@/lib/fetchQuery";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Suspense } from "react";

export default function CategoryDetail() {
  const { id } = useRouter().query;

  const { data: category } = useQuery(["category", id], fetchCategoryDetail);
  const { data: productCategory } = useQuery(
    ["productCaetgory", id],
    fetchProductCategory
  );

  const headContext: HeadContext = {
    title: category ? `${category.title} Category` : "Loading...",
    meta: [],
  };

  return (
    <Layout headContext={headContext}>
      <section className="min-h-screen container mx-auto mt-5">
        <Suspense fallback={<LoadingBannerCategory />}>
          <LazyCategoryBanner title={category?.title} />
        </Suspense>

        <div className="flex gap-x-5 mt-20">
          <Suspense fallback={<LoadingProducts count={[1,2,3]} />}>
            {productCategory?.map((product: ProductType) => (
              <LazyProduct
                key={product._id}
                className="w-1/4 shadow-md rounded-md py-5"
                product={product}
              />
            ))}
          </Suspense>
        </div>
      </section>
    </Layout>
  );
}