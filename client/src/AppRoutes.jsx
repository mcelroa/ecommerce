import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./user/Signin";
import Signup from "./user/Signup";
import Dashboard from "./user/Dashboard";
import AdminDashboard from "./user/AdminDashboard";

import Home from "./core/Home";
import Shop from "./core/Shop";

import AdminRoute from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoute";

import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/create/category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/create/product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
