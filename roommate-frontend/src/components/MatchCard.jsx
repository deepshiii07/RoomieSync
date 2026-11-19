import React, { useState } from "react";
import "./MatchCard.css";

const lifestyleItems = [
  ["lifestyleSmoking", { "non-smoker": "Non-smoker", "does not smoke": "Non-smoker", "no": "Non-smoker", "smoker": "Smoker", "yes": "Smoker", "occasionally": "Occasional smoker" }],
  ["lifestyleDrinking", { "non-drinker": "Doesn't drink", "does not drink": "Doesn't drink", "no": "Doesn't drink", "socially": "Drinks socially", "occasionally": "Drinks occasionally", "yes": "Drinks" }],
  ["lifestyleSleep", {}],
  ["lifestyleRoutine", {}],
  ["lifestyleCleanliness", {}],
  ["lifestyleSocial", {}],
  ["lifestyleGuests", {}],
];

const labels = {
  lifestyleSleep: "Sleep",
  lifestyleRoutine: "Daily routine",
  lifestyleCleanliness: "Cleanliness",
  lifestyleSocial: "Social style",
  lifestyleGuests: "Guests",
};

const humanize = (value) => String(value).trim().replace(/[_-]+/g, " ").replace(/\s+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const getLifestyleLabel = (key, value, aliases) => {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const normalized = raw.toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
  return aliases[normalized] || `${labels[key] || ""}: ${humanize(raw)}`;
};

const MatchCard = ({ match }) => {
  const [showContact, setShowContact] = useState(false);
  if (!match) return null;
  const score = Math.max(0, Math.min(100, Number(match.compatibilityScore) || 0));
  const reasons = Array.isArray(match.compatibilityReasons) ? match.compatibilityReasons : [];
  const lifestyle = lifestyleItems
    .map(([key, aliases]) => getLifestyleLabel(key, match[key], aliases))
    .filter(Boolean);

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

      {lifestyle.length > 0 && (
        <section className="match-lifestyle" aria-label="Lifestyle">
          <p className="match-section-title">Lifestyle</p>
          <div className="lifestyle-chips">
            {lifestyle.map((item) => <span className="lifestyle-chip" key={item}>{item}</span>)}
          </div>
        </section>
      )}

      {reasons.length > 0 && (
        <div className="match-reasons">
          <p className="match-reasons-title">Why you may get along</p>
          <ul>{reasons.slice(0, 3).map((reason, index) => <li key={index}>{reason}</li>)}</ul>
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
