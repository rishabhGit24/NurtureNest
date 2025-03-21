import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react"; // Added useRef to the import
import { FaBars } from 'react-icons/fa'; // Assuming FaBars is from react-icons
import Header from './Header'; // Adjust the path if Header is in a different file
import Sidebar from './Sidebar'; // Adjust the path if Sidebar is in a different directory
import "./styles/Profile.css"; // Import the CSS file

const Profile = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        donations: 0,
        punyaPoints: 0,
    });

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ ...user });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile view
    const sidebarRef = useRef(null); // Ref to track sidebar element for outside click

    useEffect(() => {
        setFormData(user); // Sync form data with user data on mount
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser({ ...formData });
        setEditMode(false);
    };

    const handleOpenEdit = () => {
        setEditMode(true);
    };

    const handleCloseEdit = () => {
        setEditMode(false);
    };

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

    const fieldLabels = {
        name: "Name",
        email: "Email",
        phone: "Phone",
        address: "Address",
        password: "Password",
        donations: "Number of Donations",
        punyaPoints: "Punya Points",
    };

    return (
        <>
            <Header />
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
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="sidebar-icon"
                    style={{
                        marginTop: "-7.5em",
                        marginLeft: isMobile ? "-10em" : "",
                        width: isMobile ? "15%" : "",
                        position: isMobile ? "absolute" : "",
                    }}
                >
                    <FaBars />
                </button>
            )}
            <div className={`side ${isSidebarOpen ? 'open' : ''}`} ref={sidebarRef} style={{ marginLeft: isMobile ? "0" : "2em", position: isMobile ? 'fixed' : 'relative', top: isMobile ? '60px' : '0', left: isMobile ? (isSidebarOpen ? '0' : '-250px') : '0', width: isMobile ? '250px' : 'auto', height: isMobile ? 'calc(100vh - 60px)' : 'auto', backgroundColor: '#007092', zIndex: isMobile ? 1000 : 1, transition: 'left 0.3s ease' }}>
                <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            </div>
            <div className="profile-container">
                <div className="profile-header">
                    <img
                        src="https://via.placeholder.com/130" // Replace with actual profile pic URL
                        alt="Profile"
                        className="profile-picture"
                    />
                    <Typography className="profile-name">{user.name || "User Name"}</Typography>
                    <Typography className="profile-email">{user.email || "user@example.com"}</Typography>
                </div>

                <div className="profile-info">
                    {/* Two fields per row */}
                    {Object.entries(user).reduce((rows, [key, value], index, arr) => {
                        if (index % 2 === 0) {
                            const nextField = arr[index + 1];
                            rows.push(
                                <div key={key} className="profile-row">
                                    <div>
                                        <span>{fieldLabels[key]}</span>
                                        <span className="value">
                                            {key === "password" ? "••••••••" : value}
                                        </span>
                                    </div>
                                    {nextField && (
                                        <div>
                                            <span>{fieldLabels[nextField[0]]}</span>
                                            <span className="value">
                                                {nextField[0] === "password" ? "••••••••" : nextField[1]}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return rows;
                    }, [])}
                </div>

                <Button className="edit-button" onClick={handleOpenEdit}>
                    Edit Profile
                </Button>

                {/* Edit Popup Dialog */}
                <Dialog open={editMode} onClose={handleCloseEdit} maxWidth="md" fullWidth>
                    <DialogTitle sx={{ bgcolor: "#007290", color: "#fff" }}>
                        Edit Profile
                    </DialogTitle>
                    <DialogContent sx={{ mt: 2 }}>
                        <div className="profile-info">
                            {Object.entries(formData)
                                .filter(([key]) => key !== "donations" && key !== "punyaPoints") // Exclude non-editable fields
                                .reduce((rows, [key, value], index, arr) => {
                                    if (index % 2 === 0) {
                                        const nextField = arr[index + 1];
                                        rows.push(
                                            <div key={key} className="profile-row">
                                                <div>
                                                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                                        {fieldLabels[key]}
                                                    </Typography>
                                                    <TextField
                                                        fullWidth
                                                        name={key}
                                                        type={key === "password" ? "password" : "text"}
                                                        value={value}
                                                        onChange={handleChange}
                                                        variant="outlined"
                                                        sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
                                                    />
                                                </div>
                                                {nextField && (
                                                    <div>
                                                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                                                            {fieldLabels[nextField[0]]}
                                                        </Typography>
                                                        <TextField
                                                            fullWidth
                                                            name={nextField[0]}
                                                            type={nextField[0] === "password" ? "password" : "text"}
                                                            value={nextField[1]}
                                                            onChange={handleChange}
                                                            variant="outlined"
                                                            sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }
                                    return rows;
                                }, [])}
                        </div>
                    </DialogContent>
                    <DialogActions sx={{ p: 2 }}>
                        <Button onClick={handleCloseEdit} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleSave} variant="contained" color="success">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
};

export default Profile;