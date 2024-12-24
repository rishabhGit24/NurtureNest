import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import CompCard from "./CompCard";
import Footer from "./Footer";
import Header from "./Header";
import './styles/home.css';

const Home = () => {
    const [isMobile, setIsMobile] = useState(false); // Hook state for mobile detection
    const [isLaptop, setIsLaptop] = useState(false); // Hook state for laptop detection
    const mapRef = useRef(null); // Ref to store map instance
    const mapContainerRef = useRef(null); // Ref for the map container
    const relocateBtnRef = useRef(null); // Ref for the relocate button
    const [locations, setLocations] = React.useState([]); // State to hold locations

    const addMarkers = (filteredLocations) => {
        if (mapRef.current) {
            // Clear existing markers
            if (mapRef.current.getLayer('markers')) {
                mapRef.current.removeLayer('markers');
                mapRef.current.removeSource('markers');
            }

            // Add markers
            mapRef.current.addSource('markers', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: filteredLocations.map((location) => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [location.longitude, location.latitude]
                        },
                        properties: {
                            name: location.name,
                            description: location.description,
                            images: location.images
                        }
                    }))
                }
            });

            mapRef.current.addLayer({
                id: 'markers',
                type: 'circle',
                source: 'markers',
                paint: {
                    'circle-radius': 10,
                    'circle-color': "red"
                }
            });

            // Add custom markers with popups
            filteredLocations.forEach((location) => {
                const markerElement = document.createElement('div');
                markerElement.className = 'marker'; // Add a class for styling
                markerElement.style.backgroundImage = 'url(/red_marker.png)'; // Use relative path
                markerElement.style.width = '30px'; // Adjust size
                markerElement.style.height = '30px'; // Adjust size
                markerElement.style.backgroundSize = '100%';

                const marker = new mapboxgl.Marker(markerElement)
                    .setLngLat([location.longitude, location.latitude])
                    .addTo(mapRef.current);

                // Create a popup for the marker
                const imagesHtml = location.images
                    .map(image => `<img src="${image}" style="width: 100px; height: auto;" />`)
                    .join("<br>");

                const popupContent = `<div><strong>${location.name}</strong><br>${location.description}<br>${imagesHtml}</div>`;
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

                // Show popup on hover
                markerElement.addEventListener('mouseenter', () => {
                    popup.addTo(mapRef.current);
                });

                // Hide popup on mouse leave
                markerElement.addEventListener('mouseleave', () => {
                    popup.remove();
                });
            });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Set mobile state based on window width
            setIsLaptop(window.innerWidth >= 768); // Set laptop state
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current && mapContainerRef.current) {
            mapboxgl.accessToken = 'pk.eyJ1IjoiZGhhbnVzaDIzMTMiLCJhIjoiY2x3cDJ0a2FkMmt3bjJrcnk1dG93djZmdSJ9.DzeHiUjcr3vOYQ_zVtApow'; // Replace with your Mapbox access token
            const map = new mapboxgl.Map({
                container: mapContainerRef.current, // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // Keep the street-v11 style
                center: [0, 0], // starting position [lng, lat]
                zoom: 2 // starting zoom
            });

            mapRef.current = map;

            // Define locations
            const initialLocations = [
                {
                    name: "VATSALYAPURAM TRUST NGO",
                    latitude: 12.9224418,
                    longitude: 77.5824046,
                    description: "This is VATSALYAPURAM TRUST NGO",
                    images: ["./images/1_1.jpg"],
                },
                {
                    name: "PREMAANAJALI",
                    latitude: 12.9159589,
                    longitude: 77.5911647,
                    description: "This is PREMAANAJALI Orphanage",
                    images: ["./images/2_1.jpg"],
                },
                {
                    name: "NEED BASE INDIA: LAKSHYA UDAAN",
                    latitude: 12.957973,
                    longitude: 77.5887809,
                    description: "This is NEED BASE INDIA: LAKSHYA UDAAN",
                    images: ["./images/3_4.jpg"],
                },
                {
                    name: "Need Base India-Rainbow Home",
                    latitude: 12.0461353, // Corrected latitude
                    longitude: 77.54949548,
                    description: "This is Need Base India-Rainbow Home",
                    images: ["./images/3_2_1.jpg"],
                },
                {
                    name: "KARNATAKA ORPHANAGE AND HANDICAP DEVELOPEMENT CENTER",
                    latitude: 12.9378698,
                    longitude: 77.5387422,
                    description: "This is KARNATAKA ORPHANAGE AND HANDICAP DEVELOPEMENT CENTER",
                    images: ["./images/4_1.jpg"],
                },
                {
                    name: "AMRUTHA SHISHU NIVASA",
                    latitude: 12.941669,
                    longitude: 77.5670684,
                    description: "This is AMRUTHA SHISHU NIVASA",
                    images: ["./images/5_6.jpg"],
                },
                {
                    name: "BELAKU SHISHU NIVASA",
                    latitude: 12.9398111,
                    longitude: 77.566134,
                    description: "This is BELAKU SHISHU NIVASA",
                    images: ["./images/6_2.jpg"],
                },
                {
                    name: "Bosco Yuvodaya",
                    latitude: 12.97935,
                    longitude: 77.57596,
                    description: "This is Bosco Yuvodaya",
                    images: ["./images/7_1_1.jpg"],
                },
                {
                    name: "BOSCO Mane",
                    latitude: 12.9583419,
                    longitude: 77.569181,
                    description: "This is BOSCO Mane",
                    images: ["./images/7_2_1.jpg"],
                },
                {
                    name: "BOSCO Yuvakendra",
                    latitude: 12.9730467,
                    longitude: 77.56277,
                    description: "This is BOSCO Yuvakendra",
                    images: ["./images/7_3_1.jpg"],
                },
                {
                    name: "BOSCO Nilaya",
                    latitude: 12.9674429,
                    longitude: 77.571919,
                    description: "This is BOSCO Nilaya",
                    images: ["./images/7_4_1.jpg"],
                },
                {
                    name: "BOSCO Summanahalli",
                    latitude: 12.9807156,
                    longitude: 77.517275,
                    description: "This is BOSCO Summanahalli ",
                    images: ["./images/7_4_1.jpg"],
                },
                {
                    name: "BOSCO Nivas",
                    latitude: 12.9848622,
                    longitude: 77.60404,
                    description: "This is BOSCO Nivas ",
                    images: ["./images/7_4_1.jpg"],
                },
                {
                    name: "BOSCO Vatsalya Bhavan",
                    latitude: 12.9598526,
                    longitude: 77.567894,
                    description: "This is BOSCO Vatsalya Bhavan",
                    images: ["./images/7_6_1.jpg"],
                },
                {
                    name: "Auxilium Navajeevana",
                    latitude: 12.9607131,
                    longitude: 77.563616,
                    description: "This is Auxilium Navajeevana",
                    images: ["./images/8_1.jpg"],
                },
            ];

            setLocations(initialLocations); // Set locations in state

            map.on('load', () => {
                // Call addMarkers only after the map has loaded
                addMarkers(initialLocations);
            });

            const getUserLocation = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude } = position.coords;
                        const userLocation = [longitude, latitude];

                        mapRef.current.setCenter(userLocation);
                        mapRef.current.setZoom(13);
                    }, () => {
                        console.error('Error getting location.');
                    });
                } else {
                    console.error('Geolocation is not supported by this browser.');
                }
            };

            // Add event listener to the relocate button
            relocateBtnRef.current.addEventListener('click', getUserLocation);

            getUserLocation();

            return () => {
                if (mapRef.current) {
                    mapRef.current.remove();
                    mapRef.current = null;
                }
            };
        }
    }, []);

    // Search functionality
    const handleSearch = () => {
        const searchInput = document.getElementById("searchInput").value.toLowerCase();
        const filteredLocations = locations.filter(location =>
            location.name.toLowerCase().includes(searchInput)
        );
        addMarkers(filteredLocations); // Update markers based on search
    };

    const categories = [
        { title: 'Food', items: ['Plate Meals', 'Bulk Items', 'Raw Items', 'Processed Items'] },
        { title: 'Clothes', items: ['Men', 'Women', 'Kids'] },
        { title: 'Education', items: ['Stationary', 'Bags', 'Essentials'] },
        { title: 'Medical', items: ['Cotton', 'Tapes', 'Scissor', 'Dettol'] },
        { title: 'Money', items: ['UPI'] },
        { title: 'Hygiene', items: ['Brushing Essentials', 'Soap', 'Skin Care', 'Other Amenities'] },
    ];

    return (
        <div className={`Full ${isMobile ? 'mobile' : ''} ${isLaptop ? 'laptop' : ''}`}>
            <Header />
            <div className={`search-container ${isMobile ? 'mobile-search-container' : ''} ${isLaptop ? 'laptop-search-container' : ''}`}>
                <div className={`search-bar ${isMobile ? 'mobile-search-bar' : ''} ${isLaptop ? 'laptop-search-bar' : ''}`}>
                    <input type="text" id="searchInput" name="text" placeholder="Search Orphanages..." />
                    <button type="submit" id="searchButton" onClick={handleSearch} style={{ width: isMobile ? "" : "", marginLeft: isMobile ? "-1em" : "", marginTop: isMobile ? "-0.5em" : "" }}>Search</button>
                </div>
            </div>
            <section id="gps" className={isMobile ? 'mobile-gps' : ''} style={{ marginLeft: isMobile ? "1em" : "" }}>
                <section ref={mapContainerRef} id="map" className={isMobile ? 'mobile-map' : ''}>
                    <div id="map-element"></div>
                    <button ref={relocateBtnRef} id="relocateBtn" className={isMobile ? 'mobile-relocate-btn' : ''} style={{ width: isMobile ? "40%" : "", marginRight: isMobile ? "-2em" : "" }}><b>Re-Locate</b></button>
                </section>
            </section>
            <section id="don" className={`donations ${isMobile ? 'mobile-donations' : ''}`} style={{ width: isMobile ? "100%" : "", marginLeft: isMobile ? "1em" : "" }}>
                <div className={`all ${isMobile ? 'mobile-all' : ''}`} style={{ marginLeft: isMobile ? "-10em" : "" }}>
                    {categories.map((category, index) => (
                        <CompCard key={index} title={category.title} items={category.items} />
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
