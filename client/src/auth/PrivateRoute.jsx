import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated } from ".";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

// Prop validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
