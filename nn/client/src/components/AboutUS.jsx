import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react"; // Already has useRef, useState, useEffect
import { FaBars } from 'react-icons/fa'; // Assuming FaBars is from react-icons
import Footer from './Footer'; // Adjust the path if Footer is in a different file
import Header from './Header'; // Adjust the path if Header is in a different file
import RishabhImage from "./images/Rishabh.jpg";
import ShashankImage from "./images/Shashank.jpg";
import Sidebar from './Sidebar'; // Import Sidebar without applying CSS
import "./styles/aboutus.css";

const AboutUs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile view
  const sidebarRef = useRef(null); // Ref to track sidebar element for outside click

  const cofounders = [
    {
      name: "RISHABH B R",
      role: "CEO and Co-Founder",
      description:
        "Rishabh is a committed problem solver and software developer with a strong foundation in back-end technologies and systems design. He thrives on building efficient, scalable applications and ensuring seamless functionality. Rishabh's collaborative spirit and technical skills make him an integral part of the team. Rishabh continuously explores new technologies to enhance performance and optimize solutions, making him a valuable asset to any project.",
      image: RishabhImage,
    },
    {
      name: "SHASHANK B R",
      role: "Co-Founder",
      description:
        "Shashank is a passionate front-end developer and machine learning enthusiast, always eager to explore and implement innovative technologies. With expertise in the MERN stack and a flair for designing user-centric applications, Shashank consistently delivers impactful solutions. His journey reflects a dedication to learning and making a difference through technology. His creativity enhances user engagement and improves overall user experience.",
      image: ShashankImage,
    },
  ];

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle logout (placeholder function, adjust as needed)
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear auth token, redirect)
    console.log("Logged out");
  };

  // Handle outside click to close sidebar on mobile
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isMobile && // Only on mobile
        isSidebarOpen && // Sidebar is open
        sidebarRef.current && // Sidebar ref exists
        !sidebarRef.current.contains(event.target) && // Click is outside sidebar
        !event.target.closest('.sidebar-icon') // Click is not on hamburger icon
      ) {
        setIsSidebarOpen(false); // Close sidebar
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobile, isSidebarOpen]);

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
          backgroundColor: "#19849E",
          color: "white",
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
      <Box sx={{ p: 4, bgcolor: "#C5E3E" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "#007290", fontWeight: "bold" }}>
          About Us
        </Typography>
        <Box sx={{ width: "65%", p: 4, mb: 4, borderRadius: 2, bgcolor: "#53AEC6", boxShadow: 2, margin: "auto" }}>
          <Typography variant="body1" align="center" sx={{ fontWeight: "bold", fontSize: "18px", fontWeight: 500, color: "white", textAlign: "center", }}>
            NurtureNest is committed to providing innovative solutions to enhance your experience.
            Our dedicated team of professionals works tirelessly to deliver cutting-edge technology
            and exceptional service. Together, we aim to nurture growth and inspire change.
          </Typography>
        </Box>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: "#007290", fontWeight: "bold", padding: "1em 1em" }}>
          Meet Our Co-Founders
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {cofounders.map((cofounder, index) => (
            <Grid item xs={12} sm={1} md={4} key={index}>
              <Paper elevation={16} sx={{ p: 6, bgcolor: "#53AEC6", color: "#fff", borderRadius: 2, textAlign: "center" }}>
                <img src={cofounder.image} alt={cofounder.name} className="team-image" />
                <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "24px", mt: 2 }}>
                  {cofounder.name}
                </Typography>
                <Typography variant="subtitle1">{cofounder.role}</Typography>
                <Typography variant="body2" sx={{ mt: 2, textAlign: "justify", fontSize: "18px" }}>{cofounder.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box >
      <div style={{ marginTop: isMobile ? "" : "-6em" }}>
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;