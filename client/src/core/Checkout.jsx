import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import { getBraintreeClientToken, processPayment } from "./requests";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { emptyCart } from "./cartHelpers";

const Checkout = ({ products, setRun }) => {
  const [data, setData] = useState({
    success: false,
    error: "",
    clientToken: null,
    instance: null,
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData((prevState) => ({ ...prevState, error: data.error }));
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, [userId, token]);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to check out</button>
      </Link>
    );
  };

  const pay = () => {
    if (data.instance) {
      data.instance
        .requestPaymentMethod()
        .then((response) => {
          const nonce = response.nonce;

          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getTotal(),
          };

          processPayment(userId, token, paymentData)
            .then((response) => {
              setData({ ...data, success: response.success });
              emptyCart();
              setRun((prevRun) => !prevRun);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("drop in error...", error);
          setData((prevState) => ({ ...prevState, error: error.message }));
        });
    }
  };

  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: "" })}>
        {data.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{
                authorization: data.clientToken,
                paypal: {
                  flow: "vault",
                },
              }}
              onInstance={(instance) =>
                setData((prevState) => ({ ...prevState, instance }))
              }
            />
            <button onClick={pay} className="btn btn-success d-block w-100">
              Pay
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <h4>Total: €{getTotal()}</h4>
      {data.error && <div className="alert alert-danger">{data.error}</div>}
      {data.success && (
        <div className="alert alert-info">Payment made successfully</div>
      )}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
