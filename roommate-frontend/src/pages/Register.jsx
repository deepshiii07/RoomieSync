import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", gender: "", location: "", phone: "" });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await axios.post(`${API_BASE_URL}/api/users/register`, formData);
      setMessage("Account created. Taking you to login…");
      setTimeout(() => navigate("/login"), 900);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed. Please check your details and try again.");
    } finally {
      setSaving(false);
    }
  };

  return <main className="register-page"><form className="register-form" onSubmit={handleSubmit}>
    <p className="eyebrow">ROOMIESYNC</p><h1>Find a place to feel at home.</h1>
    <p className="form-intro">Create your profile to meet compatible people in your city.</p>
    <label htmlFor="name">Full name</label><input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
    <label htmlFor="email">Email</label><input id="email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
    <label htmlFor="password">Password</label><input id="password" type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} minLength="8" required />
    <label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" placeholder="Phone number" value={formData.phone} onChange={handleChange} required />
    <label htmlFor="location">Current city</label><input id="location" name="location" placeholder="e.g. Bengaluru" value={formData.location} onChange={handleChange} required />
    <label htmlFor="gender">Gender</label><select id="gender" name="gender" value={formData.gender} onChange={handleChange} required><option value="">Select gender</option><option>Female</option><option>Male</option><option>Other</option></select>
    <button type="submit" className="register-button" disabled={saving}>{saving ? "Creating account…" : "Create account"}</button>
    {message && <p className="register-message" role="status">{message}</p>}
    <p className="login-redirect">Already have an account? <span onClick={() => navigate("/login")} className="login-link">Log in</span></p>
  </form></main>;
};
export default Register;
