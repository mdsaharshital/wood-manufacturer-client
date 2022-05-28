import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import auth from "../../firebase.init";
import Loading from "../shared/Loading";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import SentionTitle from "../../components/SentionTitle";

const MyOrders = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [product, setProduct] = useState("");
  const [user] = useAuthState(auth);
  const { data, isLoading, refetch } = useQuery(["products", user?.email], () =>
    fetch(
      `https://hidden-crag-61724.herokuapp.com/myorders?email=${user?.email}`,
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
  if (isLoading) return <Loading />;
  const handleHasProduct = (pro) => {
    setProduct(pro);
    setIsModalOpen(data);
  };
  return (
    <div className="p-4">
      <SentionTitle>My orders: {data.length}</SentionTitle>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {data.map((product, index) => (
              <tr key={index}>
                <th>1</th>
                <td>{product.name}</td>
                <td>{product.estimatedPrice}</td>
                <td>{product.orderedQuantity}</td>

                <td>
                  {product.status === "pending" ? (
                    <>
                      <Link
                        to={`/payment/${product._id}`}
                        className="text-error"
                      >
                        Pay Now
                      </Link>
                      <label
                        onClick={() => handleHasProduct(product)}
                        htmlFor="my-modal-6"
                        className="text-success cursor-pointer ml-3"
                      >
                        Cancel
                      </label>
                    </>
                  ) : (
                    <span className="text-success">{product.status}</span>
                  )}
                </td>
                {product?.paid && (
                  <td>
                    {" "}
                    <small className="text-primary ml-3">
                      {product.transactionId}
                    </small>
                  </td>
                )}
              </tr>
            ))}
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
