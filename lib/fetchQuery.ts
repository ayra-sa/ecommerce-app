import { client } from "@/lib/sanity.client";
import { QueryKey } from "@tanstack/react-query";

export const fetchProducts = async () => {
  const query = `*[_type == 'product']`;
  return await client.fetch(query);
};

export const fetchCategories = async () => {
  const query = `*[_type == 'category']`
  return await client.fetch(query)
}

export const fetchBanner = async (): Promise<BannerType[]> => {
  const query = `*[_type == 'banner']`
  return await client.fetch(query)
}

export const fetchCategoryDetail = async ({queryKey}: {queryKey: QueryKey}) => {
  const [_key, id] = queryKey as [string, string];
  const query = `*[_type=='category' && _id == '${id}'][0]`;
  return await client.fetch(query);
};

export const fetchProductCategory = async ({queryKey}: {queryKey: QueryKey}) => {
  const [_key, id] = queryKey as [string, string]
  const query = `*[_type=='product' && categories[0]._ref == '${id}']`
  return await client.fetch(query)
}

export const fetchProductDetail = async ({queryKey}: {queryKey: QueryKey}) => {
  const [_key, slug] = queryKey as [string, string]
  const query = `*[_type=='product' && slug.current == '${slug}'][0]`
  return await client.fetch(query)
}