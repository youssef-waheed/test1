

import "./App.css";
import React from "react";
import { useLocation, Route, Routes } from "react-router-dom";
import Header from "./Shared/UserNav";
import InquiryAboutAdmission from "../src/Pages/InquiryAboutAdmission";
import ApplicationDates from "../src/Pages/ApplicationDates";
import ApplicationForm from "../src/Pages/ApplicationForm";
import Login from "./Authentication/Login";
import Admin from "./Shared/Header";

function App() {

  const location = useLocation();

  // Check if the current location is the login route ("/login")
  const showHeader = location.pathname === "/InquiryAboutAdmission" ||
  location.pathname === "/AppDate" ||
  location.pathname === "/AppForm";

  return (
      <div className="App">
      {showHeader && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/InquiryAboutAdmission"
            element={<InquiryAboutAdmission />}
          />
          <Route path="/AppDate" element={<ApplicationDates />} />
          <Route path="/AppForm" element={<ApplicationForm />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </div>
  );
}

export default App;

