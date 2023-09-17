import { lazy } from "react";

export const LazyBanner = lazy(() => import("@/components/page/banner/Banner"));
export const LazyCategories = lazy(() => import("@/components/Categories"));
export const LazyProducts = lazy(() => import("@/components/Products"));
export const LazyProduct = lazy(() => import("@/components/Product"));
export const LazyCategoryBanner = lazy(() => import("@/components/page/banner/CategoryBanner"));
export const LazyProductDetailImage = lazy(() => import("@/components/page/productDetail/ProductDetailImage"));
export const LazyProductThumbnails = lazy(() => import("@/components/page/productDetail/ProductThumbnails"));
export const LazyProductDetailDescription = lazy(() => import("@/components/page/productDetail/ProductDetailDescription"));
