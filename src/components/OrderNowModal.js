import axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const OrderNowModal = (props) => {
  const { productDetails, refetch, setHasProduct } = props;
  const [estimatedPrice, setEestimatedPrice] = useState(0);
  const [minimumOrder, setMinimumOrder] = useState(0);

  const [user] = useAuthState(auth);
  console.log(user);
  const { _id, name, price, minimum_order_quantity, available_quantity } =
    productDetails;
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
          `http://localhost:5000/product/${_id}`,
          quantity
        );
        if (data?.success) {
          refetch();
          toast.success(data?.message);
        }
      }
      async function UserInfo() {
        const { displayName, email, photoURL } = user;
        const userOrderInfo = {
          displayName,
          email,
          photoURL,
          name,
          estimatedPrice,
          orderedQuantity,
          status: "pending",
        };
        const { data: info } = await axios.post(
          `http://localhost:5000/orderInfo`,
          userOrderInfo
        );
      }
      UserInfo();
      GoDeliver();
      setHasProduct(null);
    } else {
      toast.error("Maintain minimum order and available quantity");
    }
  };
  return (
    <div>
      <input type="checkbox" id="order-now-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <label
            htmlFor="order-now-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg">Product Name : {name}</h3>
          <form
            onSubmit={handleDelivery}
            className="mt-10 grid grid-cols-1 justify-items-center gap-3"
          >
            <input
              type="text"
              name="name"
              value={user?.displayName}
              disabled
              placeholder="Your name"
              className="input rounded-none input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              name="email"
              value={user?.email}
              disabled
              placeholder="Email Address"
              className="input rounded-none input-bordered w-full max-w-xs"
            />
            <input
              name="inputqquantity"
              type="text"
              placeholder="Order Minimum 50 Square Feet"
              className="input rounded-none input-bordered w-full max-w-xs"
              required
              onChange={(e) => {
                const newPrice = parseInt(e.target.value) * price;
                setEestimatedPrice(newPrice);
                setMinimumOrder(parseInt(e.target.value));
              }}
            />
            <input
              type="number"
              name="estimatdPrice"
              value={estimatedPrice || ""}
              disabled
              placeholder="Estimated Price"
              className="input rounded-none input-bordered w-full max-w-xs"
            />
            <input
              disabled={minimumOrder < 50 || isNaN(minimumOrder)}
              type="submit"
              value="Place Order"
              className="btn btn-primary rounded-none text-white w-full max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderNowModal;
