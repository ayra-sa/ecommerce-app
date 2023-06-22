import Link from "next/link";
 
import ImageItem from "./ImageItem";

type Props = {
  categories: any;
};

export default function Category({ categories }: Props) {
  return (
    <div className="shadow-md w-full rounded-md px-5 py-10 mb-20">
      <h2 className="title">Category</h2>
      <div className="flex gap-x-3 items-center mt-5 overflow-x-scroll">
        {categories.map((category: any) => {
          return (
            <Link
              href={`category/${category._id}`}
              key={category._id}
              className="border border-slate-300 rounded-md px-5 py-2 w-1/4 sm:w-1/5 flex flex-col items-center gap-y-3 transition-all hover:border-slate-500"
            >
              <ImageItem
                alt={category.title}
                imageAsset={category.image}
                width="w-24 lg:w-32"
              />
              <h3 className="text-xs md:text-base">{category.title}</h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
