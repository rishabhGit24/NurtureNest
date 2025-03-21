import { default as React, useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import "./styles/Locations.css"; // Keep Locations CSS

const initialLocations = [
    {
        name: "VATSALYAPURAM TRUST NGO",
        latitude: 12.9224418,
        longitude: 77.5824046,
        description: "This is VATSALYAPURAM TRUST NGO",
        images: ["/images/1_1.jpg"],
        details: [
            "Founded in 2010",
            "Supports 150 children",
            "Focuses on education and healthcare",
            "Located in Bengaluru"
        ]
    },
    {
        name: "PREMAANAJALI",
        latitude: 12.9159589,
        longitude: 77.5911647,
        description: "This is PREMAANAJALI Orphanage",
        images: ["/images/2_1.jpg"],
        details: [
            "Established in 2005",
            "Houses 80 children",
            "Provides vocational training",
            "Community outreach programs"
        ]
    },
    {
        name: "NEED BASE INDIA: LAKSHYA UDAAN",
        latitude: 12.957973,
        longitude: 77.5887809,
        description: "This is NEED BASE INDIA: LAKSHYA UDAAN",
        images: ["/images/3_4.jpg"],
        details: [
            "Started in 2012",
            "Supports 200 children",
            "Focuses on skill development",
            "Partners with local schools"
        ]
    },
    {
        name: "Need Base India-Rainbow Home",
        latitude: 12.0461353,
        longitude: 77.54949548,
        description: "This is Need Base India-Rainbow Home",
        images: ["/images/3_2_1.jpg"],
        details: [
            "Founded in 2015",
            "Houses 120 children",
            "Focuses on mental health",
            "Organizes cultural events"
        ]
    },
    {
        name: "KARNATAKA ORPHANAGE AND HANDICAP DEVELOPMENT CENTER",
        latitude: 12.9378698,
        longitude: 77.5387422,
        description: "This is KARNATAKA ORPHANAGE AND HANDICAP DEVELOPMENT CENTER",
        images: ["/images/4_1.jpg"],
        details: [
            "Established in 2008",
            "Supports 100 children",
            "Specializes in disability care",
            "Offers therapy sessions"
        ]
    },
    {
        name: "AMRUTHA SHISHU NIVASA",
        latitude: 12.941669,
        longitude: 77.5670684,
        description: "This is AMRUTHA SHISHU NIVASA",
        images: ["/images/5_6.jpg"],
        details: [
            "Founded in 2011",
            "Houses 90 children",
            "Focuses on nutrition",
            "Provides educational support"
        ]
    },
    {
        name: "BELAKU SHISHU NIVASA",
        latitude: 12.9398111,
        longitude: 77.566134,
        description: "This is BELAKU SHISHU NIVASA",
        images: ["/images/6_2.jpg"],
        details: [
            "Started in 2009",
            "Supports 110 children",
            "Focuses on holistic development",
            "Organizes sports activities"
        ]
    },
    {
        name: "Bosco Yuvodaya",
        latitude: 12.97935,
        longitude: 77.57596,
        description: "This is Bosco Yuvodaya",
        images: ["/images/7_1_1.jpg"],
        details: [
            "Established in 2007",
            "Houses 130 children",
            "Focuses on youth empowerment",
            "Provides career counseling"
        ]
    },
    {
        name: "BOSCO Mane",
        latitude: 12.9583419,
        longitude: 77.569181,
        description: "This is BOSCO Mane",
        images: ["/images/7_2_1.jpg"],
        details: [
            "Founded in 2013",
            "Supports 140 children",
            "Focuses on emotional well-being",
            "Organizes art workshops"
        ]
    },
    {
        name: "BOSCO Yuvakendra",
        latitude: 12.9730467,
        longitude: 77.56277,
        description: "This is BOSCO Yuvakendra",
        images: ["/images/7_3_1.jpg"],
        details: [
            "Started in 2014",
            "Houses 160 children",
            "Focuses on leadership skills",
            "Provides mentorship programs"
        ]
    },
    {
        name: "BOSCO Nilaya",
        latitude: 12.9674429,
        longitude: 77.571919,
        description: "This is BOSCO Nilaya",
        images: ["/images/7_4_1.jpg"],
        details: [
            "Established in 2010",
            "Supports 170 children",
            "Focuses on community integration",
            "Organizes family visits"
        ]
    },
    {
        name: "BOSCO Summanahalli",
        latitude: 12.9807156,
        longitude: 77.517275,
        description: "This is BOSCO Summanahalli",
        images: ["/images/7_4_1.jpg"],
        details: [
            "Founded in 2006",
            "Houses 180 children",
            "Focuses on rehabilitation",
            "Provides medical support"
        ]
    },
    {
        name: "BOSCO Nivas",
        latitude: 12.9848622,
        longitude: 77.60404,
        description: "This is BOSCO Nivas",
        images: ["/images/7_4_1.jpg"],
        details: [
            "Started in 2015",
            "Supports 190 children",
            "Focuses on life skills",
            "Organizes community service"
        ]
    },
    {
        name: "BOSCO Vatsalya Bhavan",
        latitude: 12.9598526,
        longitude: 77.567894,
        description: "This is BOSCO Vatsalya Bhavan",
        images: ["/images/7_6_1.jpg"],
        details: [
            "Established in 2012",
            "Houses 200 children",
            "Focuses on child rights",
            "Provides legal aid"
        ]
    },
    {
        name: "Auxilium Navajeevana",
        latitude: 12.9607131,
        longitude: 77.563616,
        description: "This is Auxilium Navajeevana",
        images: ["/images/8_1.jpg"],
        details: [
            "Founded in 2009",
            "Supports 210 children",
            "Focuses on education for girls",
            "Organizes empowerment workshops"
        ]
    },
];
const Locations = () => {
    const [user, setUser] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ ...user });
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [selectedCard, setSelectedCard] = useState(null);
    const sidebarRef = useRef(null);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser({ ...formData });
        setEditMode(false);
    };

    const handleOpenEdit = () => setEditMode(true);
    const handleCloseEdit = () => setEditMode(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const handleLogout = () => console.log("Logged out");

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isMobile && isSidebarOpen && sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !event.target.closest('.sidebar-icon')) {
                setIsSidebarOpen(false);
            }
            if (selectedCard !== null && !event.target.closest('.location-card') &&
                !event.target.closest('.details-card')) {
                setSelectedCard(null);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [isMobile, isSidebarOpen, selectedCard]);

    const handleCardClick = (index) => {
        setSelectedCard(selectedCard === index ? null : index);
    };

    const handleCloseCard = () => {
        setSelectedCard(null); // Close the card by setting selectedCard to null
    };

    return (
        <>
            <Header />
            <button
                onClick={handleLogout}
                className="logout-button"
                style={{ position: 'absolute', top: '20px', right: '20px' }}
            >
                Logout
            </button>
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="sidebar-icon"
                    aria-label="Toggle sidebar"
                >
                    <FaBars />
                </button>
            )}
            <div
                className={`side ${isSidebarOpen ? 'open' : ''}`}
                ref={sidebarRef}
            >
                <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            </div>
            <div className="locations-container">
                <h1 className="title">NGOs & Orphanages</h1>
                <div className={`locations-grid ${selectedCard !== null ? 'blur-background' : ''}`}>
                    {initialLocations.map((location, index) => (
                        <div
                            key={index}
                            className="location-card"
                            onClick={() => handleCardClick(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={location.images[0]}
                                alt={location.name}
                                className="location-image"
                                loading="lazy"
                                onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                            />
                            <div className="location-info">
                                <h2 className="location-name">{location.name}</h2>
                                <p className="location-description">{location.description}</p>
                                <p className="location-coordinates">
                                    📍 {location.latitude}, {location.longitude}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedCard !== null && (
                    <div className="details-card">
                        <button
                            className="close-button"
                            onClick={handleCloseCard}
                            aria-label="Close details card"
                        >
                            <FaTimes />
                        </button>
                        <h2>{initialLocations[selectedCard].name}</h2>
                        <ul className="location-details">
                            {initialLocations[selectedCard].details.map((detail, idx) => (
                                <li key={idx} style={{ color: "white" }}>{detail}</li>
                            ))}
                            <li>
                            </li>
                        </ul>
                        <a
                            href={`https://www.google.com/maps?q=${initialLocations[selectedCard].latitude},${initialLocations[selectedCard].longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="location-map-link"
                        >
                            View on Map
                        </a>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Locations;