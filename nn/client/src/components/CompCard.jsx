import React, { useEffect, useState } from 'react';
import './styles/compCard.css'; // Ensure you have a CSS file for styling

const CompCard = ({ title, items, onTitleClick, onItemClick }) => {
    const [isMobile, setIsMobile] = useState(false); // Hook state for mobile detection
    const [isLaptop, setIsLaptop] = useState(false); // Hook state for laptop detection

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Set mobile state based on window width
            setIsLaptop(window.innerWidth >= 768 && window.innerWidth < 1024); // Set laptop state
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`comp-card ${isMobile ? 'mobile' : ''} ${isLaptop ? 'laptop' : ''}`} style={{ height: isMobile ? "20em" : "", marginRight: isMobile ? "1em" : "", width: isMobile ? "18em" : "30em", }}>
            <h1 onClick={onTitleClick} style={{ fontSize: isMobile ? "2em" : "", cursor: "pointer", color: "#007092" }}>{title}</h1>
            <hr />
            <div className='cardLi' style={{ fontSize: isMobile ? "50%" : "", }}>
                <ul style={{ minWidth: isMobile ? "12em" : "" }}>
                    {items.map((item, index) => (
                        <li key={index} onClick={() => onItemClick(item)} className={isMobile ? 'mobile-list-item' : ''} style={{ cursor: "pointer", color: "#007092" }}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CompCard;