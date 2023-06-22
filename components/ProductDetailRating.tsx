import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";

type Props = {
    averageRating: number | null
    ratingsCount: number
};

export default function ProductDetailRating({ratingsCount, averageRating}: Props) {
  return (
    <div className="flex gap-x-2 items-center mt-1">
      <StarIcon height={25} color="#FFC400" />
      <p className="font-semibold">
        {averageRating?.toFixed(1)}{" "}
        <span className="text-neutral-500">({ratingsCount})</span>
      </p>
    </div>
  );
}
