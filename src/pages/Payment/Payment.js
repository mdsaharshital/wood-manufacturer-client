import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import SentionTitle from "../../components/SentionTitle";
import Loading from "../shared/Loading";

const Payment = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useQuery(["products", id], () =>
    fetch(`http://localhost:5000/myorders/${id}`).then((res) => res.json())
  );
  if (isLoading) return <Loading />;

  const { name, estimatedPrice, orderedQuantity } = data;
  return (
    <div>
      <SentionTitle>Pay Now for: {name}</SentionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-items-center">
        <div className="the-card">
          <h1>Price: ${estimatedPrice}</h1>
          <h1>Ordered Quantity: {orderedQuantity}</h1>
        </div>
        <div className="the-card">
          <h1>Price: ${estimatedPrice}</h1>
          <h1>Ordered Quantity: {orderedQuantity}</h1>
        </div>
      </div>
    </div>
  );
};

export default Payment;
