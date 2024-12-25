import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { isAuthenticated } from ".";

const AdminRoute = ({ children }) => {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
};

// Prop validation
AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
