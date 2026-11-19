import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import Navbar from "../components/Navbar";
import "./EditProfile.css";

const EditProfile = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "", gender: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setMessage("Please log in first."); setLoading(false); return; }
    axios.get(`${API_BASE_URL}/api/users/${userId}`).then(({ data }) => setFormData({
      name: data?.name ?? "", email: data?.email ?? "", phone: data?.phone ?? "",
      location: data?.location ?? "", gender: data?.gender ?? ""
    })).catch(() => setMessage("Could not load your profile.")).finally(() => setLoading(false));
  }, [userId]);

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = async (event) => {
    event.preventDefault();
    try { await axios.put(`${API_BASE_URL}/api/users/${userId}`, formData); setMessage("Profile updated."); }
    catch { setMessage("Update failed. Please try again."); }
  };

  return <><Navbar /><main className="edit-profile-page"><form className="edit-profile-form" onSubmit={handleSubmit}>
    <p className="eyebrow">YOUR PROFILE</p><h1>Personal details</h1>
    {loading ? <p>Loading…</p> : <>
      <label>Full name</label><input name="name" value={formData.name} onChange={handleChange} required />
      <label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <label>Phone</label><input name="phone" value={formData.phone} onChange={handleChange} required />
      <label>Current city</label><input name="location" placeholder="e.g. Bengaluru" value={formData.location} onChange={handleChange} required />
      <label>Gender</label><select name="gender" value={formData.gender} onChange={handleChange} required><option value="">Select gender</option><option>Female</option><option>Male</option><option>Other</option></select>
      <button type="submit">Save changes</button>
    </>}
    {message && <p role="status" className="message">{message}</p>}
  </form></main></>;
};
export default EditProfile;
