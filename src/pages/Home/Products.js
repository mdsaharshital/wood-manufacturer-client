import React from "react";
import SentionTitle from "../../components/SentionTitle";
import useProducts from "./../../hooks/useProducts";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products] = useProducts();
  return (
    <div className="my-10">
      <SentionTitle>Our Products</SentionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {products
          .map((product) => <ProductCard key={product._id} product={product} />)
          .slice(0, 6)}
      </div>
    </div>
  );
};

export default Products;
