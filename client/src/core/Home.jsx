import { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./requests";
import Card from "./Card";

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
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, i) => {
          return <Card key={i} product={product} />;
        })}
      </div>

      <hr />
      <div className="row">
        <h2 className="mb-4">New Arrivals</h2>
        {productsByArrival.map((product, i) => {
          return <Card key={i} product={product} />;
        })}
      </div>
    </Layout>
  );
};

export default Home;
