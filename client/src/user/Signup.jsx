import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (field) => (event) => {
    setValues({ ...values, error: "", [field]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await signup({ name, email, password });

      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    } catch (error) {
      console.error("Catch block of clickSubmit: ", error);
    }
  };

  const signupForm = () => {
    return (
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            onChange={handleChange("name")}
            value={name}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            onChange={handleChange("password")}
            value={password}
            type="password"
            className="form-control"
          />
        </div>
        <button onClick={clickSubmit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };

  return (
    <Layout
      title="Signup"
      description="Signup for the ecommerce app here"
      className="container col-8"
    >
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          Account created! Please <Link to="/signin">Sign In</Link>
        </div>
      )}
      {signupForm()}
    </Layout>
  );
};

export default Signup;
