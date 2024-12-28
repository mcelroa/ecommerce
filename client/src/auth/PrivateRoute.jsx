import { Navigate } from "react-router-dom";
import { isAuthenticated } from ".";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
