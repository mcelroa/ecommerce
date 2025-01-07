import React from "react";
import { Link } from "react-router-dom";
import CardImage from "./CardImage";
import moment from "moment";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
}) => {
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge bg-success">In Stock</span>
    ) : (
      <span className="badge bg-danger">Out of Stock</span>
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        <CardImage item={product} url="product" />
        <p className="lead">{product.description.substring(0, 50)}</p>
        <p className="black-10">€{product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">Added {moment(product.createdAt).fromNow()}</p>

        {showStock(product.quantity)}
        <br />
        <Link to={`/product/${product._id}`}>
          {showViewProductButton && (
            <button className="btn btn-outline-primary m-2 ms-0">
              View Product
            </button>
          )}
        </Link>
        {showAddToCartButton && (
          <button className="btn btn-outline-primary m-2 ms-0">
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
