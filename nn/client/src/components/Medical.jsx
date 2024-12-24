import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import './styles/medical.css';

const Medical = () => {

    useEffect(() => {
        // Initialize the map
        const map = L.map('map');

        // Array of location data
        const locations = [
            { name: 'VATSALYAPURAM TRUST NGO', latitude: 12.9224418, longitude: 77.5824046, description: 'This is VATSALYAPURAM TRUST NGO', images: ["1_1.jpg"] },
            { name: 'PREMAANAJALI', latitude: 12.9159589, longitude: 77.5911647, description: 'This is PREMAANAJALI Orphanage', images: ["2_1.jpg"] },
            // ... (other locations)
        ];

        const addMarkers = (lat, lon) => {
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            locations.forEach(location => {
                const marker = L.marker([location.latitude, location.longitude], {
                    icon: L.icon({ iconUrl: 'red_marker.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })
                }).addTo(map);

                const imagesHtml = location.images.map(image => `<img src="${image}" style="max-width: 50%; display: none;" alt="${location.name}">`).join('<br>');

                marker.bindTooltip(`<h3 style="display: none;">${location.name}</h3><p style="display: none;">${location.description}</p>${imagesHtml}`).openTooltip();

                marker.on('mouseover', function () {
                    this.getTooltip().getElement().querySelector('h3').style.display = 'block';
                    this.getTooltip().getElement().querySelector('p').style.display = 'block';
                    this.getTooltip().getElement().querySelectorAll('img').forEach(img => img.style.display = 'block');
                });

                marker.on('mouseout', function () {
                    this.getTooltip().getElement().querySelector('h3').style.display = 'none';
                    this.getTooltip().getElement().querySelector('p').style.display = 'none';
                    this.getTooltip().getElement().querySelectorAll('img').forEach(img => img.style.display = 'none');
                });
            });

            L.marker([lat, lon]).addTo(map).bindPopup('You are here').openPopup();
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    map.setView([latitude, longitude], 13);
                    addMarkers(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                    map.setView([51.505, -0.09], 13);
                    addMarkers(51.505, -0.09);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            map.setView([51.505, -0.09], 13);
            addMarkers(51.505, -0.09);
        }

        // Sidebar toggle functionality
        const sidebar = document.querySelector('.sidebar');
        sidebar.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        sidebar.addEventListener('mouseenter', () => {
            sidebar.classList.add('active');
        });

        sidebar.addEventListener('mouseleave', () => {
            sidebar.classList.remove('active');
        });

        // Relocate button functionality
        document.getElementById('relocateBtn').addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    map.setView([latitude, longitude], 15);
                    L.marker([latitude, longitude]).addTo(map).bindPopup('You are here').openPopup();
                });
            }
        });

        // Search functionality
        document.getElementById('searchButton').addEventListener('click', () => {
            const searchInput = document.getElementById('searchInput').value;
            const foundLocation = locations.find(location => location.name.toLowerCase() === searchInput.toLowerCase());

            if (foundLocation) {
                const marker = L.marker([foundLocation.latitude, foundLocation.longitude], {
                    icon: L.icon({ iconUrl: 'red_marker.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })
                }).addTo(map);
                const imagesHtml = foundLocation.images.map(image => `<img src="${image}" style="max-width: 50%;" alt="${foundLocation.name}">`).join('<br>');
                marker.bindPopup(`<h3>${foundLocation.name}</h3><p>${foundLocation.description}</p>${imagesHtml}`).openPopup();
                map.setView([foundLocation.latitude, foundLocation.longitude], 13);
            } else {
                alert('Location not found. Please try a different search term.');
            }
        });

    }, []);

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar-header">
                    <i className="fa fa-bars" id="sidebar-toggle" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-home" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-location-arrow" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-user" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-comments" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-address-card" style={{ color: '#d43be8' }}></i>
                </div>
                <div className="container">
                    <a className="side" href="Home.jsx">HOME</a>
                    <a className="side" href="#">LOCATION</a>
                    <a className="side" href="#">PROFILE</a>
                    <a className="side" href="#">FEEDBACK</a>
                    <a className="side" href="#">ABOUT US</a>
                </div>
            </div>

            <div className="navbar">
                <div className="top_logo">
                    <img id="toplogo" src="nn2.png" alt="CareConnect Logo" />
                </div>
            </div>

            <div className="search-bar">
                <input type="text" id="searchInput" name="text" className="input" placeholder="Search Orphanages..." />
                <button type="submit" id="searchButton">Search</button>
            </div>

            <h1 id="head">MEDICAL DONATIONS</h1>

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
                <i className="fa fa-copyright" style={{ color: '#8f48d1' }}>
                    <p id="cc">CARECONNECT</p><p id="year">|2024</p>
                </i>
            </footer>
        </div>
    );
};

export default Medical;
