import React from "react";
import Skeleton from "react-loading-skeleton";

type Props = {};

const LoadingProductDetail = (props: Props) => {
  return (
    <div className="flex gap-10">
      <div className="md:w-[400px] lg:w-[430px] md:px-5">
        <Skeleton height={384} width={430} />

        <div className="flex items-center gap-x-3 mt-3">
          <Skeleton width={56} height={56} />
          <Skeleton width={56} height={56} />
          <Skeleton width={56} height={56} />
        </div>
      </div>

      <div className="md:w-[400px]">
        <Skeleton width={200} />
        <Skeleton width={70} />
        <Skeleton width={100} className="!my-4" />
        <Skeleton width={60} />
        <Skeleton width={80} />
        <Skeleton width={200} />
        <Skeleton width={70} />
        <Skeleton width={40} />
        <Skeleton width={60} />
        <Skeleton width={70} />
      </div>
    </div>
  );
};

export default LoadingProductDetail;