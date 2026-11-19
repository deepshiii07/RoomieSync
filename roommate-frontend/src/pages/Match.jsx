import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../api";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";
import "./Match.css";

const Match = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) { setError("Please log in to see roommate matches."); setLoading(false); return; }
    axios.get(`${API_BASE_URL}/api/users/match/${userId}`)
      .then(({ data }) => setMatches(Array.isArray(data) ? data : []))
      .catch(() => setError("We couldn't load matches. Please try again."))
      .finally(() => setLoading(false));
  }, [userId]);

  return <><Navbar /><main className="match-container"><p className="eyebrow">ROOMIESYNC MATCHES</p><h1>People to share a home with</h1>
    <p className="form-intro">Matches are based on your city, preferred area and roommate preferences.</p>
    {loading ? <p>Finding compatible people…</p> : error ? <p role="alert">{error}</p> : matches.length === 0 ? <p>No matches yet. Check your city and preferred area, then try again.</p> :
      <div className="match-card-list">{matches.map((match) => <MatchCard key={match.id} match={match} />)}</div>}
  </main></>;
};
export default Match;
