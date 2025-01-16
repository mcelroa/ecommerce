import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  // const [cartSize, setCartSize] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h4>Your cart has {`${items.length}`} items</h4>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h4>
      Your Cart is empty. <br />
      <Link to="/shop"> Continue shopping. </Link>
    </h4>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Checkout now!"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h4 className="mb-4">Your cart summary</h4>
          <hr />
          <Checkout products={items} setRun={setRun} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
