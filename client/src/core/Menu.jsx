import { Link, useLocation, useNavigate } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

const isActive = (location, path) => {
  return location.pathname === path
    ? { color: "#00FF57" }
    : { color: "#ffffff" };
};

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
            style={isActive(location, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(location, "/user/dashboard")}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(location, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <>
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
          </>
        )}

        {isAuthenticated() && (
          <div>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "red" }}
                onClick={() =>
                  signout(() => {
                    navigate("/");
                  })
                }
              >
                Signout
              </span>
            </li>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Menu;
