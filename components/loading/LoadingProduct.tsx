import Skeleton from "react-loading-skeleton";

const LoadingProduct = () => {
  return (
    <div className="space-y-4">
      <Skeleton height={80} />
      <Skeleton width={200} />
      <Skeleton width={60} />
    </div>
  );
};

export default LoadingProduct;