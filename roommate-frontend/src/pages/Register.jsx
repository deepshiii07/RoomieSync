import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // 🔗 Link the new CSS

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    location: "",
    phone: "",
    academicYear: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      location: formData.location,
      phone: formData.phone,
      academicYear: Number(formData.academicYear)
    };

    try {
      const res = await axios.post("http://localhost:8081/api/users/register", userData);
      setMessage("Registration successful! ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Error:", err);
      setMessage("Registration failed ❌. Check console.");
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Other">Other</option>
        </select>

        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />

        <select name="academicYear" value={formData.academicYear} onChange={handleChange} required>
          <option value="">Select Academic Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <button type="submit" className="register-button">Register</button>
        <p className="register-message">{message}</p>
        <p className="login-redirect">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} className="login-link">
        Login now
        </span>
        </p>

      </form>
    </div>
  );
};

export default Register;
