import React, { useEffect, useState } from "react";
import nn3 from '../assets/images/nn3.png';
import "./styles/header.css";

export default function Header() {
    const [isMobile, setIsMobile] = useState(false);
    const [isLaptop, setIsLaptop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsLaptop(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`header ${isMobile ? 'mobile-header' : ''} ${isLaptop ? 'laptop-header' : ''}`}>
            <div className="sidebar">
                <div className="sidebar-header" style={{ backgroundColor: "#fbb03b" }}>
                    <i className="fa fa-bars" id="sidebar-toggle" style={{ color: '#007092', backgroundColor: "#fbb03b", marginBottom: "-35em", marginLeft: "1em", fontSize: "1.5em" }}></i>
                </div>
                <div className="container" style={{ backgroundColor: "#fbb03b", }}>
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

            <div className="navbar" style={{ paddingLeft: isMobile ? "4em" : "" }}>
                <div className="top_logo">
                    <img id="toplogo" src={nn3} alt="NurtureNest Logo" style={{ backgroundColor: "#007092", width: "20em", height: "20em", marginTop: "" }} />
                </div>
            </div>
        </div>
    );
}