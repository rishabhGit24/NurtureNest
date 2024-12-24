import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import AboutUs from './components/AboutUS';
import Feedback from './components/Feedback';
import Food from './components/Food'
import Header from './components/Header';
import Hyiegine from './components/Hygiene';
import Medical from './components/Medical';
import Money from './components/Money';
import Clothes from './components/Clothes';

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
          <Route path="/food" element={<Food/>} />
          <Route path="/header" element={<Header/>} />
          <Route path="/hygiene" element={<Hyiegine/>} />
          <Route path="/medical" element={<Medical/>} />
          <Route path="/money" element={<Money/>} />
          <Route path="/clothes" element={<Clothes/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
