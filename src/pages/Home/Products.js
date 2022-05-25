import React, { useState } from "react";
import SentionTitle from "../../components/SentionTitle";
import useProducts from "./../../hooks/useProducts";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products] = useProducts();
  const [sixShow, setSixShow] = useState(6);
  console.log(products.length);
  return (
    <div className="my-10">
      <SentionTitle>Our Products</SentionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {products
          .map((product) => <ProductCard key={product._id} product={product} />)
          .slice(0, sixShow)}
      </div>
      {sixShow === 6 && (
        <h1
          onClick={() => setSixShow(products.length)}
          className="text-right font-medium mr-24 mt-4 cursor-pointer"
        >
          see more....
        </h1>
      )}
      {sixShow === products.length && (
        <h1
          onClick={() => setSixShow(6)}
          className="text-right font-medium mr-24 mt-4 cursor-pointer"
        >
          see less
        </h1>
      )}
    </div>
  );
};

export default Products;
