import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import Header from "./Header"; // Adjust the path if Header is in a different file
import RishabhImage from "./images/Rishabh.jpg";
import ShashankImage from "./images/Shashank.jpg";
import Sidebar from "./Sidebar"; // Import Sidebar without applying CSS
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
        !event.target.closest(".sidebar-icon") // Click is not on hamburger icon
      ) {
        setIsSidebarOpen(false); // Close sidebar
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMobile, isSidebarOpen]);

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
          right: isMobile ? "10px" : "40px",
          backgroundColor: "#19849E",
          color: isMobile ? "transparent" : "white", // Hide text on mobile
          border: "none",
          borderRadius: "5px",
          padding: isMobile ? "10px" : "10px 20px", // Adjust padding for icon-only on mobile
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isMobile ? "10%" : "",
        }}
      >
        <span className="logout-text">Logout</span> {/* Wrap text in a span for styling */}
        <FontAwesomeIcon
          icon={faRightFromBracket}
          style={{
            marginLeft: isMobile ? "" : "5px",
            fontSize: isMobile ? "20px" : "16px",
            color: isMobile ? "white" : "white", // Ensure icon is visible on mobile
          }}
        />
      </button>
      <div className="side" ref={sidebarRef}>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>
      <Box
        sx={{
          p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
          bgcolor: "#C5E3EA",
          minHeight: "100vh", // Ensure the content takes full height
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#007290",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsive font size
          }}
        >
          About Us
        </Typography>
        <Box
          sx={{
            width: { xs: "100%", sm: "80%", md: "65%" }, // Responsive width
            p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
            mb: 4,
            borderRadius: 2,
            bgcolor: "#53AEC6",
            boxShadow: 2,
            margin: "auto",
          }}
        >
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontWeight: 500,
              fontSize: { xs: "14px", sm: "16px", md: "18px" }, // Responsive font size
              color: "white",
              textAlign: "center",
            }}
          >
            NurtureNest is committed to providing innovative solutions to enhance
            your experience. Our dedicated team of professionals works tirelessly
            to deliver cutting-edge technology and exceptional service. Together,
            we aim to nurture growth and inspire change.
          </Typography>
        </Box>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            color: "#007290",
            fontWeight: "bold",
            padding: { xs: "0.5em", sm: "1em" }, // Responsive padding
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" }, // Responsive font size
          }}
        >
          Meet Our Co-Founders
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {cofounders.map((cofounder, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={16}
                sx={{
                  p: { xs: 3, sm: 4, md: 6 }, // Responsive padding
                  bgcolor: "#53AEC6",
                  color: "#fff",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <img
                  src={cofounder.image}
                  alt={cofounder.name}
                  className="team-image"
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    fontSize: { xs: "18px", sm: "20px", md: "24px" }, // Responsive font size
                    mt: 2,
                  }}
                >
                  {cofounder.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: { xs: "14px", sm: "16px", md: "16px" }, // Responsive font size
                  }}
                >
                  {cofounder.role}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    textAlign: "justify",
                    fontSize: { xs: "12px", sm: "14px", md: "18px" }, // Responsive font size
                  }}
                >
                  {cofounder.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AboutUs;