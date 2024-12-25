import { useState } from "react";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { createCategory } from "./requests";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError(false);
    setSuccess(false);
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    createCategory(user._id, token, name).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setSuccess(true);
      }
    });
  };

  const createCategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange}
            autoFocus
            required
          />
        </div>
        <button className="btn btn-outline-primary">Create Category</button>
      </form>
    );
  };

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="text-danger">
          Back to dashboard
        </Link>
      </div>
    );
  };

  return (
    <div>
      <Layout
        title="Create Category"
        description="Add a new category here"
        className="container-fluid"
      >
        <div className="row">
          <div className="col-8 offset-2">
            {success && (
              <div className="alert alert-success">
                Category {name} created successfully
              </div>
            )}
            {error && (
              <div className="alert alert-danger">
                Category name should be unique
              </div>
            )}
            {createCategoryForm()}
            {goBack()}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreateCategory;
