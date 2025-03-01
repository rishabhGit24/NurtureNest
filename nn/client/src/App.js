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
import Hyiegine from "./components/Hygiene";
import Login from "./components/Login";
import Medical from "./components/Medical";
import Money from "./components/Money";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/food" element={<Food />} />
          <Route path="/header" element={<Header />} />
          <Route path="/hygiene" element={<Hyiegine />} />
          <Route path="/medical" element={<Medical />} />
          <Route path="/money" element={<Money />} />
          <Route path="/education" element={<Education />} />
          <Route path="/clothes" element={<Clothes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
