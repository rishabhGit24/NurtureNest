import React, { useEffect, useState } from 'react';
import './styles/footer.css'; // Ensure you have a CSS file for styling

const Footer = () => {
    const [isMobile, setIsMobile] = useState(false); // Track mobile screens (<768px)
    const [isLaptop, setIsLaptop] = useState(false); // Track laptop screens (>=768px)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsLaptop(window.innerWidth >= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array ensures it runs once on mount

    return (
        <footer className={`footer ${isMobile ? 'mobile' : ''} ${isLaptop ? 'laptop' : ''}`} >
            <p>@ 2024 NURTURENEST</p>
        </footer>
    );
};

export default Footer;