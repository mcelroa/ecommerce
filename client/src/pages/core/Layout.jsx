import PropTypes from "prop-types";
import Menu from "./Menu";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => {
  return (
    <div>
      <Menu />
      <div className="container py-5">
        <div className="row">
          <div className="col text-center">
            <h1 className="display-4">{title}</h1>
            <p className="lead">{description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <div className={className}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for validation
Layout.propTypes = {
  title: PropTypes.string, // Ensures 'title' is a string
  description: PropTypes.string, // Ensures 'description' is a string
  className: PropTypes.string, // Ensures 'className' is a string
  children: PropTypes.node, // Ensures 'children' can be any renderable content
};

export default Layout;
