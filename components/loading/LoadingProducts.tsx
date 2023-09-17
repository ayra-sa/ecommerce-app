import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {
  count: number[]
};

const LoadingProducts = ({count}: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-5 mb-10">
      {count.map((c) => (
        <div key={c}>
          <Skeleton height={200} />
          <div className="space-y-4 mt-3">
            <Skeleton width={200} />
            <Skeleton width={80} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingProducts;
