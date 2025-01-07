import { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./requests";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout
      title="Home"
      description="e-commerce full stack app"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => {
          return (
            <div key={i} className="col-4 mb-2">
              <Card product={product} />
            </div>
          );
        })}
      </div>

      <hr />
      <div className="row">
        <h2 className="mb-4">New Arrivals</h2>
        {productsByArrival.map((product, i) => {
          return (
            <div key={i} className="col-4 mb-2">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Home;
