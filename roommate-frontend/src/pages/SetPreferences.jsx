import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./SetPreferences.css";

const SetPreferences = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState({
    preferredGender: "",
    preferredLocation: "",
    preferredAcademicYear: "",
    smokerPreference: "",
    drinkerPreference: "",
    religiousPreference: "",
    bedtimePreference: "",
    studyTiming: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/preferences/${userId}`)
      .then((res) => {
        if (res.data) setFormData(res.data);
      })
      .catch(() => {});
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8081/api/preferences/${userId}`, formData);
      setMessage("Preferences saved successfully ✅");
    } catch (error) {
      setMessage("Failed to save preferences ❌");
    }
  };

  return (
    <>
      <Navbar />
      <div className="preferences-page">
        <form className="preferences-form" onSubmit={handleSubmit}>
          <h2>Set Your Roommate Preferences</h2>

          <select name="preferredGender" value={formData.preferredGender} onChange={handleChange} required>
            <option value="">Preferred Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input type="text" name="preferredLocation" placeholder="Preferred Location" value={formData.preferredLocation} onChange={handleChange} required />

          <select name="preferredAcademicYear" value={formData.preferredAcademicYear} onChange={handleChange} required>
            <option value="">Preferred Academic Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>

          <select name="smokerPreference" value={formData.smokerPreference} onChange={handleChange} required>
            <option value="">Smoker Preference</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Doesn’t matter">Doesn’t matter</option>
          </select>

          <select name="drinkerPreference" value={formData.drinkerPreference} onChange={handleChange} required>
            <option value="">Drinker Preference</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Doesn’t matter">Doesn’t matter</option>
          </select>

          <select name="religiousPreference" value={formData.religiousPreference} onChange={handleChange} required>
            <option value="">Religious Preference</option>
            <option value="Religious">Religious</option>
            <option value="Not Religious">Not Religious</option>
            <option value="Doesn’t matter">Doesn’t matter</option>
          </select>

          <select name="bedtimePreference" value={formData.bedtimePreference} onChange={handleChange} required>
            <option value="">Bedtime Preference</option>
            <option value="Early Sleeper">Early Sleeper</option>
            <option value="Night Owl">Night Owl</option>
            <option value="Flexible">Flexible</option>
          </select>

          <select name="studyTiming" value={formData.studyTiming} onChange={handleChange} required>
            <option value="">Study Timing</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Late Night">Late Night</option>
          </select>

          <button type="submit">Save Preferences</button>

          {message && <p className={`message ${message.includes("success") ? "success" : "error"}`}>{message}</p>}
        </form>
      </div>
    </>
  );
};

export default SetPreferences;
