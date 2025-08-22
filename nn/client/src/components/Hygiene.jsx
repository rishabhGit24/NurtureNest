import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  SparklesIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Header from "./Header";
import Footer from "./Footer";

const Hygiene = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const relocateBtnRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loginCheck = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5001/api/auth/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.data.success) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        navigate("/");
      }
    };

    loginCheck();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        markerElement.style.backgroundImage = `url(https://maps.google.com/mapfiles/ms/icons/green-dot.png)`;
        markerElement.style.width = "30px";
        markerElement.style.height = "30px";
        markerElement.style.backgroundSize = "100%";

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat([location.longitude, location.latitude])
          .addTo(mapRef.current);

        const popupContent = `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #1f2937; font-weight: 600;">${location.name}</h3>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">${location.description}</p>
          </div>
        `;
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

        markerElement.addEventListener("mouseenter", () => {
          popup.addTo(mapRef.current);
          popup.setLngLat([location.longitude, location.latitude]);
        });

        markerElement.addEventListener("mouseleave", () => {
          popup.remove();
        });
      });
    }
  };

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZGhhbnVzaDIzMTMiLCJhIjoiY2x3cDJ0a2FkMmt3bjJrcnk1dG93djZmdSJ9.DzeHiUjcr3vOYQ_zVtApow";
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [77.5913, 12.9716], // Bangalore coordinates
        zoom: 10,
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
          description: "This is KARNATAKA ORPHANAGE AND HANDICAP DEVELOPEMENT CENTER",
          images: ["./images/3_2_1.jpg"],
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
          description: "This is BOSCO Summanahalli",
          images: ["./images/7_4_1.jpg"],
        },
        {
          name: "BOSCO Nivas",
          latitude: 12.9848622,
          longitude: 77.60404,
          description: "This is BOSCO Nivas",
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
              userMarkerElement.style.backgroundImage = `url(https://maps.google.com/mapfiles/ms/icons/red-dot.png)`;
              userMarkerElement.style.width = "30px";
              userMarkerElement.style.height = "30px";
              userMarkerElement.style.backgroundSize = "100%";

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

      if (relocateBtnRef.current) {
        relocateBtnRef.current.addEventListener("click", getUserLocation);
      }

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
    const filteredLocations = locations.filter((location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const hygieneCategories = [
    {
      title: "Personal Care",
      description: "Soap, shampoo, toothpaste, and brushes",
      icon: SparklesIcon,
      color: "from-[#53AEC6] to-[#007290]",
    },
    {
      title: "Hair Care",
      description: "Hair products and accessories",
      icon: SparklesIcon,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Skin Care",
      description: "Lotions, creams, and skincare products",
      icon: SparklesIcon,
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Dental Care",
      description: "Toothbrushes, toothpaste, and floss",
      icon: SparklesIcon,
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C5E3EA] via-[#ADE2ED] to-[#53AEC6]">
      <Header />
      
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/home')}
        className="fixed top-20 left-4 z-40 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Back to Home
      </motion.button>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-24 h-24 bg-gradient-to-br from-[#53AEC6] to-[#007290] rounded-3xl flex items-center justify-center mb-6"
          >
            <SparklesIcon className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6"
          >
            Hygiene Donations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Help children maintain good hygiene by donating personal care products. Cleanliness is essential for health and confidence.
          </motion.p>
        </div>
      </section>

      {/* Hygiene Categories */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Can You Donate?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from various hygiene donation categories to support children's well-being
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {hygieneCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-[#C5E3EA] group-hover:border-[#53AEC6] transition-all duration-300 group-hover:shadow-3xl transform group-hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-[#007290] mb-3 group-hover:text-[#53AEC6] transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => navigate('/donation/hygiene')}
                      className="text-[#53AEC6] font-medium group-hover:text-[#007290] transition-colors duration-300 cursor-pointer"
                    >
                      Click to donate →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Find Orphanages for Hygiene Donations
              </h2>
              <p className="text-gray-600">
                Search for orphanages in your area that need hygiene products
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orphanages..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all duration-200"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-[#53AEC6] to-[#007290] text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#53AEC6] focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 lg:p-8 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Interactive Map
                  </h2>
                  <p className="text-gray-600">
                    Discover orphanages and get directions to make your hygiene donations
                  </p>
                </div>
                <button
                  ref={relocateBtnRef}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2"
                >
                  <MapPinIcon className="w-5 h-5" />
                  Re-locate Me
                </button>
              </div>
            </div>
            <div
              ref={mapContainerRef}
              className="w-full h-96 lg:h-[600px]"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hygiene;