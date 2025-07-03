import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./EditProfile.css";

const EditProfile = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    academicYear: ""
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/users/${userId}`)
      .then((res) => {
        const user = res.data;
        setFormData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
          academicYear: user.academicYear.toString()
        });
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8081/api/users/${userId}`, formData)
      .then(() => {
        setMessage("Profile updated successfully ✅");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        setMessage("Update failed ❌");
      });
  };

  return (
    <>
      <Navbar />
      <div className="edit-profile-page">
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
          <select name="academicYear" value={formData.academicYear} onChange={handleChange} required>
            <option value="">Select Academic Year</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button type="submit">Update</button>
          {message && <p className={`message ${message.includes("success") ? "success" : "error"}`}>{message}</p>}
        </form>
      </div>
    </>
  );
};

export default EditProfile;
