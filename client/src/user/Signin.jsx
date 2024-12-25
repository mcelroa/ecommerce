import { useState } from "react";
import { Navigate } from "react-router-dom";
import Layout from "../core/Layout";
import { authenticate, signin, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "adamj@gmail.com",
    password: "aaaaaa9",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (field) => (event) => {
    setValues({ ...values, error: "", [field]: event.target.value });
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    try {
      const data = await signin({ email, password });

      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    } catch (error) {
      console.error("Catch block of clickSubmit: ", error);
    }
  };

  const signinForm = () => {
    return (
      <form>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input
            onChange={handleChange("email")}
            value={email}
            type="email"
            className="form-control"
          />
        </div>
        <div className="mb-2">
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

  const redirectUser = () => {
    if (redirectToReferrer) {
      return user.role === 1 ? (
        <Navigate to="/admin/dashboard" />
      ) : (
        <Navigate to="/user/dashboard" />
      );
    }
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
    return null;
  };

  return (
    <Layout
      title="Signin"
      description="Signin to the ecommerce app here"
      className="container col-8"
    >
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading...</div>}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
