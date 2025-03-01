import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import greenMarker from "../assets/images/green_marker.png";
import redMarker from "../assets/images/red_marker.png";
import DonationRequestForm from './DonationRequestForm';
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./styles/clothes.css";

const Clothes = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false); // Hook state for mobile detection
    const [isLaptop, setIsLaptop] = useState(false); // Hook state for laptop detection
    const mapRef = useRef(null); // Ref to store map instance
    const mapContainerRef = useRef(null); // Ref for the map container
    const relocateBtnRef = useRef(null); // Ref for the relocate button
    const [locations, setLocations] = React.useState([]); // State to hold locations
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

    useEffect(() => {
        const loginCheck = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:5000/api/auth/check",
                    {},
                    { withCredentials: true } // Ensure cookies are included in the request
                );
                if (!response.data.valid) {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error checking token:", error);
                navigate("/");
            }
        };

        loginCheck();
    }, []);

    const addMarkers = (filteredLocations) => {
        if (mapRef.current) {
            // Clear existing markers
            if (mapRef.current.getLayer("markers")) {
                mapRef.current.removeLayer("markers");
            }

            // Remove the existing source if it exists
            if (mapRef.current.getSource("markers")) {
                mapRef.current.removeSource("markers");
            }

            // Add markers
            mapRef.current.addSource("markers", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: filteredLocations.map((location) => ({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [location.longitude, location.latitude],
                        },
                        properties: {
                            name: location.name,
                            description: location.description,
                            images: location.images,
                        },
                    })),
                },
            });

            // Add custom markers with popups
            filteredLocations.forEach((location) => {
                const markerElement = document.createElement("div");
                markerElement.className = "marker"; // Add a class for styling
                markerElement.style.backgroundImage = `url(${greenMarker})`; // Use green_marker.png
                markerElement.style.width = "50px"; // Adjust size
                markerElement.style.height = "50px"; // Adjust size
                markerElement.style.backgroundSize = "100%";

                const marker = new mapboxgl.Marker(markerElement)
                    .setLngLat([location.longitude, location.latitude])
                    .addTo(mapRef.current);

                // Create a popup for the marker
                const imagesHtml = location.images
                    .map(
                        (image) =>
                            `<img src="${require(`${image}`)}" style="width: 300px; height: auto;" />`
                    )
                    .join("<br>");

                const popupContent = `<div><strong>${location.name}</strong><br>${location.description}<br>${imagesHtml}</div>`;
                const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

                // Show popup on hover
                markerElement.addEventListener("mouseenter", () => {
                    popup.addTo(mapRef.current);
                    popup.setLngLat([location.longitude, location.latitude]); // Position the popup
                });

                // Hide popup on mouse leave
                markerElement.addEventListener("mouseleave", () => {
                    popup.remove();
                });

                // Add click event to show the shortest path and details
                markerElement.addEventListener("click", () => {
                    const userLocation = mapRef.current.getCenter().toArray(); // Get user's current location
                    const destination = [location.longitude, location.latitude];

                    // Fetch directions from Mapbox Directions API
                    fetch(
                        `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${destination[0]},${destination[1]}?access_token=pk.eyJ1IjoiZGhhbnVzaDIzMTMiLCJhIjoiY2x3cDJ0a2FkMmt3bjJrcnk1dG93djZmdSJ9.DzeHiUjcr3vOYQ_zVtApow`
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            const route = data.routes[0];
                            const distance = route.distance / 1000; // Convert to kilometers
                            const duration = route.duration / 60; // Convert to minutes

                            // Add the route to the map
                            const routeGeoJSON = {
                                type: "Feature",
                                geometry: {
                                    type: "LineString",
                                    coordinates: route.geometry.coordinates,
                                },
                            };

                            // Add the route layer
                            if (mapRef.current.getLayer("route")) {
                                mapRef.current.removeLayer("route");
                                mapRef.current.removeSource("route");
                            }

                            mapRef.current.addSource("route", {
                                type: "geojson",
                                data: routeGeoJSON,
                            });

                            mapRef.current.addLayer({
                                id: "route",
                                type: "line",
                                source: "route",
                                layout: {
                                    "line-join": "round",
                                    "line-cap": "round",
                                },
                                paint: {
                                    "line-color": "#888",
                                    "line-width": 8,
                                },
                            });

                            // Display distance, duration, and place details on the map
                            const infoDiv = document.getElementById("route-info");
                            const imageHtml =
                                location.images.length > 0
                                    ? `<img src="${require(`${location.images[0]}`)}" style="width: 100%; height: auto;" />`
                                    : ""; // Get the first image
                            infoDiv.innerHTML = `
                                <strong>${location.name}</strong><br>
                                ${imageHtml}
                                ${location.description}<br>
                                Distance: ${distance.toFixed(2)} km<br>
                                Duration: ${duration.toFixed(2)} minutes
                            `;
                            infoDiv.style.display = "block"; // Show the info div
                        })
                        .catch((error) =>
                            console.error("Error fetching directions:", error)
                        );
                });
            });
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Set mobile state based on window width
            setIsLaptop(window.innerWidth >= 768); // Set laptop state
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current && mapContainerRef.current) {
            mapboxgl.accessToken =
                "pk.eyJ1IjoiZGhhbnVzaDIzMTMiLCJhIjoiY2x3cDJ0a2FkMmt3bjJrcnk1dG93djZmdSJ9.DzeHiUjcr3vOYQ_zVtApow"; // Replace with your Mapbox access token
            const map = new mapboxgl.Map({
                container: mapContainerRef.current, // container ID
                style: "mapbox://styles/mapbox/streets-v11", // Keep the street-v11 style
                center: [0, 0], // starting position [lng, lat]
                zoom: 2, // starting zoom
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
                    description:
                        "This is KARNATAKA ORPHANAGE AND HANDICAP DEVELOPEMENT CENTER",
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

            map.on("load", () => {
                // Call addMarkers only after the map has loaded
                addMarkers(initialLocations);
            });

            const getUserLocation = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            const userLocation = [longitude, latitude];

                            mapRef.current.setCenter(userLocation);
                            mapRef.current.setZoom(13);

                            // Add a marker for the user's current location
                            const userMarkerElement = document.createElement("div");
                            userMarkerElement.className = "user-marker"; // Add a class for styling
                            userMarkerElement.style.backgroundImage = `url(${redMarker})`; // Use the imported image
                            userMarkerElement.style.width = "50px"; // Adjust size to ensure visibility
                            userMarkerElement.style.height = "50px"; // Adjust size to ensure visibility
                            userMarkerElement.style.backgroundSize = "contain"; // Ensure the image fits within the div
                            userMarkerElement.style.backgroundRepeat = "no-repeat"; // Prevent repeating the image
                            userMarkerElement.style.backgroundPosition = "center"; // Center the image
                            userMarkerElement.style.border = "none"; // Remove any border
                            userMarkerElement.style.borderRadius = "0"; // Remove border radius
                            userMarkerElement.style.backgroundColor = "transparent"; // Ensure no background color

                            new mapboxgl.Marker(userMarkerElement)
                                .setLngLat(userLocation)
                                .addTo(mapRef.current);
                        },
                        () => {
                            console.error("Error getting location.");
                        }
                    );
                } else {
                    console.error("Geolocation is not supported by this browser.");
                }
            };

            // Add event listener to the relocate button
            relocateBtnRef.current.addEventListener("click", getUserLocation);

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
        const searchInput = document
            .getElementById("searchInput")
            .value.toLowerCase();
        const filteredLocations = locations.filter((location) =>
            location.name.toLowerCase().includes(searchInput)
        );

        // Clear existing markers
        if (mapRef.current) {
            if (mapRef.current.getLayer("markers")) {
                mapRef.current.removeLayer("markers");
                mapRef.current.removeSource("markers");
            }
        }

        // Add markers based on search results
        addMarkers(filteredLocations); // Update markers based on search

        // Optionally, you can adjust the map view to fit the filtered locations
        if (filteredLocations.length > 0) {
            const bounds = new mapboxgl.LngLatBounds();
            filteredLocations.forEach((location) => {
                bounds.extend([location.longitude, location.latitude]);
            });
            mapRef.current.fitBounds(bounds, { padding: 20 }); // Adjust the map view to fit the markers
        }
    };


    const handleLogout = async () => {
        await axios.post(
            "http://localhost:5000/api/auth/logout",
            {},
            { withCredentials: true }
        );
        navigate("/");
    };

    return (
        <div
            className={`Full ${isMobile ? "mobile" : ""} ${isLaptop ? "laptop" : ""}`}
        >
            <Header />
            <button
                onClick={handleLogout}
                className="logout-button"
                style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    backgroundColor: "orange",
                    color: "teal",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
            >
                Logout
            </button>
            {isMobile && (
                <button
                    onClick={toggleSidebar}
                    className="sidebar-icon"
                    style={{ marginLeft: "" }}
                >
                    <FaBars />
                </button>
            )}
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <div
                id="route-info"
                style={{
                    display: "none",
                    position: "absolute",
                    background: "rgba(255, 255, 255, 0.8)", // Slightly transparent white background
                    padding: "15px",
                    borderRadius: "8px",
                    zIndex: 1,
                    fontFamily: "Arial, sans-serif", // Font family
                    color: "#333", // Text color
                    minWidth: "200px",
                    maxWidth: "300px", // Max width for the info box
                    textAlign: "center",
                    marginLeft: isMobile ? "" : "10em",
                    marginTop: isMobile ? "" : "10em",
                }}
            >
                {/* Distance, duration, and place details will be displayed here */}
            </div>
            <div
                className={`search-container ${isMobile ? "mobile-search-container" : ""
                    } ${isLaptop ? "laptop-search-container" : ""}`}
                style={{
                    display: isMobile ? "" : "",
                    paddingBottom: isMobile ? "2em" : "",
                }}
            >
                <div
                    className={`search-bar ${isMobile ? "mobile-search-bar" : ""} ${isLaptop ? "laptop-search-bar" : ""
                        }`}
                >
                    <input
                        type="text"
                        id="searchInput"
                        name="text"
                        placeholder="Search Orphanages..."
                    />
                    <button
                        type="submit"
                        id="searchButton"
                        onClick={handleSearch}
                        style={{
                            width: isMobile ? "" : "",
                            marginLeft: isMobile ? "-1em" : "",
                            marginTop: isMobile ? "-0.5em" : "",
                        }}
                    >
                        Search
                    </button>
                </div>
            </div>
            <h1 i style={{ color: "white", fontSize: isMobile ? "2.5em" : "5em", marginBottom: isMobile ? "2em" : "", paddingTop: isMobile ? "" : "0.5em", paddingBottom: isMobile ? "" : "0.5em" }}>CLOTHES DONATIONS</h1>
            <section
                id="gps"
                className={isMobile ? "mobile-gps" : ""}
                style={{
                    marginLeft: isMobile ? "" : "",
                    marginTop: isMobile ? "-2em" : "",
                    width: isMobile ? "108%" : "",
                    marginBottom: isMobile ? "-2em" : "",
                }}
            >
                <section
                    ref={mapContainerRef}
                    id="map"
                    className={isMobile ? "mobile-map" : ""}
                    style={{ height: isMobile ? "40em" : "" }}
                >
                    <div id="map-element"></div>
                    <button
                        ref={relocateBtnRef}
                        id="relocateBtn"
                        className={isMobile ? "mobile-relocate-btn" : ""}
                        style={{
                            width: isMobile ? "40%" : "",
                            marginRight: isMobile ? "-2em" : "",
                        }}
                    >
                        <b>Re-Locate</b>
                    </button>
                </section>
            </section>
            <section
                className={`donations ${isMobile ? "mobile-donations" : ""}`}
                style={{
                    width: isMobile ? "100%" : "",
                    marginLeft: isMobile ? "1em" : "",
                }}
            >
                <h2 style={{ color: "#007092" }}>What do you want to Donate?</h2>
                <div
                    className={`all ${isMobile ? "mobile-all" : ""}`}
                    style={{ marginLeft: isMobile ? "-10em" : "" }}
                >
                    <section id="don" style={{ marginLeft: isMobile ? "" : "-12em", marginTop: isMobile ? "" : "130em", fontSize: isMobile ? "" : "7px" }}>
                        <div className="inner1"></div>
                        <div className="all">
                            <ul>
                                <li>
                                    A survey conducted in 2021 found that a significant number of Indians are willing to donate clothes, but lack a convenient platform to do so. This NurtureNest web-app aims to bridge this gap by connecting clothing donors with those in need.
                                </li><br /><hr id="sep" />
                                <li>
                                    Clothing waste is a pressing issue in India, with millions of garments discarded each year. Many individuals are willing to donate clothes, but they often face challenges in finding the right channels to do so. Clothing donation can have a positive impact on both the environment and the community by reducing waste and providing essential items to those in need. There is a growing need for efficient clothing donation systems to connect donors with individuals and organizations that can benefit from these contributions.
                                </li><br /><hr id="sep" />
                                <li>
                                    A survey conducted by various NGOs found that a large percentage of people believe that donating clothes is an important social responsibility. Hence, we'd like to enhance the accessibility between potential donors and organizations willing to accept valuable clothing donations.
                                </li><br /><hr id="sep" />
                                <li>
                                    CLOTHES CAN BE GIVEN AWAY FOR:<br /><br />
                                    1. Donations accepted for <strong>Men's clothing</strong>.<br />
                                    2. Donations accepted for <strong>Women's clothing</strong>.<br />
                                    3. Donations accepted for <strong>Kids' clothing</strong>.
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
                <div style={{ marginTop: isMobile ? "" : "120em", }}>
                    <DonationRequestForm />
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Clothes;
