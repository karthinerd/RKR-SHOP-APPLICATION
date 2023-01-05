import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <div className="shopName">RKR SHOP</div>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="sign">
              <Link className="btn btn-outline-dark" to="/signup">
                SignUp
              </Link>
            </div>
            <Link className="btn btn-outline-light" to="/login">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavBar;
