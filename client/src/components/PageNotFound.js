import { NavLink } from "react-router-dom";
import "../App.css";

const PageNotFound = () => {
  return (
    <>
      <div className="page-not-found-div">
        <h1>Sorry, page not found.</h1>
        <h5>404 Error</h5>

        <div>
          <NavLink to="/" className="pagenotfound-btn text-decoration-none">
            <i className="zmdi zmdi-arrow-left"></i> &nbsp;Go Back
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
