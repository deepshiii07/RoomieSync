import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">RoommateApp</div>
      <div className="navbar-links">
        <Link to="/my-profile" className="font-bold hover:underline">
          My Profile
        </Link>
        <Link to="/dashboard">Dashboard</Link>

        {currentPath !== "/edit-profile" && (
          <Link to="/edit-profile">Edit Profile</Link>
        )}
        {currentPath !== "/set-preferences" && (
          <Link to="/set-preferences">Set Preferences</Link>
        )}
        {currentPath !== "/match" && (
          <Link to="/match">Match Roommates</Link>
        )}

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
