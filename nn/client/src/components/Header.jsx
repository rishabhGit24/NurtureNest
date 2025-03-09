import React, { useEffect, useState } from "react";
import nn3 from '../assets/images/small_nn1.jpg';
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
            <div className="navbar" style={{ paddingLeft: isMobile ? "4em" : "" }}>
                <div className="top_logo">
                    <img id="toplogo" src={nn3} alt="NurtureNest Logo" style={{ backgroundColor: "#007092", width: isMobile ? "100%" : "20%", height: isMobile ? "100%" : "", marginTop: isMobile ? "2em" : "", padding: isMobile ? "1em 0" : "", marginLeft: isMobile ? "-9em" : "", position: isMobile ? "relative" : "", }} />
                </div>
            </div>
        </div>
    );
}