import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef } from 'react';
import './styles/clothes.css';

const Clothes = () => {
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
            { name: 'VATSALYAPURAM TRUST NGO', latitude: 12.9224418, longitude: 77.5824046, description: 'This is VATSALYAPURAM TRUST NGO', images: ["1_1.jpg"] },
            { name: 'PREMAANAJALI', latitude: 12.9159589, longitude: 77.5911647, description: 'This is PREMAANAJALI Orphanage', images: ["2_1.jpg"] },
            // Add the rest of the locations here...
        ];

        let userLocation;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                userLocation = [latitude, longitude];

                map.setView(userLocation, 13);

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

                L.marker(userLocation).addTo(map).bindPopup('You are here').openPopup();
            }, error => {
                console.error('Error getting location:', error.message);
                map.setView([51.505, -0.09], 13);
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
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
            map.setView([51.505, -0.09], 13);
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
        }

        const relocateBtn = document.getElementById('relocateBtn');
        relocateBtn.addEventListener('click', function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;
                    map.setView([latitude, longitude], 15);
                    L.marker([latitude, longitude]).addTo(map).bindPopup('You are here').openPopup();
                }, error => {
                    console.error('Error getting location:', error.message);
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        });

        const searchButton = document.getElementById('searchButton');
        searchButton.addEventListener('click', function () {
            const searchInput = document.getElementById('searchInput');
            const locationName = searchInput.value;
            searchLocation(locationName);
        });

        function searchLocation(locationName) {
            const foundLocation = locations.find(location => location.name.toLowerCase() === locationName.toLowerCase());

            if (foundLocation) {
                const marker = L.marker([foundLocation.latitude, foundLocation.longitude], {
                    icon: L.icon({
                        iconUrl: 'red_marker.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34]
                    })
                }).addTo(map);
                const imagesHtml = foundLocation.images.map(image => `<img src="${image}" style="max-width: 50%;" alt="${foundLocation.name}" />`).join('<br>');
                marker.bindPopup(`<h3>${foundLocation.name}</h3><p>${foundLocation.description}</p>${imagesHtml}`).openPopup();
                map.setView([foundLocation.latitude, foundLocation.longitude], 13);
            } else {
                alert('Location not found. Please try a different search term.');
            }
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
                    <i className="fa-solid fa-bars" style={{ color: '#d43be8' }}></i>
                </div>
                <div className="searchbar">
                    <input type="text" id="searchInput" className="form-control" placeholder="Enter Location" />
                    <button id="searchButton" className="btn btn-primary">Search</button>
                    <button id="relocateBtn" className="btn btn-secondary">Re-locate</button>
                </div>
            </div>
            <div id="map" style={{ height: '100vh', width: '100%' }}></div>
        </div>
    );
};

export default Clothes;
