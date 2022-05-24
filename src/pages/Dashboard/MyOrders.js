import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import auth from "../../firebase.init";
import Loading from "../shared/Loading";

const MyOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [product, setProduct] = useState("");
  const [user] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery(["products", user?.email], () =>
    fetch(`http://localhost:5000/myorders?email=${user?.email}`).then((res) =>
      res.json()
    )
  );
  if (isLoading) return <Loading />;
  const handleHasProduct = (pro) => {
    setProduct(pro);
    setIsModalOpen(data);
  };
  return (
    <div className="p-4">
      <h1 className="text-xl">My orders: {data.length}</h1>
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {data.map(
              (
                { _id, name, estimatedPrice, orderedQuantity, status },
                index
              ) => (
                <tr key={index}>
                  <th>1</th>
                  <td>{name}</td>
                  <td>{estimatedPrice}</td>
                  <td>{orderedQuantity}</td>
                  <td>
                    {status === "pending" ? (
                      <>
                        <Link to="/payment" className="text-error">
                          {status}
                        </Link>
                        <label
                          onClick={() => handleHasProduct({ _id, name })}
                          for="my-modal-6"
                          class="text-success cursor-pointer ml-3"
                        >
                          Cancel
                        </label>
                      </>
                    ) : (
                      <span className="text-success">{status}</span>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
          {isModalOpen && (
            <DeleteModal
              refetch={refetch}
              setIsModalOpen={setIsModalOpen}
              product={product}
            />
          )}
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
