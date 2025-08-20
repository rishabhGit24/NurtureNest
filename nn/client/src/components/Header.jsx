import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import nnLogo from '../assets/images/NN1.5.jpg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLaptop(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigation = [
    { name: "Home", href: "/home", current: location.pathname === "/home" },
    { name: "Profile", href: "/profile", current: location.pathname === "/profile" },
    { name: "Locations", href: "/locations", current: location.pathname === "/locations" },
    { name: "Feedback", href: "/feedback", current: location.pathname === "/feedback" },
    { name: "About Us", href: "/about-us", current: location.pathname === "/about-us" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-gradient-to-r from-[#005a73]/95 to-[#004d5f]/95 backdrop-blur-md shadow-2xl border-b border-[#53AEC6]/30"
          : "bg-gradient-to-r from-[#C5E3EA]/90 to-[#ADE2ED]/90 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-2xl overflow-hidden shadow-xl ring-4 ring-[#53AEC6]/30 group-hover:ring-[#007290]/50 transition-all duration-300"
            >
              <img 
                src={nnLogo} 
                alt="NurtureNest Logo" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
            <div className="hidden sm:block">
              <motion.h1 
                className="text-xl font-bold text-[#007290] group-hover:text-[#53AEC6] transition-colors duration-300"
                whileHover={{ x: 2 }}
              >
                NurtureNest
              </motion.h1>
              <motion.p 
                className="text-xs text-[#53AEC6] -mt-1 group-hover:text-[#007290] transition-colors duration-300"
                whileHover={{ x: 2 }}
              >
                Donation Mediator Platform
              </motion.p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.href}
                  className={`relative text-sm font-semibold transition-all duration-300 px-3 py-2 rounded-lg ${
                    item.current
                      ? "text-white bg-gradient-to-r from-[#53AEC6] to-[#007290] shadow-lg"
                      : "text-[#007290] hover:text-[#53AEC6] hover:bg-[#C5E3EA]/50"
                  }`}
                >
                  {item.name}
                  {item.current && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#53AEC6] to-[#007290] rounded-lg -z-10"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#53AEC6] to-[#007290] rounded-xl hover:from-[#007290] hover:to-[#53AEC6] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
              Logout
            </motion.button>
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-xl text-[#007290] hover:text-[#53AEC6] hover:bg-[#C5E3EA]/50 transition-all duration-300"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-[#C5E3EA] shadow-xl"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                      item.current
                        ? "text-white bg-gradient-to-r from-[#53AEC6] to-[#007290] shadow-lg"
                        : "text-[#007290] hover:text-[#53AEC6] hover:bg-[#C5E3EA]/30"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                whileHover={{ x: 8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 inline mr-2" />
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
