import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  HeartIcon,
  GlobeAltIcon,
  UsersIcon,
  LightBulbIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import Header from "./Header";
import Footer from "./Footer";
import nnLogo from '../assets/images/NN1.5.jpg';

const AboutUS = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: HeartIcon,
      title: "Donation Mediation",
      description: "We bridge the gap between generous donors and orphanages in need, making the donation process seamless and efficient.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: GlobeAltIcon,
      title: "Real-time Visibility",
      description: "Orphanages can showcase their needs in real-time, and donors can see exactly where their contributions will make an impact.",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: UsersIcon,
      title: "Community Building",
      description: "We foster a community of caring individuals and organizations working together to support children in need.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: LightBulbIcon,
      title: "Innovation",
      description: "Leveraging technology to solve real-world problems and create a more efficient donation ecosystem.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: ChartBarIcon,
      title: "Transparency",
      description: "Complete transparency in donation tracking and impact measurement for both donors and recipients.",
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: ShieldCheckIcon,
      title: "Trust & Security",
      description: "Verified orphanages and secure donation processes ensure your contributions reach those who need them most.",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  const teamMembers = [
    {
      name: "Rishabh Bharadwaj R.",
      role: "Co-Founder & Developer",
      description: "Leading the technical development and platform architecture of NurtureNest.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Shashank",
      role: "Co-Founder & Strategist",
      description: "Driving the strategic vision and business development of the platform.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
  ];

  const stats = [
    { number: "2023", label: "Founded" },
    { number: "100+", label: "Orphanages" },
    { number: "1000+", label: "Donors" },
    { number: "24/7", label: "Support" },
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
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 overflow-hidden shadow-2xl">
            <img 
              src={nnLogo} 
              alt="NurtureNest Logo" 
              className="w-12 h-12 object-cover rounded-lg"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            About <span className="text-gradient">NurtureNest</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            NurtureNest is a revolutionary donation mediator platform that connects generous donors with orphanages and NGOs in need. 
            We bridge the gap between those who want to help and those who need help, making the donation process seamless and efficient.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-500 max-w-3xl mx-auto"
          >
            <p className="mb-4">
              Founded in <strong>December 2023</strong> by <strong>Rishabh Bharadwaj R.</strong> and <strong>Shashank</strong>, 
              NurtureNest was born from a vision to become a startup-grade product that revolutionizes how we think about charitable giving.
            </p>
            <p>
              Our mission is to create a world where no child goes without the basic necessities they need to thrive, 
              and where every act of generosity finds its way to those who need it most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-red-50 rounded-2xl p-8 lg:p-10 border border-red-200"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">!</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-red-800">The Problem</h2>
              </div>
              <p className="text-red-700 text-lg leading-relaxed">
                Current donation systems are scattered and inefficient. People willing to donate often don't know which orphanages need help, 
                and orphanages don't have a seamless way to manage or receive donations. This creates a disconnect that leaves both donors 
                and recipients frustrated and children without the support they desperately need.
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-green-50 rounded-2xl p-8 lg:p-10 border border-green-200"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">✓</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-green-800">Our Solution</h2>
              </div>
              <p className="text-green-700 text-lg leading-relaxed">
                NurtureNest centralizes this process, bridging the gap between donors and orphanages. We provide real-time visibility of 
                orphanages, categorized donation flows, and instant booking notifications via SMS/WhatsApp/Email. Our platform makes 
                giving easy, transparent, and impactful.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NurtureNest?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another donation platform. We're a comprehensive solution designed to make giving meaningful and efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 border border-gray-100 group-hover:border-blue-200">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate minds behind NurtureNest, dedicated to making a difference in the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 lg:p-8 border border-gray-100 group-hover:border-blue-200 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-center text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-12">
              NurtureNest by the Numbers
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 text-center text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our Vision for the Future
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              We envision a world where every child has access to the basic necessities they need to thrive, 
              where generosity flows freely and efficiently, and where technology serves as a bridge between 
              those who want to help and those who need help.
            </p>
            <div className="bg-white/10 rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto">
              <p className="text-lg text-blue-200 italic">
                "NurtureNest is more than a platform—it's a movement towards a more compassionate and connected world. 
                We're building the infrastructure for kindness, one donation at a time."
              </p>
              <p className="text-sm text-gray-400 mt-4">
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

export default AboutUS;