import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <nav className="dashboard-navbar">
        <ul>
          <li onClick={() => navigate("/my-profile")}>My Profile</li>
          <li onClick={() => navigate("/edit-profile")}>Edit Profile</li>
          <li onClick={() => navigate("/set-preferences")}>Set Preferences</li>
          <li
            onClick={() => {
              localStorage.removeItem("userId");
              navigate("/login");
            }}
            className="logout-link"
          >
            Logout
          </li>
          <li
            onClick={async () => {
              const confirmDelete = window.confirm("Are you sure you want to delete your account?");
              if (!confirmDelete) return;

              try {
                const userId = localStorage.getItem("userId");
                await fetch(`https://roommate-backend-production.up.railway.app/api/users/${userId}`, {
                  method: "DELETE"
                });
                localStorage.removeItem("userId");
                navigate("/register");
              } catch (error) {
                console.error("Error deleting account:", error);
                alert("Something went wrong. Try again.");
              }
            }}
            className="delete-link"
          >
            Delete Account
          </li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome to your Dashboard 🎉</h1>
          <p>Ready to find your perfect roommate match?</p>
          <button className="match-btn" onClick={() => navigate("/match")}>
            Match Roommates
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
