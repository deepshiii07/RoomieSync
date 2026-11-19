import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import Navbar from "../components/Navbar";
import "./MyProfile.css";

const MyProfile = () => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) { setError("Please log in to view your profile."); setLoading(false); return; }
    Promise.all([
      axios.get(`${API_BASE_URL}/api/users/${userId}`),
      axios.get(`${API_BASE_URL}/api/preferences/${userId}`).catch((e) => e.response?.status === 404 ? null : Promise.reject(e))
    ]).then(([userResponse, profileResponse]) => {
      setUser(userResponse.data);
      setProfile(profileResponse?.data ?? null);
    }).catch(() => setError("We couldn't load your profile. Please try again.")).finally(() => setLoading(false));
  }, [userId]);

  return <><Navbar /><main className="myprofile-container">
    {loading ? <p>Loading your profile…</p> : error ? <p role="alert">{error}</p> : user && <>
      <section className="profile-card">
        <header className="avatar-section"><div className="profile-avatar">{(user.name || "?").trim().charAt(0).toUpperCase()}</div><h1>{user.name}</h1><p>{user.location || "City not added"}</p></header>
        <section className="profile-section"><h2>Personal details</h2><dl>
          <div><dt>Email</dt><dd>{user.email}</dd></div><div><dt>Phone</dt><dd>{user.phone || "Not added"}</dd></div>
          <div><dt>Current city</dt><dd>{user.location || "Not added"}</dd></div>
          <div><dt>Gender</dt><dd>{user.gender || "Not added"}</dd></div>
        </dl></section>
        <section className="profile-section"><h2>Roommate preferences</h2>{profile ? <dl>
          <div><dt>Preferred area</dt><dd>{profile.preferredLocation || "Not set"}</dd></div>
          <div><dt>Roommate preference</dt><dd>{profile.preferredGender || "Any"}</dd></div>
          <div><dt>Smoking</dt><dd>{profile.smokerPreference || "Not set"}</dd></div>
          <div><dt>Drinking</dt><dd>{profile.drinkerPreference || "Not set"}</dd></div>
          <div><dt>Religion</dt><dd>{profile.religiousPreference || "Not set"}</dd></div>
          <div><dt>Sleep routine</dt><dd>{profile.bedtimePreference || "Not set"}</dd></div>
          <div><dt>Daily routine</dt><dd>{profile.studyTiming || "Not set"}</dd></div>
        </dl> : <p>You haven't set your roommate preferences yet.</p>}</section>
      </section>
    </>}
  </main></>;
};
export default MyProfile;
