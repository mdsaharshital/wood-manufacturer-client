import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import SentionTitle from "./../../components/SentionTitle";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useQuery(["products", id], () =>
    fetch(`http://localhost:5000/product/${id}`).then((res) => res.json())
  );
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  const {
    _id,
    name,
    price,
    minimum_order_quantity,
    available_quantity,
    categories,
    description,
    image,
  } = data;
  console.log(name);
  return (
    <div>
      <SentionTitle>Buy Our Products</SentionTitle>
      {/* <h1 className="text-center text-3xl"> </h1> */}
      <div class="card lg:card-side bg-base-100 shadow-xl m-5 md:w-5/6 md:mx-auto">
        <figure>
          <img src={image} alt="Album" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{name}</h2>
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
          <div class="card-actions mt-4 justify-center lg:justify-end ">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Enter SQF</span>
              </label>
              <label class="input-group">
                <input
                  type="text"
                  placeholder="Minimum 10SQF"
                  class="input input-bordered"
                />
                <span className="bg-primary text-white ">Order</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
