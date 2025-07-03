import React, { useState } from "react";
import "./MatchCard.css";

const MatchCard = ({ match }) => {
  const [showContact, setShowContact] = useState(false);

  if (!match) return null;

  return (
    <div className="match-card">
      <div className="match-details">
        <h3>{match.name}</h3>
        <p><strong>Location:</strong> {match.location}</p>
        <p><strong>Academic Year:</strong> {match.academicYear}</p>
        <p><strong>Gender:</strong> {match.gender}</p>
      </div>

      <div className="contact-btn-wrapper">
        {!showContact ? (
          <button className="contact-btn" onClick={() => setShowContact(true)}>
            Contact
          </button>
        ) : (
          <div className="contact-info">
            <p><strong>Phone:</strong> {match.phone}</p>
            <p><strong>Email:</strong> {match.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCard;
