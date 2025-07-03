import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Match from "./pages/Match";
import EditProfile from "./pages/editprofile";
import SetPreferences from "./pages/SetPreferences";
import MyProfile from './pages/MyProfile';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Add this line */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/match" element={<Match />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/set-preferences" element={<SetPreferences />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
