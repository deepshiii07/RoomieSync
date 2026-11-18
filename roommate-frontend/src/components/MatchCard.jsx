import React, { useState } from "react";
import "./MatchCard.css";

const MatchCard = ({ match }) => {
  const [showContact, setShowContact] = useState(false);
  if (!match) return null;
  return <article className="match-card">
    <div className="match-details"><p className="eyebrow">POTENTIAL ROOMMATE</p><h3>{match.name}</h3>
      <p>{match.location || "City not listed"} · {match.gender || "Gender not listed"}</p>
    </div>
    <div className="contact-btn-wrapper">{!showContact ? <button className="contact-btn" onClick={() => setShowContact(true)}>View contact</button> :
      <div className="contact-info"><p>{match.phone || "Phone not shared"}</p><p>{match.email}</p></div>}</div>
  </article>;
};
export default MatchCard;
