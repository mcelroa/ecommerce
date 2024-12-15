import { Link, useLocation } from "react-router-dom";

const isActive = (location, path) => {
  return location.pathname === path
    ? { color: "#00FF57" }
    : { color: "#ffffff" };
};

const Menu = () => {
  const location = useLocation();

  return (
    <div>
      <ul className="nav nav-tabs" style={{ backgroundColor: "#5a00ff" }}>
        <li className="nav-item">
          <Link className="nav-link" style={isActive(location, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(location, "/signup")}
            to="/signup"
          >
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(location, "/signin")}
            to="/signin"
          >
            Signin
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
