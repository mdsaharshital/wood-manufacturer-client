import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import SentionTitle from "./../../components/SentionTitle";
import Loading from "../shared/Loading";
import OrderNowModal from "../../components/OrderNowModal";

const ProductDetails = () => {
  const [hasProduct, setHasProduct] = useState(null);
  const { id } = useParams();
  const { data, isLoading, refetch } = useQuery(["products", id], () =>
    fetch(
      `https://wood-manufacturer-server-production.up.railway.app/product/${id}`
    ).then((res) => res.json())
  );

  if (isLoading) return <Loading />;
  const {
    name,
    price,
    minimum_order_quantity,
    available_quantity,
    categories,
    description,
    image,
  } = data;
  const handleHasProduct = () => {
    setHasProduct(data);
  };

  return (
    <div>
      <SentionTitle>Buy Our Products</SentionTitle>

      <div className="card lg:card-side bg-base-100 shadow-xl m-5 md:w-5/6 md:mx-auto">
        <figure>
          <img src={image} className="h-full" alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
          <p className="m-0 p-0">Price: ${price}/Sq Feet</p>
          <p className="">Minimum Order Quantity: {minimum_order_quantity}</p>
          <p className="">Available Quantity: {available_quantity}</p>
          <p>
            <small>Descrition: {description}</small>
          </p>
          <p>
            <small>
              Categories: <span className="text-primary">{categories}</span>
            </small>
          </p>
          <div className="card-actions mt-4 justify-center lg:justify-end ">
            <div className="form-control">
              <label
                onClick={handleHasProduct}
                htmlFor="order-now-modal"
                className="btn btn-primary text-white rounded-none"
              >
                Order Now
              </label>
              {hasProduct && (
                <OrderNowModal
                  productDetails={data}
                  refetch={refetch}
                  setHasProduct={setHasProduct}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
