import React, { useEffect, useState } from "react";
import axios from "axios";
import MatchCard from "../components/MatchCard";
import Navbar from "../components/Navbar";
import "./Match.css";

const Match = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:8081/api/users/match/${userId}`);
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="match-container">
        <h2>Matched Roommates</h2>
        {matches.length === 0 ? (
          <p>No matches found yet.</p>
        ) : (
          <div className="match-card-list">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Match;
