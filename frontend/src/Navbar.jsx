import React, { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import "./App.css";

function Navbar({ user }) {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (!user) {
      setStatus(false);
    }
    setStatus(true);
  }, []);
  return (
    <nav
      className="navbar navbar-expand-lg py-3 px-5 bg-white"
      id="nav"
      style={{
        boxShadow: "0 0 5px gray",
        position: "sticky",
        top: "0px",
        zIndex: "999",
      }}
    >
      {/* Logo */}
      <NavLink className="navbar-brand text-dark fw-bold" to="/">
        <h3 className="mb-0">
          <em>fiama</em>
        </h3>
      </NavLink>

      {/* Mobile Button */}
      <button
        className="navbar-toggler bg-light"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navigation */}
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav gap-3">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/shop" className="nav-link">
              Shop
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/contact" className="nav-link">
              Contact
            </NavLink>
          </li>

          <li className="nav-item">
            {status ? (
              <NavLink to="/profile" className="nav-link">
                Welcome, {user.name}
              </NavLink>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
