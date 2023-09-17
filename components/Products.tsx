import Product from "./Product";

type Props = {
  products?: ProductType[];
};

const Products = ({ products }: Props) => {
  return (
    <div className="px-5 lg:px-0">
      <h2 className="title">All Products</h2>      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-5 mb-10 mt-5">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
