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
            <div className="navbar" style={{ paddingLeft: isMobile ? "4em" : "" }}>
                <div className="top_logo">
                    <img id="toplogo" src={nn3} alt="NurtureNest Logo" style={{ backgroundColor: "#007092", width: isMobile ? "18em" : "20em", height: isMobile ? "18em" : "20em", marginTop: isMobile ? "-2em" : "" }} />
                </div>
            </div>
        </div>
    );
}