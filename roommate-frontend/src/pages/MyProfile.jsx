import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./MyProfile.css";

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/preferences/${userId}`);
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Could not load your profile. Please set your preferences.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="myprofile-container">
          <h2>Loading your profile...</h2>
        </div>
      </>
    );
  }

  if (error || !profile || !profile.user) {
    return (
      <>
        <Navbar />
        <div className="myprofile-container">
          <h2>{error || "No profile data found. Please set your preferences first."}</h2>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="myprofile-container">
        <div className="profile-card">
          <div className="avatar-section">
            <img
              src="https://api.dicebear.com/7.x/bottts/svg?seed=user"
              alt="User Avatar"
              className="avatar"
            />
            <h2>{profile.user.name}</h2>
          </div>

          <div className="profile-section">
            <h3>👤 Personal Info</h3>
            <ul>
              <li><strong>Name:</strong> {profile.user.name}</li>
              <li><strong>Email:</strong> {profile.user.email}</li>
              <li><strong>Phone:</strong> {profile.user.phone}</li>
              <li><strong>Location:</strong> {profile.user.location}</li>
              <li><strong>Academic Year:</strong> {profile.user.academicYear}</li>
            </ul>
          </div>

          <div className="profile-section">
            <h3>🎯 Roommate Preferences</h3>
            <ul>
              <li><strong>Preferred Gender:</strong> {profile.preferredGender}</li>
              <li><strong>Preferred Location:</strong> {profile.preferredLocation}</li>
              <li><strong>Preferred Academic Year:</strong> {profile.preferredAcademicYear}</li>
              <li><strong>Smoker Preference:</strong> {profile.smokerPreference}</li>
              <li><strong>Drinker Preference:</strong> {profile.drinkerPreference}</li>
              <li><strong>Religious Preference:</strong> {profile.religiousPreference}</li>
              <li><strong>Bedtime Preference:</strong> {profile.bedtimePreference}</li>
              <li><strong>Study Timing:</strong> {profile.studyTiming}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
