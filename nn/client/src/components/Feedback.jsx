import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./styles/feedback.css";

function Feedback() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile view

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout (placeholder function, adjust as needed)
  const handleLogout = () => {
    console.log("Logged out");
  };

  // Handle window resize to update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#C5E3EA",
            padding: "5px",
          }}
        >
          <button
            onClick={toggleSidebar}
            className="sidebar-icon"
            style={{
              marginTop: "-5em",
              marginLeft: isMobile ? "-2px" : "",
              width: isMobile ? "15%" : "",
              position: isMobile ? "absolute" : "",
            }}
          >
            <FaBars />
          </button>
          <Header />
        </div>
      ) : (
        <Header />
      )}
      <button
        onClick={handleLogout}
        className={`logout-button ${isMobile ? "mobile" : ""}`}
        style={{
          position: "absolute",
          zIndex: isMobile ? "1001" : "",
          top: isMobile ? "1px" : "20px",
          right: isMobile ? "18px" : "40px",
          backgroundColor: "#19849E",
          color: isMobile ? "transparent" : "white", // Hide text on mobile
          border: "none",
          borderRadius: "5px",
          padding: isMobile ? "10px" : "10px 20px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="logout-text">Logout</span>
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{
            marginLeft: isMobile ? "0" : "5px",
            fontSize: isMobile ? "20px" : "16px",
            color: isMobile ? "white" : "white", // Ensure icon is visible on mobile
          }}
        />
      </button>
      <div className="feedback-page">
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <form className="feedback-form" style={{ marginTop: isMobile ? "-10em" : "-10em" }}>
          <h1 className="feedback-title">Your Feedback</h1>
          <label className="feedback-label">Name (Optional):</label>
          <input
            type="text"
            placeholder="Your Name"
            className="feedback-input"
          />

          <label className="feedback-label">Email:</label>
          <input
            type="email"
            placeholder="Your Email"
            required
            className="feedback-input"
          />

          <label className="feedback-label">Feedback:</label>
          <textarea
            placeholder="Your feedback..."
            required
            className="feedback-textarea"
          ></textarea>

          <button type="submit" className="feedback-submit" style={{width:isMobile?"50%":""}}>
            Submit Feedback
          </button>
        </form>
      </div>
    </>
  );
}

export default Feedback;