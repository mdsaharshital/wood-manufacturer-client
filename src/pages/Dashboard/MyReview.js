import React, { useState } from "react";
import SentionTitle from "./../../components/SentionTitle";
import { FaRegEdit } from "react-icons/fa";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./../../firebase.init";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";
import axios from "axios";

const MyReview = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [ratings, setRatings] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [product, setProduct] = useState([]);
  const [user] = useAuthState(auth);
  const { register, handleSubmit, reset } = useForm();
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const { data, isLoading, refetch } = useQuery(
    ["myproducts", user?.email],
    () =>
      fetch(
        `https://wood-manufacturer-server-production.up.railway.app/myorders?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ).then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          return toast.error("Unauthentic user");
        }
        return res.json();
      })
  );

  const onSubmit = async (data) => {
    console.log(data);
    const {
      displayName,
      email,
      photoURL,
      name,
      estimatedPrice,
      orderedQuantity,
      status,
    } = product;
    //
    const newReview = {
      ...data,
      displayName,
      email,
      photoURL,
      name,
      estimatedPrice,
      orderedQuantity,
      status,
    };
    const { data: update } = await axios.post(
      "https://wood-manufacturer-server-production.up.railway.app/addreview",
      newReview,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    setIsEdit(!isEdit);
    console.log(update);
    if (update.acknowledged) {
      toast.success("Review posted");
      reset();
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="py-10">
      <SentionTitle>My Review</SentionTitle>
      <h1 className="text-center my-4">
        You will see only those product you got shipped.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-items-center my-5">
        {data.map((pro, index) => {
          return (
            pro.status === "shipped" && (
              <div
                key={index}
                onClick={() => {
                  console.log(pro);
                  setProduct(pro);
                  setIsSelected(!isSelected);
                }}
                className={`card w-64 bg-base-100 shadow-xl image-full ${
                  isSelected &&
                  product._id === pro._id &&
                  "border-2 border-slate-900"
                }`}
              >
                <figure>
                  <img src={pro.photoURL} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{pro.name}</h2>
                  <p className="m-0 p-0">Quantity: {pro.orderedQuantity}</p>
                  <p>Price: ${pro.estimatedPrice}</p>
                </div>
              </div>
            )
          );
        })}
      </div>
      <h1 className="text-center my-4">
        Select the product first you want to give review
      </h1>
      <div className="w-full md:w-3/5 mx-auto my-10 full-form">
        <div className="flex justify-between">
          {" "}
          <h1>Share your experience with everyone </h1>
          {isEdit && isSelected ? (
            <div className="flex">
              {ratings < 6 && (
                <GiConfirmed
                  onClick={handleSubmit(onSubmit)}
                  className="text-xl mr-3"
                />
              )}
              <GiCancel className="text-xl" onClick={handleEdit} />
            </div>
          ) : (
            isSelected && <FaRegEdit className="text-xl" onClick={handleEdit} />
          )}
        </div>
        <form className="w-full my-2">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="review_ratings"
              id="floating_minimum_order_quantity"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer max-w-xs"
              placeholder=" "
              required
              onInput={(e) => {
                let rate = parseInt(e.target.value);
                setRatings(rate);
              }}
              disabled={!isEdit}
              {...register("review_ratings", {
                required: {
                  value: true,
                  message: "Ratings is Required",
                },
              })}
            />
            <label
              htmlFor="floating_minimum_order_quantity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ratings(out of 5)
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="review_description"
              id="floating_minimum_order_quantity"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent  border-b-2 border-gray-300 appearance-none   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer max-w-xs"
              placeholder=" "
              required
              disabled={!isEdit}
              {...register("review_description", {
                required: {
                  value: true,
                  message: "Description is Required",
                },
              })}
            />
            <label
              htmlFor="floating_minimum_order_quantity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Share your experience
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyReview;
