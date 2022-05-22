import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    _id,
    name,
    price,
    minimum_order_quantity,
    available_quantity,
    categories,
    description,
    image,
  } = product;
  return (
    <div className="mx-auto my-3">
      <div className=" thecard">
        <div className="thefront">
          <img src={image} alt="" />
        </div>

        <div className="theback">
          <h3 className="mb-2 font-medium">{name}</h3>
          <p>Price: ${price}/SQF</p>
          <p>Quantity: {available_quantity}</p>
          <p>Categories : {categories}</p>
          <p className="my-3">
            <small>
              {description.slice(0, 200)}
              <Link className="font-bold" to={`/product/${_id}`}>
                ...read more
              </Link>
            </small>
          </p>
          <button
            onClick={() => navigate(`/product/${_id}`)}
            className="btn btn-primary text-white rounded-none"
          >
            Stock update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
