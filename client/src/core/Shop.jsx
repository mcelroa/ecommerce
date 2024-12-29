import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getCategories } from "../admin/requests";
import Checkbox from "./Checkbox";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title="Shop"
      description="e-commerce shop page"
      className="container"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by category</h4>
          <ul>
            <Checkbox categories={categories} />
          </ul>
        </div>
        <div className="col-8"></div>
      </div>
    </Layout>
  );
};

export default Shop;
