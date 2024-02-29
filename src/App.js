

import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Shared/UserNav";
import InquiryAboutAdmission from "./Pages/InquiryAboutAdmission";
import ApplicationDates from "./Pages/ApplicationDates";
import ApplicationForm from "./Pages/ApplicationForm";
import Login from "./Authentication/Login";
import Admin from "./Shared/Header";

function App() {
  return (
      <div className="App">
        <Header />
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

