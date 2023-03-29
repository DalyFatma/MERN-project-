import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../../Redux/actions/actionsUser/actionsUser";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function Navbar() {
  const user = useSelector((state) => state.userReducer.currentUser);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const settings = ["logout"];
  const settingsGuest = [
    <Link className="nav-link" to="/signup" key="signup">
      Sign Up
    </Link>,
    <Link className="nav-link" to="/login" key="login">
      Login
    </Link>,
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark nav-dashboard">
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/dashboard">
          BeautyHub
        </Link>
        <button
          className="navbar-toggler dropbtn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse flex-item"
          id="navbarNavDarkDropdown"
        >
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                to="/dashboard/skincare"
                className="nav-link togglemenu"
                id="navbarDarkDropdownMenuLink"
                role="button"
                aria-expanded="false"
              >
                SKIN
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                to="/dashboard/mekeup"
                className="nav-link togglemenu"
                id="navbarDarkDropdownMenuLink"
                role="button"
                aria-expanded="false"
              >
                MAKEUP
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link
                to="/dashboard/nails"
                className="nav-link togglemenu"
                id="navbarDarkDropdownMenuLink"
                role="button"
                aria-expanded="false"
              >
                NAILS
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown ">
              <Link
                to="/dashboard/hair"
                className="nav-link togglemenu"
                id="navbarDarkDropdownMenuLink"
                role="button"
                aria-expanded="false"
              >
                HAIR
              </Link>
            </li>
          </ul>
          {user && (user.role === "admin" || user.role === "superAdmin") && (
            <Link to="/admin">
              <button className="btn-getusers">
                <i className="fa fa-users icon-color iconuser" /> Get all users
              </button>
            </Link>
          )}

          <Link to="/" className="btn btn-info btn-sm btn-logout">
            <span className="glyphicon glyphicon-log-out" />
            {token
              ? settings.map((setting) =>
                  setting === "logout" ? (
                    <li className="nav-item" key={setting}>
                      <Link
                        to="/login"
                        className="nav-link"
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item" key={setting}>
                      <a href="#" className="nav-link">
                        {setting}
                      </a>
                    </li>
                  )
                )
              : settingsGuest.map((setting) => (
                  <li className="nav-item" key={setting.key}>
                    {setting}
                  </li>
                ))}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
