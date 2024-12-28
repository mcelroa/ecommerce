import { Navigate } from "react-router-dom";
import { isAuthenticated } from ".";

const AdminRoute = ({ children }) => {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    children
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default AdminRoute;
