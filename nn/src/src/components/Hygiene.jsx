import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
//import './hygiene.css'; // Assuming the CSS file is renamed and moved accordingly

const Hygiene = () => {
    const [map, setMap] = useState(null);

    useEffect(() => {
        const mapInstance = L.map('map');
        setMap(mapInstance);

        // Initialize map and location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    mapInstance.setView([latitude, longitude], 13);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    }).addTo(mapInstance);

                    addMarkers(mapInstance);
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                    mapInstance.setView([51.505, -0.09], 13);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            mapInstance.setView([51.505, -0.09], 13);
        }
    }, []);

    const addMarkers = (mapInstance) => {
        const locations = [
            { name: 'VATSALYAPURAM TRUST NGO', latitude: 12.9224418, longitude: 77.5824046, description: 'This is VATSALYAPURAM TRUST NGO', images: ['1_1.jpg'] },
            { name: 'PREMAANAJALI', latitude: 12.9159589, longitude: 77.5911647, description: 'This is PREMAANAJALI Orphanage', images: ['2_1.jpg'] },
            // Add other locations here...
        ];

        locations.forEach((location) => {
            const marker = L.marker([location.latitude, location.longitude], {
                icon: L.icon({ iconUrl: 'red_marker.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] }),
            }).addTo(mapInstance);

            const imagesHtml = location.images
                .map((image) => `<img src="${image}" style="max-width: 50%; display: none;" alt="${location.name}">`)
                .join('<br>');
            marker.bindTooltip(
                `<h3 style="display: none;">${location.name}</h3><p style="display: none;">${location.description}</p>${imagesHtml}`
            );

            marker.on('mouseover', function () {
                this.getTooltip().getElement().querySelector('h3').style.display = 'block';
                this.getTooltip().getElement().querySelector('p').style.display = 'block';
                this.getTooltip().getElement().querySelectorAll('img').forEach((img) => (img.style.display = 'block'));
            });

            marker.on('mouseout', function () {
                this.getTooltip().getElement().querySelector('h3').style.display = 'none';
                this.getTooltip().getElement().querySelector('p').style.display = 'none';
                this.getTooltip().getElement().querySelectorAll('img').forEach((img) => (img.style.display = 'none'));
            });
        });
    };

    const handleSearch = () => {
        const searchInput = document.getElementById('searchInput').value;
        searchLocation(searchInput);
    };

    const searchLocation = (locationName) => {
        console.log('Searching for:', locationName);
        // Implement search functionality here using the `locations` array
    };

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar-header">
                    <i className="fa-solid fa-bars" id="sidebar-toggle" style={{ color: '#d43be8' }}></i>
                    <i className="fa-solid fa-house" style={{ color: '#d43be8' }}></i>
                    <i className="fa-solid fa-location-dot" style={{ color: '#d43be8' }}></i>
                    <i className="fa-solid fa-user" style={{ color: '#d43be8' }}></i>
                    <i className="fa-solid fa-comment-dots" style={{ color: '#d43be8' }}></i>
                    <i className="fa-solid fa-address-card" style={{ color: '#d43be8' }}></i>
                </div>
                <div className="container">
                    <a className="side" href="home.html"> HOME</a>
                    <a className="side" href="#">LOCATION</a>
                    <a className="side" href="#">PROFILE</a>
                    <a className="side" href="#">FEEDBACK</a>
                    <a className="side" href="#">ABOUT US</a>
                </div>
            </div>

            <div className="navbar">
                <div className="top_logo">
                    <img id="toplogo" src="nn2.png" alt="Top Logo" />
                </div>
            </div>

            <div className="search-bar">
                <input type="text" id="searchInput" name="text" className="input" placeholder="Search Orphanages..." />
                <button type="submit" id="searchButton" onClick={handleSearch}>Search</button>
            </div>

            <h1 id="head">HYGIENE DONATIONS</h1>

            <section id="gps">
                <section id="map">
                    <button id="relocateBtn">RE-LOCATE</button>
                </section>
            </section>

            <section id="don">
                <div className="inner1"></div>
                <div className="all"></div>
            </section>

            <footer>
                <i className="fa-regular fa-copyright" style={{ color: '#8f48d1' }}>
                    <p id="cc">CARECONNECT</p>
                    <p id="year">|2024</p>
                </i>
            </footer>
        </div>
    );
};

export default Hygiene;
