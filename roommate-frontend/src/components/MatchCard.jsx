import React, { useState } from "react";
import "./MatchCard.css";

const MatchCard = ({ match }) => {
  const [showContact, setShowContact] = useState(false);
  if (!match) return null;
  const score = Math.max(0, Math.min(100, Number(match.compatibilityScore) || 0));
  const reasons = Array.isArray(match.compatibilityReasons) ? match.compatibilityReasons : [];

  return (
    <article className="match-card">
      <div className="match-card-topline">
        <p className="eyebrow">POTENTIAL ROOMMATE</p>
        <span className="match-score">{score}% match</span>
      </div>
      <div className="match-details">
        <h3>{match.name}</h3>
        <p>{match.location || "City not listed"} · {match.gender || "Gender not listed"}</p>
      </div>
      {reasons.length > 0 && (
        <div className="match-reasons">
          <p className="match-reasons-title">Why you may get along</p>
          <ul>{reasons.slice(0, 4).map((reason, index) => <li key={index}>{reason}</li>)}</ul>
        </div>
      )}
      <div className="contact-btn-wrapper">
        {!showContact ? <button className="contact-btn" onClick={() => setShowContact(true)}>View contact</button> :
          <div className="contact-info"><p>{match.phone || "Phone not shared"}</p><p>{match.email}</p></div>}
      </div>
    </article>
  );
};
export default MatchCard;
