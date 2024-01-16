import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.jpg";
import { useContext } from "react";
import { UserContext } from "../App";

const Navbar = () => {
  // we only need value of state
  const { state } = useContext(UserContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Logo" height="50px" />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            {/* hide Login and Register if user is logged in */}
            <li className={`nav-item ${state ? "d-none" : "d-block"}`}>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>

            <li className={`nav-item ${state ? "d-none" : "d-block"}`}>
              <NavLink className="nav-link" to="/signup">
                Register
              </NavLink>
            </li>

            {/* hide  Logout if user is logged out */}
            <li className={`nav-item ${state ? "d-block" : "d-none"}`}>
              <NavLink className="nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
