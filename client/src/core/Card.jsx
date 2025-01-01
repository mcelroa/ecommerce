import React from "react";
import { Link } from "react-router-dom";
import CardImage from "./CardImage";

const Card = ({ product }) => {
  return (
    <div className="col-4 mb-2">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body">
          <CardImage item={product} url="product" />
          <p>{product.description.substring(0, 20)}</p>
          <p>€{product.price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-warning mt-2 mb-2">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
