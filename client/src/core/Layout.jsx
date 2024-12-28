import Menu from "./Menu";
import "../styles.css";

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
        <div className="row mb-3">
          <div className="col text-center page-header">
            <h1 className="display-4 mt-3">{title}</h1>
            <p className="lead">{description}</p>
          </div>
        </div>

        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
