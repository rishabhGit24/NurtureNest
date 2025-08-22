import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AboutUs from "./components/AboutUS";
import Clothes from "./components/Clothes";
import Education from "./components/Education";
import Feedback from "./components/Feedback";
import Food from "./components/Food";
import Header from "./components/Header";
import Home from "./components/Home";
import Hygiene from "./components/Hygiene";
import Location from "./components/Location";
import Login from "./components/Login";
import Medical from "./components/Medical";
import Money from "./components/Money";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import DonationCategoryForm from "./components/DonationCategoryForm";
import OrphanageAdminLogin from "./components/OrphanageAdminLogin";
import OrphanageAdminRegister from "./components/OrphanageAdminRegister";
import OrphanageAdminDashboard from "./components/OrphanageAdminDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/locations" element={<Location />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/food" element={<Food />} />
          <Route path="/hygiene" element={<Hygiene />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/money" element={<Money />} />
          <Route path="/education" element={<Education />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/donation/:category" element={<DonationCategoryForm />} />
          <Route path="/orphanage-login" element={<OrphanageAdminLogin />} />
          <Route path="/orphanage-register" element={<OrphanageAdminRegister />} />
          <Route path="/orphanage-dashboard" element={<OrphanageAdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
