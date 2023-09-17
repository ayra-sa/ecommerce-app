import React from 'react'
import Skeleton from 'react-loading-skeleton';


const LoadingCategories = () => {
    const count = [1, 2, 3, 4];
    return (
      <div className="mt-20">
        <Skeleton height={30} width={100} />
        <div className="flex gap-x-4 mt-6">
          {count.map((c) => (
            <div key={c} className="space-y-4">
              <Skeleton height={80} />
              <Skeleton width={80} />
            </div>
          ))}
        </div>
      </div>
    );
  };

export default LoadingCategories