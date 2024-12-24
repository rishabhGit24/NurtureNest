import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
//import './money.css'; // Ensure this is the correct path to your CSS file

const Money = () => {
    const [map, setMap] = useState(null);
    const [locations] = useState([
        {
            name: 'VATSALYAPURAM TRUST NGO',
            latitude: 12.9224418,
            longitude: 77.5824046,
            description: 'This is VATSALYAPURAM TRUST NGO',
            images: ['1_1.jpg']
        },
        // ...other locations
    ]);

    useEffect(() => {
        const initMap = () => {
            const mapInstance = L.map('map');
            setMap(mapInstance);

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        mapInstance.setView([latitude, longitude], 13);

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: 19,
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }).addTo(mapInstance);

                        addMarkers(mapInstance);
                    },
                    error => {
                        console.error('Error getting location:', error.message);
                        mapInstance.setView([51.505, -0.09], 13);

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: 19,
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }).addTo(mapInstance);

                        addMarkers(mapInstance);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
                mapInstance.setView([51.505, -0.09], 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(mapInstance);

                addMarkers(mapInstance);
            }
        };

        const addMarkers = mapInstance => {
            locations.forEach(location => {
                const marker = L.marker([location.latitude, location.longitude], {
                    icon: L.icon({ iconUrl: 'red_marker.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })
                }).addTo(mapInstance);
                const imagesHtml = location.images.map(image => `<img src="${image}" style="max-width: 50%;" alt="${location.name}">`).join('<br>');
                marker.bindTooltip(`<h3>${location.name}</h3><p>${location.description}</p>${imagesHtml}`).openTooltip();

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
        };

        initMap();
    }, [locations]);

    const handleRelocate = () => {
        if (navigator.geolocation && map) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 15);
                L.marker([latitude, longitude]).addTo(map).bindPopup('You are here').openPopup();
            }, error => {
                console.error('Error getting location:', error.message);
            });
        }
    };

    const handleSearch = () => {
        const searchInput = document.getElementById('searchInput').value;
        const foundLocation = locations.find(location => location.name.toLowerCase() === searchInput.toLowerCase());

        if (foundLocation && map) {
            const marker = L.marker([foundLocation.latitude, foundLocation.longitude], {
                icon: L.icon({ iconUrl: 'red_marker.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34] })
            }).addTo(map);
            const imagesHtml = foundLocation.images.map(image => `<img src="${image}" style="max-width: 50%;" alt="${foundLocation.name}">`).join('<br>');
            marker.bindPopup(`<h3>${foundLocation.name}</h3><p>${foundLocation.description}</p>${imagesHtml}`).openPopup();
            map.setView([foundLocation.latitude, foundLocation.longitude], 13);
        } else {
            alert('Location not found. Please try a different search term.');
        }
    };

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar-header">
                    <i className="fa fa-bars" id="sidebar-toggle" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-house" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-location-dot" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-user" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-comment-dots" style={{ color: '#d43be8' }}></i>
                    <i className="fa fa-address-card" style={{ color: '#d43be8' }}></i>
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

            <h1 id="head">FINANCIAL DONATIONS</h1>

            <section id="gps">
                <section id="map">
                    <button id="relocateBtn" onClick={handleRelocate}>RE-LOCATE</button>
                </section>
            </section>

            <section id="don">
                <div className="inner1"></div>
                <div className="all"></div>
            </section>

            <footer><i className="fa fa-copyright" style={{ color: '#8f48d1' }}></i><p id="cc">CARECONNECT</p><p id="year">|2024</p></footer>
        </div>
    );
};

export default Money;
