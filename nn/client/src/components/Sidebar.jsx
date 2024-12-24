import React, { useEffect, useState } from 'react';
import './styles/sidebar.css'; // Import your sidebar styles

const Sidebar = ({ isOpen, onClose }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`sidebar ${isOpen || !isMobile ? 'open' : ''}`}>
            <div className="sidebar-header" style={{ backgroundColor: "#fbb03b" }}>
                <i className="fa fa-bars" id="sidebar-toggle" style={{ color: '#007092', fontSize: "1.5em" }} onClick={onClose}></i>
            </div>
            <div className="container" style={{ backgroundColor: "#fbb03b" }}>
                <div className="sidebar-link">
                    <i className="fa fa-house" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <a className="side" href="#">HOME</a>
                </div>
                <div className="sidebar-link">
                    <i className="fa fa-location-dot" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <a className="side" href="#">LOCATION</a>
                </div>
                <div className="sidebar-link">
                    <i className="fa fa-user" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <a className="side" href="#">PROFILE</a>
                </div>
                <div className="sidebar-link">
                    <i className="fa fa-comment-dots" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <a className="side" href="#">FEEDBACK</a>
                </div>
                <div className="sidebar-link">
                    <i className="fa fa-address-card" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <a className="side" href="#">ABOUT US</a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar; 