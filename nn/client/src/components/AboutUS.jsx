import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Assuming FaBars is from react-icons
import Header from './Header'; // Adjust the path if Header is in a different file
import Sidebar from './Sidebar'; // Adjust the path if Sidebar is in a different directory

function AboutUs() {
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
      <div className="about-us">
        <div className="co-founder">
          <img src="path_to_image" alt="Co-founder 1" />
          <h3>Co-founder 1 Name</h3>
          <p>Co-founder 1 Description</p>
        </div>

        <div className="co-founder">
          <img src="path_to_image" alt="Co-founder 2" />
          <h3>Co-founder 2 Name</h3>
          <p>Co-founder 2 Description</p>
        </div>
      </div>
    </>
  );
}

export default AboutUs;