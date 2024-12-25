import { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { createProduct, getCategories } from "./requests";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    success: false,
    createdProduct: "",
    redirectToProfile: false,
    formData: null,
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    loading,
    error,
    success,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.err) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value, error: "", success: false });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", success: false, loading: true });

    createProduct(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, success: false, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          loading: false,
          success: true,
          error: "",
          createdProduct: data.result.name,
        });
      }
    });
  };

  const newPostForm = () => {
    return (
      <form className="mb-3" onSubmit={handleSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange("description")}
            className="form-control"
            value={description}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            onChange={handleChange("price")}
            type="number"
            className="form-control"
            value={price}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            onChange={handleChange("quantity")}
            type="number"
            className="form-control"
            value={quantity}
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange("category")} className="form-control">
            <option>-- Select Category --</option>
            {categories &&
              categories.map((c) => {
                return (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                );
              })}
          </select>
        </div>

        <button className="btn btn-outline-primary mt-2">Create Product</button>
      </form>
    );
  };

  return (
    <div>
      <Layout
        title="Create Product"
        description="Add a new product here"
        className="container-fluid"
      >
        {loading && <div className="alert alert-info">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">
            {createdProduct} was created!
          </div>
        )}
        {newPostForm()}
      </Layout>
    </div>
  );
};

export default CreateProduct;
