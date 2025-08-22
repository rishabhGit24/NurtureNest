import React from "react";
import { motion } from "framer-motion";
import { MapPinIcon } from "@heroicons/react/24/outline";
import nnLogo from '../assets/images/nn_small.png';
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#007290] via-[#005a73] to-[#004d5f] text-white relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[#C5E3EA] opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-[#ADE2ED]/10 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                <img 
                  src={nnLogo} 
                  alt="NurtureNest Logo" 
                  className="w-50 h-20 object-cover rounded-2xl"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">NurtureNest</h3>
                <p className="text-[#C5E3EA] font-medium text-lg">Donation Mediator Platform</p>
              </div>
            </div>
            <p className="text-[#C5E3EA] leading-relaxed mb-8 max-w-lg text-lg">
              Connecting generous donors with orphanages and NGOs in need. Making the world a better place, one donation at a time.
            </p>
            <div className="flex space-x-6">
              {[
                { icon: "📘", label: "Facebook", color: "hover:bg-[#C5E3EA]/30" },
                { icon: "🐦", label: "Twitter", color: "hover:bg-[#ADE2ED]/30" },
                { icon: "📷", label: "Instagram", color: "hover:bg-[#53AEC6]/30" },
                { icon: "💼", label: "LinkedIn", color: "hover:bg-[#007290]/30" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-14 h-14 bg-white/10 hover:bg-white/20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 ${social.color} group`}
                >
                  <span className="text-xl mb-1 group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
                  <span className="text-xs text-[#C5E3EA] font-medium">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 flex items-center">
              <MapPinIcon className="w-6 h-6 mr-3 text-[#ADE2ED]" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/home", icon: "🏠" },
                { name: "About Us", href: "/aboutus", icon: "ℹ️" },
                { name: "Locations", href: "/locations", icon: "📍" },
                { name: "Donate Now", href: "/home", icon: "🎁" },
                { name: "Feedback", href: "/feedback", icon: "💬" }
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center text-[#C5E3EA] hover:text-white transition-all duration-300 font-medium group"
                  >
                    <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                    <span className="group-hover:underline">{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 flex items-center">
              <MapPinIcon className="w-6 h-6 mr-3 text-[#ADE2ED]" />
              Contact Us
            </h4>
            <div className="space-y-4 text-[#C5E3EA]">
              {[
                { icon: "📍", text: "Bangalore, India", delay: 0.2 },
                { icon: "📧", text: "info@nurturenest.com", delay: 0.3 },
                { icon: "📞", text: "+91 98765 43210", delay: 0.4 },
                { icon: "⏰", text: "Mon-Fri: 9AM-6PM", delay: 0.5 }
              ].map((contact, index) => (
                <motion.p
                  key={contact.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: contact.delay }}
                  className="flex items-center group hover:text-white transition-colors duration-300"
                >
                  <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-300">{contact.icon}</span>
                  <span className="text-sm">{contact.text}</span>
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-8 border-t border-white/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-2xl">💙</span>
              <p className="text-[#C5E3EA] text-sm">
                Made with love for a better world
              </p>
            </div>
            <p className="text-[#C5E3EA] text-sm mb-4 md:mb-0">
              © 2024 NurtureNest. All rights reserved.
            </p>
            <div className="flex space-x-8 text-sm">
              {[
                { name: "Privacy Policy", href: "#" },
                { name: "Terms of Service", href: "#" },
                { name: "Cookie Policy", href: "#" }
              ].map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  className="text-[#C5E3EA] hover:text-white transition-colors duration-300 hover:underline"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;