import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import SentionTitle from "./../../components/SentionTitle";
import { toast } from "react-toastify";
import axios from "axios";

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
  const handleDelivery = (e) => {
    e.preventDefault();
    const orderedQuantity = parseInt(e.target.inputqquantity.value);
    if (
      orderedQuantity >= minimum_order_quantity &&
      orderedQuantity <= available_quantity
    ) {
      const newQuantity = parseInt(available_quantity) - orderedQuantity;
      const quantity = { newQuantity };
      async function GoDeliver() {
        const { data } = await axios.post(
          `http://localhost:5000/product/${id}`,
          quantity
        );
        if (data?.success) {
          toast.success(data?.message);
        }
      }
      GoDeliver();
      refetch();
    } else {
      toast.error("Maintain minimum order and available quantity");
    }
  };
  return (
    <div>
      <SentionTitle>Buy Our Products</SentionTitle>
      {/* <h1 className="text-center text-3xl"> </h1> */}
      <div class="card lg:card-side bg-base-100 shadow-xl m-5 md:w-5/6 md:mx-auto">
        <figure>
          <img src={image} className="h-full" alt="Album" />
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
            <form onSubmit={handleDelivery}>
              <div class="form-control">
                <label class="label">
                  <span class="label-text">Enter SQF</span>
                </label>
                <label class="input-group">
                  <input
                    name="inputqquantity"
                    type="text"
                    placeholder="Minimum 50 SQF"
                    class="input input-bordered"
                    required
                  />
                  <input
                    type="submit"
                    value="Order"
                    className="bg-primary text-white cursor-pointer px-4"
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
