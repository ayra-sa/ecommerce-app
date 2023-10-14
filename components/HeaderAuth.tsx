import React, { FC } from "react";
import MyBrand from "./MyBrand";

const HeaderAuth: FC = () => {
  return (
    <header>
      <div className="absolute flex w-full justify-center py-5">
        <MyBrand />
      </div>
    </header>
  );
};

export default HeaderAuth;
