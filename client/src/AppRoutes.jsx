import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/user/Signin";
import Signup from "./pages/user/Signup";
import Home from "./pages/core/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
