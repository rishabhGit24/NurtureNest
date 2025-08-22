import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  // Initialize real orphanage data from Clothes component
  useEffect(() => {
    const realOrphanages = [
      {
        id: 1,
        name: "VATSALYAPURAM TRUST NGO",
        type: "NGO Trust",
        latitude: 12.9224418,
        longitude: 77.5824046,
        description: "VATSALYAPURAM TRUST NGO is dedicated to providing care and support to children in need. We focus on creating a nurturing environment where every child can thrive and reach their full potential.",
        address: "Koramangala, Bangalore, Karnataka"
      },
      {
        id: 2,
        name: "PREMAANAJALI",
        type: "Orphanage",
        latitude: 12.9159589,
        longitude: 77.5911647,
        description: "PREMAANAJALI Orphanage is committed to supporting children's development and well-being through comprehensive care programs, education, and emotional support.",
        address: "Indiranagar, Bangalore, Karnataka"
      },
      {
        id: 3,
        name: "NEED BASE INDIA: LAKSHYA UDAAN",
        type: "NGO Foundation",
        latitude: 12.957973,
        longitude: 77.5887809,
        description: "NEED BASE INDIA: LAKSHYA UDAAN is dedicated to nurturing and protecting vulnerable children. We provide shelter, education, healthcare, and emotional support.",
        address: "Jayanagar, Bangalore, Karnataka"
      },
      {
        id: 4,
        name: "Need Base India-Rainbow Home",
        type: "Children's Home",
        latitude: 12.0461353,
        longitude: 77.54949548,
        description: "Need Base India-Rainbow Home creates opportunities for children to thrive through innovative programs, skill development, and community integration.",
        address: "HSR Layout, Bangalore, Karnataka"
      },
      {
        id: 5,
        name: "KARNATAKA ORPHANAGE AND HANDICAP DEVELOPEMENT CENTER",
        type: "Development Center",
        latitude: 12.9378698,
        longitude: 77.5387422,
        description: "KARNATAKA ORPHANAGE AND HANDICAP DEVELOPEMENT CENTER provides safe haven and education for children. We focus on holistic development and preparing children for a bright future.",
        address: "Electronic City, Bangalore, Karnataka"
      },
      {
        id: 6,
        name: "AMRUTHA SHISHU NIVASA",
        type: "Children's Home",
        latitude: 12.941669,
        longitude: 77.5670684,
        description: "AMRUTHA SHISHU NIVASA empowers children through education, healthcare, and life skills training. Building a foundation for lifelong success.",
        address: "Whitefield, Bangalore, Karnataka"
      },
      {
        id: 7,
        name: "BELAKU SHISHU NIVASA",
        type: "Children's Home",
        latitude: 12.9398111,
        longitude: 77.566134,
        description: "BELAKU SHISHU NIVASA provides comprehensive care and support to children in need, focusing on their overall development and well-being.",
        address: "Marathahalli, Bangalore, Karnataka"
      },
      {
        id: 8,
        name: "Bosco Yuvodaya",
        type: "Youth Development Center",
        latitude: 12.97935,
        longitude: 77.57596,
        description: "Bosco Yuvodaya is dedicated to youth development and empowerment, providing education, skills training, and guidance for a better future.",
        address: "Hebbal, Bangalore, Karnataka"
      },
      {
        id: 9,
        name: "BOSCO Mane",
        type: "Children's Shelter",
        latitude: 12.9583419,
        longitude: 77.569181,
        description: "BOSCO Mane offers shelter and care for children in need, providing a safe environment for growth and development.",
        address: "Yeshwanthpur, Bangalore, Karnataka"
      },
      {
        id: 10,
        name: "BOSCO Yuvakendra",
        type: "Youth Center",
        latitude: 12.9730467,
        longitude: 77.56277,
        description: "BOSCO Yuvakendra focuses on youth development through various programs and activities designed to build character and skills.",
        address: "Peenya, Bangalore, Karnataka"
      },
      {
        id: 11,
        name: "BOSCO Nilaya",
        type: "Children's Home",
        latitude: 12.9674429,
        longitude: 77.571919,
        description: "BOSCO Nilaya provides a nurturing environment for children, focusing on their education, health, and overall well-being.",
        address: "Rajajinagar, Bangalore, Karnataka"
      },
      {
        id: 12,
        name: "BOSCO Summanahalli",
        type: "Rural Development Center",
        latitude: 12.9807156,
        longitude: 77.517275,
        description: "BOSCO Summanahalli works in rural areas to provide education and support to children and families in need.",
        address: "Tumkur Road, Bangalore, Karnataka"
      },
      {
        id: 13,
        name: "BOSCO Nivas",
        type: "Residential Center",
        latitude: 12.9848622,
        longitude: 77.60404,
        description: "BOSCO Nivas offers residential care and support for children, providing a stable environment for their development.",
        address: "Yelahanka, Bangalore, Karnataka"
      },
      {
        id: 14,
        name: "BOSCO Vatsalya Bhavan",
        type: "Children's Care Home",
        latitude: 12.9598526,
        longitude: 77.567894,
        description: "BOSCO Vatsalya Bhavan is dedicated to providing loving care and support to children, ensuring their safety and well-being.",
        address: "Malleswaram, Bangalore, Karnataka"
      },
      {
        id: 15,
        name: "Auxilium Navajeevana",
        type: "Rehabilitation Center",
        latitude: 12.9607131,
        longitude: 77.563616,
        description: "Auxilium Navajeevana focuses on rehabilitation and support for children and families, helping them build a better future.",
        address: "Seshadripuram, Bangalore, Karnataka"
      }
    ];
    
    setLocations(realOrphanages);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter locations based on search query
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to handle "View on Map" button click
  const handleViewOnMap = (location) => {
    // Store the location data in localStorage so Home component can center on it
    localStorage.setItem('centerOnLocation', JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name
    }));
    
    // Navigate to home page and scroll to map section
    navigate('/home');
    
    // Add a small delay to ensure navigation completes
    setTimeout(() => {
      // Scroll to map section
      const mapSection = document.querySelector('[data-map-section]');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add a visual highlight effect to the map section
        mapSection.style.transition = 'all 0.3s ease';
        mapSection.style.transform = 'scale(1.02)';
        mapSection.style.boxShadow = '0 0 30px rgba(239, 68, 68, 0.3)';
        
        // Remove the highlight effect after animation
        setTimeout(() => {
          mapSection.style.transform = 'scale(1)';
          mapSection.style.boxShadow = 'none';
        }, 1000);
      }
    }, 300);
  };

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


      {/* Orphanages List Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 lg:p-8 border-b border-gray-200">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                Orphanages Directory
              </h2>
              <p className="text-gray-600">
                Browse through our list of registered orphanages and NGOs
              </p>
            </div>
            
            <div className="p-6 lg:p-8">
              {filteredLocations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredLocations.map((location, index) => (
                    <motion.div
                      key={location.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] rounded-xl p-6 border border-[#53AEC6] hover:border-[#007290] transition-all duration-300 hover:shadow-lg group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#53AEC6] to-[#007290] rounded-full flex items-center justify-center">
                          <GiftIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#007290] text-lg group-hover:text-[#005a73] transition-colors duration-200">
                            {location.name}
                          </h3>
                          <p className="text-gray-600 text-sm">{location.type}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {location.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          📍 {location.address}
                        </span>
                        <button 
                          onClick={() => handleViewOnMap(location)}
                          className="bg-[#53AEC6] hover:bg-[#007290] text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 transform hover:scale-105"
                        >
                          View on Map
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <GiftIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No orphanages found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or browse all locations.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Location;