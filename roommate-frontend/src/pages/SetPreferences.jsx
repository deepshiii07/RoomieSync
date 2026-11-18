import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import Navbar from "../components/Navbar";
import "./SetPreferences.css";

const initialForm = {
  preferredGender: "",
  preferredLocation: "",
  smokerPreference: "Doesn’t matter",
  drinkerPreference: "Doesn’t matter",
  religiousPreference: "Doesn’t matter",
  bedtimePreference: "Flexible",
  studyTiming: "Flexible"
};

const SetPreferences = () => {
  const userId = localStorage.getItem("userId");
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId) {
      setMessage("Please log in to manage your preferences.");
      setLoading(false);
      return;
    }
    axios.get(`${API_BASE_URL}/api/preferences/${userId}`)
      .then(({ data }) => setFormData({ ...initialForm, ...data, preferredLocation: data.preferredLocation ?? "" }))
      .catch((error) => {
        if (error.response?.status !== 404) setMessage("We couldn't load your saved preferences. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = ({ target: { name, value } }) => setFormData((current) => ({ ...current, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await axios.post(`${API_BASE_URL}/api/preferences/${userId}`, formData);
      setMessage("Preferences saved.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Couldn't save preferences. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <><Navbar /><main className="preferences-page"><p>Loading your preferences…</p></main></>;

  return (
    <>
      <Navbar />
      <main className="preferences-page">
        <form className="preferences-form" onSubmit={handleSubmit}>
          <p className="eyebrow">YOUR HOME, YOUR TERMS</p>
          <h1>Who would you like to live with?</h1>
          <p className="form-intro">Choose the neighbourhoods you’re considering in your profile city.</p>

          <label htmlFor="preferredLocation">Preferred neighbourhood / area</label>
          <input id="preferredLocation" name="preferredLocation" type="text" placeholder="e.g. Koramangala, HSR Layout" value={formData.preferredLocation} onChange={handleChange} required />

          <label htmlFor="preferredGender">Roommate preference</label>
          <select id="preferredGender" name="preferredGender" value={formData.preferredGender} onChange={handleChange} required>
            <option value="">No preference selected</option>
            <option value="Any">Any gender</option>
            <option value="Female">Women</option>
            <option value="Male">Men</option>
            <option value="Other">Non-binary / other</option>
          </select>

          <div className="preference-grid">
            <div><label htmlFor="smokerPreference">Smoking</label><select id="smokerPreference" name="smokerPreference" value={formData.smokerPreference} onChange={handleChange}><option>Doesn’t matter</option><option>Yes</option><option>No</option></select></div>
            <div><label htmlFor="drinkerPreference">Drinking</label><select id="drinkerPreference" name="drinkerPreference" value={formData.drinkerPreference} onChange={handleChange}><option>Doesn’t matter</option><option>Yes</option><option>No</option></select></div>
            <div><label htmlFor="religiousPreference">Religion</label><select id="religiousPreference" name="religiousPreference" value={formData.religiousPreference} onChange={handleChange}><option>Doesn’t matter</option><option>Religious</option><option>Not Religious</option></select></div>
            <div><label htmlFor="bedtimePreference">Sleep routine</label><select id="bedtimePreference" name="bedtimePreference" value={formData.bedtimePreference} onChange={handleChange}><option>Flexible</option><option>Early Sleeper</option><option>Night Owl</option></select></div>
            <div><label htmlFor="studyTiming">Daily routine</label><select id="studyTiming" name="studyTiming" value={formData.studyTiming} onChange={handleChange}><option>Flexible</option><option>Morning</option><option>Evening</option><option>Late Night</option></select></div>
          </div>

          <button type="submit" disabled={saving}>{saving ? "Saving…" : "Save preferences"}</button>
          {message && <p role="status" className="message">{message}</p>}
        </form>
      </main>
    </>
  );
};

export default SetPreferences;
