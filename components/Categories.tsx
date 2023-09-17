import React from "react";
import Category from "./Category";

type Props = {
  categories?: CategoryType[];
};

const Categories = ({ categories }: Props) => {
  return (
    <div className="shadow-md w-full rounded-md px-5 py-10 mb-20">
      <h2 className="title">Category</h2>
      <div className="flex gap-x-3 items-center mt-5 overflow-x-scroll md:overflow-x-visible">
        {categories?.map((category) => (
          <Category key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
