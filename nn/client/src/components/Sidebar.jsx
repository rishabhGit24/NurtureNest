import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        const currentPath = window.location.pathname;
        const pathToLink = {
            '/home': 'HOME',
            '/location': 'LOCATION',
            '/profile': 'PROFILE',
            '/feedback': 'FEEDBACK',
            '/about-us': 'ABOUT US',
        };
        setActiveLink(pathToLink[currentPath] || 'HOME');

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className={`sidebar ${isOpen || !isMobile ? 'open' : ''}`}>
            <div className="sidebar-header" style={{ backgroundColor: "#fbb03b" }}>
                <i className="fa fa-bars" id="sidebar-toggle" style={{ color: '#007092', fontSize: "1.5em" }} onClick={onClose}></i>
            </div>
            <div className="container" style={{ backgroundColor: "#fbb03b" }}>
                <div className={`sidebar-link ${activeLink === 'HOME' ? 'active' : ''}`}>
                    <i className="fa fa-house" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <Link className="side" to="/home" onClick={() => handleLinkClick('HOME')}>HOME</Link>
                </div>
                <div className={`sidebar-link ${activeLink === 'LOCATION' ? 'active' : ''}`}>
                    <i className="fa fa-location-dot" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <Link className="side" to="/location" onClick={() => handleLinkClick('LOCATION')}>LOCATION</Link>
                </div>
                <div className={`sidebar-link ${activeLink === 'PROFILE' ? 'active' : ''}`}>
                    <i className="fa fa-user" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <Link className="side" to="/profile" onClick={() => handleLinkClick('PROFILE')}>PROFILE</Link>
                </div>
                <div className={`sidebar-link ${activeLink === 'FEEDBACK' ? 'active' : ''}`}>
                    <i className="fa fa-comment-dots" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <Link className="side" to="/feedback" onClick={() => handleLinkClick('FEEDBACK')}>FEEDBACK</Link>
                </div>
                <div className={`sidebar-link ${activeLink === 'ABOUT US' ? 'active' : ''}`}>
                    <i className="fa fa-address-card" style={{ color: '#007092', height: "2em", width: "2em" }}></i>
                    <Link className="side" to="/about-us" onClick={() => handleLinkClick('ABOUT US')}>ABOUT US</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;