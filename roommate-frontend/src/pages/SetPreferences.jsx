import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import Navbar from "../components/Navbar";
import "./SetPreferences.css";

const initialForm = {
  preferredGender: "Any",
  preferredLocation: "",
  lifestyleSmoking: "",
  lifestyleDrinking: "",
  lifestyleReligion: "",
  lifestyleSleep: "",
  lifestyleRoutine: "",
  lifestyleCleanliness: "",
  lifestyleSocial: "",
  lifestyleGuests: "",
  smokerPreference: "Doesn't matter",
  drinkerPreference: "Doesn't matter",
  religiousPreference: "Doesn't matter",
  bedtimePreference: "Flexible",
  studyTiming: "Flexible",
  cleanlinessPreference: "Flexible",
  socialPreference: "Flexible",
  guestPreference: "Flexible"
};

const SelectField = ({ label, name, value, onChange, options, hint }) => (
  <div className="roomie-field">
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name} value={value} onChange={onChange}>
      <option value="">Choose one</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
    {hint && <small>{hint}</small>}
  </div>
);

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
        if (error.response?.status !== 404) setMessage("We couldn't load your saved preferences.");
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleChange = ({ target: { name, value } }) =>
    setFormData((current) => ({ ...current, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await axios.post(`${API_BASE_URL}/api/preferences/${userId}`, formData);
      setMessage("Your profile and roommate preferences have been saved.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Couldn't save your preferences. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <><Navbar /><main className="preferences-page"><p>Loading your preferences…</p></main></>;

  return (
    <>
      <Navbar />
      <main className="preferences-page">
        <form className="preferences-form roomie-preferences-form" onSubmit={handleSubmit}>
          <p className="eyebrow">A BETTER HOUSEMATE MATCH STARTS HERE</p>
          <h1>Let's find your kind of home.</h1>
          <p className="form-intro">Tell us a little about how you live, then what you'd like in a person you share a home with. Your city comes from your personal profile.</p>

          <section className="roomie-form-section">
            <span className="roomie-section-number">01 / LOCATION & BASICS</span>
            <h2>Where would you like to live?</h2>
            <label htmlFor="preferredLocation">Preferred neighbourhood / area</label>
            <input id="preferredLocation" name="preferredLocation" type="text" placeholder="e.g. Koramangala, HSR Layout" value={formData.preferredLocation} onChange={handleChange} required />
            <SelectField label="Who would you be comfortable living with?" name="preferredGender" value={formData.preferredGender} onChange={handleChange} options={["Any", "Female", "Male", "Other"]} />
          </section>

          <section className="roomie-form-section">
            <span className="roomie-section-number">02 / YOUR LIFESTYLE</span>
            <h2>What are you like at home?</h2>
            <p className="roomie-section-copy">These answers describe you, not your ideal roommate.</p>
            <div className="preference-grid">
              <SelectField label="Do you smoke?" name="lifestyleSmoking" value={formData.lifestyleSmoking} onChange={handleChange} options={["No", "Yes", "Occasionally"]} />
              <SelectField label="Do you drink?" name="lifestyleDrinking" value={formData.lifestyleDrinking} onChange={handleChange} options={["No", "Yes", "Occasionally"]} />
              <SelectField label="How would you describe your religious practice?" name="lifestyleReligion" value={formData.lifestyleReligion} onChange={handleChange} options={["Religious", "Not Religious", "Prefer not to say"]} />
              <SelectField label="Your sleep schedule" name="lifestyleSleep" value={formData.lifestyleSleep} onChange={handleChange} options={["Early Sleeper", "Night Owl", "Flexible"]} />
              <SelectField label="Your daily routine" name="lifestyleRoutine" value={formData.lifestyleRoutine} onChange={handleChange} options={["Morning", "Daytime", "Evening", "Late Night", "Irregular"]} />
              <SelectField label="How tidy are you?" name="lifestyleCleanliness" value={formData.lifestyleCleanliness} onChange={handleChange} options={["Very tidy", "Mostly tidy", "Relaxed"]} />
              <SelectField label="Your social style at home" name="lifestyleSocial" value={formData.lifestyleSocial} onChange={handleChange} options={["Mostly quiet", "Balanced", "Outgoing"]} />
              <SelectField label="How often do you have guests?" name="lifestyleGuests" value={formData.lifestyleGuests} onChange={handleChange} options={["Rarely", "Sometimes", "Often"]} />
            </div>
          </section>

          <section className="roomie-form-section">
            <span className="roomie-section-number">03 / YOUR IDEAL ROOMMATE</span>
            <h2>What matters to you in a housemate?</h2>
            <p className="roomie-section-copy">We'll compare these preferences with other people's actual lifestyles, in both directions.</p>
            <div className="preference-grid">
              <SelectField label="Smoking" name="smokerPreference" value={formData.smokerPreference} onChange={handleChange} options={["Doesn't matter", "No", "Yes", "Occasionally"]} />
              <SelectField label="Drinking" name="drinkerPreference" value={formData.drinkerPreference} onChange={handleChange} options={["Doesn't matter", "No", "Yes", "Occasionally"]} />
              <SelectField label="Religious practice" name="religiousPreference" value={formData.religiousPreference} onChange={handleChange} options={["Doesn't matter", "Religious", "Not Religious"]} />
              <SelectField label="Sleep schedule" name="bedtimePreference" value={formData.bedtimePreference} onChange={handleChange} options={["Flexible", "Early Sleeper", "Night Owl"]} />
              <SelectField label="Daily routine" name="studyTiming" value={formData.studyTiming} onChange={handleChange} options={["Flexible", "Morning", "Daytime", "Evening", "Late Night", "Irregular"]} />
              <SelectField label="Cleanliness" name="cleanlinessPreference" value={formData.cleanlinessPreference} onChange={handleChange} options={["Flexible", "Very tidy", "Mostly tidy", "Relaxed"]} />
              <SelectField label="Social style" name="socialPreference" value={formData.socialPreference} onChange={handleChange} options={["Flexible", "Mostly quiet", "Balanced", "Outgoing"]} />
              <SelectField label="Guests at home" name="guestPreference" value={formData.guestPreference} onChange={handleChange} options={["Flexible", "Rarely", "Sometimes", "Often"]} />
            </div>
          </section>

          <button type="submit" disabled={saving}>{saving ? "Saving your profile…" : "Save my profile & preferences"}</button>
          {message && <p role="status" className="message">{message}</p>}
        </form>
      </main>
    </>
  );
};

export default SetPreferences;
