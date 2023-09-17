import Link from "next/link";

import ImageItem from "./ImageItem";

type Props = {
  category: CategoryType;
};

export default function Category({ category }: Props) {
  return (
    <Link
      href={`category/${category._id}`}
      key={category._id}
      className="border border-slate-300 rounded-md px-5 py-2 md:w-1/4 lg:w-[10%] w-1/5 flex flex-col items-center gap-y-3 transition-all hover:border-slate-500"
    >
      <ImageItem
        alt={category.title}
        imageAsset={category.image}
        width="w-24"
      />
      <h3 className="text-xs md:text-base">{category.title}</h3>
    </Link>
  );
}
