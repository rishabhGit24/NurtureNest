import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  GiftIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Header from "./Header";
import Footer from "./Footer";

const Location = () => {
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
            className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mb-6"
          >
            <MapPinIcon className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6"
          >
            Find Orphanages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Discover orphanages in your area and get directions to make meaningful donations.
          </motion.p>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 lg:p-8 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    Interactive Map
                  </h2>
                  <p className="text-gray-600">
                    Explore orphanages and get directions to make your donations
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

export default Location;