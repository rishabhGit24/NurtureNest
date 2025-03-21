import { faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import greenMarker from "../assets/images/green_marker.png";
import redMarker from "../assets/images/red_marker.png";
import CompCard from "./CompCard";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const relocateBtnRef = useRef(null);
  const [locations, setLocations] = React.useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Ref to track sidebar element

  useEffect(() => {
    const loginCheck = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.post(
          "http://192.168.29.7:4000/api/auth/check",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
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
  }, [navigate]);

  const addMarkers = (filteredLocations) => {
    if (mapRef.current) {
      if (mapRef.current.getLayer("markers")) {
        mapRef.current.removeLayer("markers");
      }
      if (mapRef.current.getSource("markers")) {
        mapRef.current.removeSource("markers");
      }

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

      filteredLocations.forEach((location) => {
        const markerElement = document.createElement("div");
        markerElement.className = "marker";
        markerElement.style.backgroundImage = `url(${greenMarker})`;
        markerElement.style.width = "50px";
        markerElement.style.height = "50px";
        markerElement.style.backgroundSize = "100%";

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([location.longitude, location.latitude])
          .addTo(mapRef.current);

        const imagesHtml = location.images
          .map(
            (image) =>
              `<img src="${require(`${image}`)}" style="width: 300px; height: auto;" />`
          )
          .join("<br>");

        const popupContent = `<div><strong>${location.name}</strong><br>${location.description}<br>${imagesHtml}</div>`;
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

        markerElement.addEventListener("mouseenter", () => {
          popup.addTo(mapRef.current);
          popup.setLngLat([location.longitude, location.latitude]);
        });

        markerElement.addEventListener("mouseleave", () => {
          popup.remove();
        });

        markerElement.addEventListener("click", () => {
          const userLocation = mapRef.current.getCenter().toArray();
          const destination = [location.longitude, location.latitude];

          fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${userLocation[0]},${userLocation[1]};${destination[0]},${destination[1]}?access_token=pk.eyJ1IjoiZGhhbnVzaDIzMTMiLCJhIjoiY2x3cDJ0a2FkMmt3bjJrcnk1dG93djZmdSJ9.DzeHiUjcr3vOYQ_zVtApow`
          )
            .then((response) => response.json())
            .then((data) => {
              const route = data.routes[0];
              const distance = route.distance / 1000;
              const duration = route.duration / 60;

              const routeGeoJSON = {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: route.geometry.coordinates,
                },
              };

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

              const infoDiv = document.getElementById("route-info");
              const imageHtml =
                location.images.length > 0
                  ? `<img src="${require(`${location.images[0]}`)}" style="width: 100%; height: auto;" />`
                  : "";
              infoDiv.innerHTML = `
                                <strong>${location.name}</strong><br>
                                ${imageHtml}
                                ${location.description}<br>
                                Distance: ${distance.toFixed(2)} km<br>
                                Duration: ${duration.toFixed(2)} minutes
                            `;
              infoDiv.style.display = "block";
            })
            .catch((error) =>
              console.error("Error fetching directions:", error)
            );
        });
      });
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLaptop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // New useEffect for closing sidebar on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        isMobile && // Only on mobile
        isSidebarOpen && // Sidebar is open
        sidebarRef.current && // Sidebar ref exists
        !sidebarRef.current.contains(event.target) && // Click is outside sidebar
        !event.target.closest('.sidebar-icon') // Click is not on hamburger icon
      ) {
        setIsSidebarOpen(false); // Close sidebar
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobile, isSidebarOpen]);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZGhhbnVzaDIzMTMiLCJhIjoiY2x3cDJ0a2FkMmt3bjJrcnk1dG93djZmdSJ9.DzeHiUjcr3vOYQ_zVtApow";
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [0, 0],
        zoom: 2,
      });

      mapRef.current = map;

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
          latitude: 12.0461353,
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

      setLocations(initialLocations);

      map.on("load", () => {
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

              const userMarkerElement = document.createElement("div");
              userMarkerElement.className = "user-marker";
              userMarkerElement.style.backgroundImage = `url(${redMarker})`;
              userMarkerElement.style.width = "50px";
              userMarkerElement.style.height = "50px";
              userMarkerElement.style.backgroundSize = "contain";
              userMarkerElement.style.backgroundRepeat = "no-repeat";
              userMarkerElement.style.backgroundPosition = "center";
              userMarkerElement.style.border = "none";
              userMarkerElement.style.borderRadius = "0";
              userMarkerElement.style.backgroundColor = "transparent";

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

  const handleSearch = () => {
    const searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();
    const filteredLocations = locations.filter((location) =>
      location.name.toLowerCase().includes(searchInput)
    );

    if (mapRef.current) {
      if (mapRef.current.getLayer("markers")) {
        mapRef.current.removeLayer("markers");
        mapRef.current.removeSource("markers");
      }
    }

    addMarkers(filteredLocations);

    if (filteredLocations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredLocations.forEach((location) => {
        bounds.extend([location.longitude, location.latitude]);
      });
      mapRef.current.fitBounds(bounds, { padding: 20 });
    }
  };

  const categories = [
    {
      title: "Food",
      items: ["Plate Meals", "Bulk Items", "Raw Items", "Processed Items"],
    },
    { title: "Clothes", items: ["Men", "Women", "Kids"] },
    { title: "Education", items: ["Stationary", "Bags", "Essentials"] },
    { title: "Medical", items: ["Cotton", "Tapes", "Scissor", "Dettol"] },
    { title: "Money", items: ["UPI"] },
    {
      title: "Hygiene",
      items: ["Brushing Essentials", "Soap", "Skin Care", "Other Amenities"],
    },
  ];

  const handleLogout = async () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/");
  };

  // Function to handle category title and item clicks and navigate to respective routes
  const handleCategoryClick = (value) => {
    const routeMap = {
      "Food": "/food",
      "Clothes": "/clothes",
      "Education": "/education",
      "Medical": "/medical",
      "Money": "/money",
      "Hygiene": "/hygiene",
      "Plate Meals": "/food",
      "Bulk Items": "/food",
      "Raw Items": "/food",
      "Processed Items": "/food",
      "Men": "/clothes",
      "Women": "/clothes",
      "Kids": "/clothes",
      "Stationary": "/education",
      "Bags": "/education",
      "Essentials": "/education",
      "Cotton": "/medical",
      "Tapes": "/medical",
      "Scissor": "/medical",
      "Dettol": "/medical",
      "UPI": "/money",
      "Brushing Essentials": "/hygiene",
      "Soap": "/hygiene",
      "Skin Care": "/hygiene",
      "Other Amenities": "/hygiene",
    };
    navigate(routeMap[value]);
  };

  return (
    <div
      className={`Full ${isMobile ? "mobile" : ""} ${isLaptop ? "laptop" : ""}`}
    >
      {isMobile ? (
        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#C5E3EA", padding: "10px" }}>
          <button
            onClick={toggleSidebar}
            className="sidebar-icon"
            style={{ marginRight: "10px" }} // Space between icon and logo
          >
            <FaBars />
          </button>
          <Header />
        </div>
      ) : (
        <Header />
      )}
      <button
        onClick={handleLogout}
        className={`logout-button ${isMobile ? "mobile" : ""}`}
        style={{
          position: "absolute",
          zIndex: isMobile ? "1001" : "",
          top: isMobile ? "0px" : "20px",
          right: isMobile ? "5px" : "40px",
          backgroundColor: "#19849E",
          color: isMobile ? "transparent" : "white", // Hide text on mobile
          border: "none",
          borderRadius: "5px",
          padding: isMobile ? "10px" : "10px 20px", // Adjust padding for icon-only on mobile
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: isMobile ? "8%" : "",
        }}
      >
        <span className="logout-text">Logout</span> {/* Wrap text in a span for styling */}
        <FontAwesomeIcon icon={faRightFromBracket} style={{ marginLeft: isMobile ? "0" : "5px", fontSize: isMobile ? "20px" : "16px" }} />
      </button>
      <div className="side" ref={sidebarRef} style={{ marginLeft: isMobile ? "" : "" }}>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      </div>
      <div
        id="route-info"
        style={{
          display: "none",
          position: "absolute",
          background: "rgba(255, 255, 255, 0.8)",
          padding: "15px",
          borderRadius: "8px",
          zIndex: 1,
          fontFamily: "Arial, sans-serif",
          color: "#333",
          minWidth: "200px",
          maxWidth: "300px",
          textAlign: "center",
          marginLeft: isMobile ? "" : "10em",
          marginTop: isMobile ? "" : "10em",
        }}
      >
        {/* Distance, duration, and place details will be displayed here */}
      </div>
      <section
        id="gps"
        className={isMobile ? "mobile-gps" : ""}
        style={{
          marginLeft: isMobile ? "" : "",
          marginTop: isMobile ? "1em" : "6em",
          width: isMobile ? "17em" : "",
          marginBottom: isMobile ? "2em" : ""
        }}
      >
        <section
          ref={mapContainerRef}
          id="map"
          className={isMobile ? "mobile-map" : ""}
          style={{ height: isMobile ? "35em" : "900px", width: isMobile ? "150%" : "", }}
        >
          <div id="map-element"></div>
          <button
            ref={relocateBtnRef}
            id="relocateBtn"
            className={isMobile ? "mobile-relocate-btn" : ""}
            style={{
              width: isMobile ? "30%" : "",
              marginRight: isMobile ? "-2.5em" : "",
              marginTop: isMobile ? "-10px" : "",
            }}
          >
            <b>Re-Locate</b>
          </button>
        </section>
      </section>
      <div
        className={`search-container ${isMobile ? "mobile-search-container" : ""} ${isLaptop ? "laptop-search-container" : ""}`}
        style={{
          display: isMobile ? "" : "",
          paddingBottom: isMobile ? "2em" : "",
          marginLeft: isMobile ? "1px" : "4em",
          width: isMobile ? "25em" : "",
          marginTop: isMobile ? "28em" : "",
        }}
      >
        <div
          className={`search-bar ${isMobile ? "mobile-search-bar" : ""} ${isLaptop ? "laptop-search-bar" : ""}`}
        >
          <input
            type="text"
            id="searchInput"
            name="text"
            placeholder="Search Orphanages..."
            style={{ width: isMobile ? "100%" : "75%" }}
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
            <span className="search-text">Search</span>
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: "5px" }} />
          </button>
        </div>
      </div>
      <section
        id="don"
        className={`donations ${isMobile ? "mobile-donations" : ""}`}
        style={{
          width: isMobile ? "100%" : "110em",
          marginLeft: isMobile ? "0em" : "15em",
          marginTop: isMobile ? "-1em" : "",
        }}
      >
        <div
          className={`all ${isMobile ? "mobile-all" : ""}`}
          style={{ marginLeft: isMobile ? "" : "", }}
        >
          {categories.map((category, index) => (
            <div className="all1" key={index}>
              <CompCard
                title={category.title}
                items={category.items}
                onTitleClick={() => handleCategoryClick(category.title)} // Navigate on title click
                onItemClick={(item) => handleCategoryClick(item)} // Navigate on item click
              />
            </div>
          ))}
        </div>
      </section>
      <div style={{ marginTop: isMobile ? "120em" : "230em" }}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
