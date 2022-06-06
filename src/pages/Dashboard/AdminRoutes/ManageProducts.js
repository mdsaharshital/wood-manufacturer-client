import React, { useState } from "react";
import DeleteModal from "../../../components/DeleteModal";
import DeleteProduct from "../../../components/DeleteProduct";
import SentionTitle from "../../../components/SentionTitle";
import useProducts from "../../../hooks/useProducts";
import { useQuery } from "react-query";
import Loading from "../../shared/Loading";

const ManageProducts = () => {
  // const [products] = useProducts();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery("products", () =>
    fetch("https://hidden-crag-61724.herokuapp.com/products").then((res) =>
      res.json()
    )
  );

  const [isModalOpen, setIsModalOpen] = useState(null);
  if (isLoading) return <Loading />;
  const handleDeleteProduct = (id) => {
    setIsModalOpen(id);
  };
  return (
    <div>
      <SentionTitle>Manage Products</SentionTitle>
      <div className="overflow-x-auto m-3 mb-10">
        <table className="table table-zebra w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Available Quantity</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {products.map((product, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.available_quantity}</td>
                <td>
                  <label
                    htmlFor="my-modal-7"
                    onClick={() => handleDeleteProduct(product._id)}
                    className="btn btn-xs btn-error rounded-none"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <DeleteProduct
            refetch={refetch}
            setIsModalOpen={setIsModalOpen}
            product={isModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
