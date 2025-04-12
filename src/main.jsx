import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import App from "./App";
import PrivacyPolicy from "./PrivacyPolicy"; // Import Privacy Policy page
import "./style.css";
import VoterAccess from "./VoterAccess";
import TermsOfService from "./TermsOfService";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<PrivacyPolicy />} /> 
        <Route path="/voter-access" element={<VoterAccess />} />   
        <Route path="/terms" element={<TermsOfService />} /> 
      </Routes>
    </Router>
  </React.StrictMode>
);
