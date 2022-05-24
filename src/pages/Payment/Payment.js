import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import SentionTitle from "../../components/SentionTitle";
import Loading from "../shared/Loading";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["products", id], () =>
    fetch(`http://localhost:5000/myorders/${id}`).then((res) => res.json())
  );
  if (isLoading) return <Loading />;

  const { name, estimatedPrice, orderedQuantity } = data;
  const stripePromise = loadStripe(`${process.env.REACT_APP_PAYMENT_KEY}`);
  return (
    <div>
      <SentionTitle>Pay Now for: {name}</SentionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-items-center">
        <div className="the-card">
          <h1>Price: ${estimatedPrice}</h1>
          <h1>Ordered Quantity: {orderedQuantity}</h1>
        </div>
        <div className="the-card">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
