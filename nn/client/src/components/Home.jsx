import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  HeartIcon, 
  GiftIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  SparklesIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Header from "./Header";
import Footer from "./Footer";
import nnLogo from '../assets/images/NN1.5.jpg';

const Home = () => {
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

  const donationCategories = [
    {
      title: "Food & Nutrition",
      description: "Donate food items, groceries, and nutritional supplements to ensure children have access to healthy meals.",
      icon: GiftIcon,
      color: "from-orange-500 to-red-500",
      href: "/food",
    },
    {
      title: "Clothing & Apparel",
      description: "Provide children with clean, comfortable clothing and footwear for all seasons.",
      icon: UserGroupIcon,
      color: "from-blue-500 to-indigo-500",
      href: "/clothes",
    },
    {
      title: "Education & Learning",
      description: "Support children's education with books, stationery, and learning materials.",
      icon: AcademicCapIcon,
      color: "from-green-500 to-emerald-500",
      href: "/education",
    },
    {
      title: "Medical & Healthcare",
      description: "Help maintain children's health with medical supplies, first aid kits, and health monitoring equipment.",
      icon: HeartIcon,
      color: "from-red-500 to-pink-500",
      href: "/medical",
    },
    {
      title: "Financial Support",
      description: "Contribute monetary donations to help orphanages cover operational costs and special needs.",
      icon: CurrencyDollarIcon,
      color: "from-yellow-500 to-orange-500",
      href: "/money",
    },
    {
      title: "Hygiene",
      description: "Ensure children have access to essential hygiene products and personal care items.",
      icon: SparklesIcon,
      color: "from-purple-500 to-violet-500",
      href: "/hygiene",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C5E3EA] via-[#ADE2ED] to-[#53AEC6]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-24 h-24 bg-gradient-to-br from-[#53AEC6] to-[#007290] rounded-3xl flex items-center justify-center mb-6 overflow-hidden shadow-2xl ring-4 ring-[#ADE2ED]/50"
          >
            <img 
              src={nnLogo} 
              alt="NurtureNest Logo" 
              className="w-14 h-14 object-cover rounded-xl"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#007290] mb-6 drop-shadow-lg"
          >
            Welcome to <span className="text-gradient bg-gradient-to-r from-[#53AEC6] to-[#007290] bg-clip-text text-transparent">NurtureNest</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl text-[#007290] max-w-4xl mx-auto mb-8 leading-relaxed font-medium"
          >
            The revolutionary donation mediator platform that connects generous donors with orphanages and NGOs in need.
          </motion.p>
          
z̧
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#53AEC6] to-[#007290] text-white font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Find Orphanages
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/80 backdrop-blur-sm text-[#007290] font-semibold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-[#53AEC6]/30 hover:border-[#007290]"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Donation Categories */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#007290] mb-4">
            What Can You Donate?
          </h2>
          <p className="text-xl text-[#53AEC6] max-w-3xl mx-auto">
            Choose from various donation categories to make the most meaningful impact
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donationCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                rotateY: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              className="group cursor-pointer transform-gpu transition-all duration-500"
              onClick={() => navigate(category.href)}
            >
              <div className="relative bg-gradient-to-br from-white via-[#C5E3EA]/10 to-[#ADE2ED]/20 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-8 border-2 border-transparent hover:border-[#53AEC6] overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5E3EA]/5 via-transparent to-[#ADE2ED]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#53AEC6] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-[#ADE2ED] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute top-12 right-6 w-1 h-1 bg-[#C5E3EA] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-500" style={{ animationDelay: '0.4s' }}></div>
                
                {/* Icon container with enhanced styling */}
                <div className={`relative w-24 h-24 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl group-hover:shadow-2xl ring-4 ring-white/50 group-hover:ring-[#53AEC6]/30`}>
                  <category.icon className="w-12 h-12 text-white drop-shadow-lg" />
                  
                  {/* Glowing effect around icon */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Content */}
                <h3 className="relative text-2xl lg:text-3xl font-bold text-[#007290] mb-4 group-hover:text-[#53AEC6] transition-colors duration-300 z-10">
                  {category.title}
                </h3>
                <p className="relative text-[#53AEC6] mb-6 leading-relaxed text-lg z-10">
                  {category.description}
                </p>
                
                {/* Enhanced call-to-action */}
                <div className="relative mt-6 pt-4 border-t-2 border-[#C5E3EA]/30 group-hover:border-[#53AEC6] transition-all duration-300 z-10">
                  <span className="inline-flex items-center text-[#53AEC6] font-semibold group-hover:text-[#007290] transition-all duration-300 text-lg group-hover:scale-105">
                    Click to donate 
                    <motion.span 
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      →
                    </motion.span>
                  </span>
                </div>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#53AEC6] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="bg-white rounded-2xl shadow-xl p-6 lg:p-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#007290] mb-2">
                Find Orphanages for Donations
              </h2>
              <p className="text-[#53AEC6]">
                Search for orphanages in your area that need donations
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#53AEC6]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search orphanages..."
                  className="w-full pl-14 pr-4 py-4 border-2 border-[#C5E3EA] rounded-2xl focus:ring-2 focus:ring-[#53AEC6] focus:border-[#53AEC6] transition-all duration-300 text-lg bg-white/80 backdrop-blur-sm"
                />
              </div>
              <button
                onClick={handleSearch}
                className="text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                style={{ backgroundColor: "#53AEC6" }}

              >
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-8 border-b border-[#C5E3EA] bg-gradient-to-r from-[#C5E3EA]/20 to-[#ADE2ED]/20">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#007290] mb-2">
                    Discover Nearby Orphanages
                  </h2>
                  <p className="text-[#53AEC6]">
                    Explore orphanages in your area and get directions to make meaningful donations
                  </p>
                </div>
                <motion.button
                  ref={relocateBtnRef}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#53AEC6] to-[#007290] hover:from-[#007290] hover:to-[#53AEC6] text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <MapPinIcon className="w-5 h-5" />
                  Re-locate Me
                </motion.button>
              </div>
            </div>
            <div
              ref={mapContainerRef}
              className="w-full h-96 lg:h-[600px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-3xl p-8 lg:p-12 text-center text-black"
            style={{ backgroundColor: "#53AEC6" }}

          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              We envision a world where every child has access to the basic necessities they need to thrive, 
              where generosity flows freely and efficiently, and where technology serves as a bridge between 
              those who want to help and those who need help.
            </p>
            <div className="bg-white/10 rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto">
              <p className="text-lg text-black italic">
                "NurtureNest is more than a platform—it's a movement towards a more compassionate and connected world. 
                We're building the infrastructure for kindness, one donation at a time."
              </p>
              <p className="text-sm text-black mt-4">
                — The NurtureNest Team
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;