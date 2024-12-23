import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import './styles/food.css';

const Food = () => {
    const mapRef = useRef(null); // Ref to store map instance

    useEffect(() => {
        if (mapRef.current) return; // Exit if the map is already initialized

        const map = L.map('map', {
            center: [0, 0],
            zoom: 2,
            zoomControl: true,
            attributionControl: false
        });
        mapRef.current = map; // Store map instance in ref

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const locations = [
            {
                name: 'VATSALYAPURAM TRUST NGO',
                latitude: 12.9224418,
                longitude: 77.5824046,
                description: 'This is VATSALYAPURAM TRUST NGO',
                images: ["1_1.jpg"]
            },
            // Add more locations as needed
        ];

        const addMarkers = (userLocation) => {
            locations.forEach(location => {
                const marker = L.marker([location.latitude, location.longitude], {
                    icon: L.icon({
                        iconUrl: 'red_marker.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34]
                    })
                }).addTo(map);

                const imagesHtml = location.images.map(image => `<img src="${image}" style="max-width: 50%; display: none;" alt="${location.name}" />`).join('<br>');
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

            if (userLocation) {
                L.marker(userLocation).addTo(map).bindPopup('You are here').openPopup();
                map.setView(userLocation, 13);
            }
        };

        const handleLocationError = () => {
            console.error('Error getting location.');
            addMarkers();
            map.setView([51.505, -0.09], 13); // Default location
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                addMarkers([latitude, longitude]);
            }, handleLocationError);
        } else {
            console.error('Geolocation is not supported by this browser.');
            handleLocationError();
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove(); // Clean up map on component unmount
                mapRef.current = null;
            }
        };
    }, []);

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
                    <a className="side" href="home.html">HOME</a>
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
                <button type="submit" id="searchButton">Search</button>
            </div>

            <h1 id="head">FOOD DONATIONS</h1>

            <section id="gps">
                <section id="map">
                    <button id="relocateBtn">RE-LOCATE</button>
                </section>
            </section>

            <section id="don">
                <div className="inner1"></div>
                <div className="all">
                    <ul>
                        <li>
                            A survey conducted in 2021 found that 75% of Indians are willing to donate food, but lack a convenient platform to do so. This NurtureNest web-app aims to bridge this gap by connecting food donors with those in need.
                        </li><br /><hr id="sep" />
                        <li>
                            Food waste is a significant issue in India, with an estimated 40% of food going to waste.
                            75% of Indians are willing to donate food, but lack a convenient platform to do so.
                            Food donation can have a positive impact on both healthcare and the environment by reducing hunger and food waste.
                            There is a growing need for efficient food donation systems to connect food donors with those in need.
                        </li><br /><hr id="sep" />
                        <li>
                            A survey conducted by Uday Foundation found that 80% of Indians believe that food donation is an important social responsibility. Hence, we'd like to enhance the accessibility between potential donors and orphanages willing to accept valuable donations.
                        </li><br /><hr id="sep" />
                        <li>
                            FOOD CAN BE GIVEN AWAY IN FORM OF:<br /><br />
                            Donations Accepted in Quantity of plates<br />
                            Donations Accepted in Quantity of Kilograms for Prepared food but in Bulk<br />
                            Donations Accepted in Quantity of Kilograms for Raw Groceries like Rice, Wheat, Grams, etc,.<br />
                            Donations Accepted in Quantity of Packets for classification of Processed Items such as Packets of Biscuits, Munchies etc,.
                        </li>
                    </ul>
                </div>
            </section>

            <div className="navbar2">
                <div className="nav2">
                    <a href="#" id="selected2" className="icon2">
                        <i className="fa-solid fa-house"></i>
                    </a>
                    <a href="#" className="icon2">
                        <i className="fa-solid fa-location-dot"></i>
                    </a>
                    <a href="#" className="icon2">
                        <i className="fa-solid fa-comment-dots"></i>
                    </a>
                    <a href="#" className="icon2">
                        <i className="fa-solid fa-user"></i>
                    </a>
                    <a href="#" className="icon2">
                        <i className="fa-solid fa-address-card"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Food;
