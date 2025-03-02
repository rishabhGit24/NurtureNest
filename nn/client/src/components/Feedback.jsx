import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Assuming FaBars is from react-icons
import Footer from "./Footer";
import Header from './Header'; // Adjust the path if Header is in a different file
import Sidebar from './Sidebar'; // Adjust the path if Sidebar is in a different directory

function Feedback() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile view

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout (placeholder function, adjust as needed)
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear auth token, redirect)
    console.log("Logged out");
  };

  return (
    <>
      <Header />
      <button
        onClick={handleLogout}
        className="logout-button"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "orange",
          color: "teal",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="sidebar-icon"
          style={{ marginLeft: "" }}
        >
          <FaBars />
        </button>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <form>
        <h1>Your Feedback</h1>
        <label>Name (Optional):</label>
        <input type="text" placeholder="Your Name" />

        <label>Email:</label>
        <input type="email" placeholder="Your Email" required />

        <label>Feedback:</label>
        <textarea rows="6" placeholder="Your feedback..." required></textarea>

        <button type="submit">Submit Feedback</button>
      </form>
      <div style={{ marginTop: isMobile ? "" : "-10em" }}>
        <Footer />
      </div>
    </>
  );
}

export default Feedback;