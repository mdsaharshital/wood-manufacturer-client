import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SentionTitle from "../../../components/SentionTitle";
import auth from "../../../firebase.init";
import Loading from "../../shared/Loading";

const ManageAllOrders = () => {
  const [getUser] = useAuthState(auth);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery("users", () =>
    fetch("https://hidden-crag-61724.herokuapp.com/orders", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        navigate("/signin");
        return toast.error("Unauthentic user");
      }
      return res.json();
    })
  );
  if (isLoading) return <Loading />;
  //
  const handleOrder = async (id) => {
    console.log(id);
    fetch(`https://hidden-crag-61724.herokuapp.com/orders/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 403) {
          toast.error("Can't perfome this action");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Product has been shipped");
        }
      });
  };
  return (
    <div>
      <SentionTitle>Manage all orders</SentionTitle>
      <div className="overflow-x-auto p-3">
        <table className="table table-zebra w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Bill</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {data.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.orderedQuantity}</td>
                <td>${user.estimatedPrice}</td>
                <td>
                  {user.paid === true ? (
                    <>
                      <span className="bg-green-400 rounded-full text-white py-1 px-2 mr-2">
                        {user.status}
                      </span>
                    </>
                  ) : (
                    <span className="bg-red-400 rounded-full text-white py-1 px-2">
                      unpaid
                    </span>
                  )}
                  {user.paid === true && user.status !== "shipped" && (
                    <button
                      onClick={() => handleOrder(user?._id)}
                      className="btn btn-sm btn-primary text-white rounded-none"
                    >
                      Make Ship
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAllOrders;
