import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getSingleProduct, listRelated } from "./requests";
import { useParams } from "react-router-dom";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);
  const { productId } = useParams();

  const loadSingleProduct = (productId) => {
    getSingleProduct(productId)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProduct(data);
          // fetch related products
          listRelated(data._id).then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setRelatedProducts(data);
            }
          });
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    loadSingleProduct(productId);
  }, [productId]);

  return (
    <Layout
      title={product && product.name}
      description={product && product.description}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Products</h4>
          {relatedProducts.map((p, i) => (
            <div className="mb-3" key={i}>
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
