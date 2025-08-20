import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowRightIcon,
  CheckIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import nnLogo from '../assets/images/NN1.5.jpg';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5001/api/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C5E3EA] via-[#ADE2ED] to-[#53AEC6] relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-16 left-16 w-24 h-24 bg-[#53AEC6]/25 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -8, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-32 right-24 w-36 h-36 bg-[#ADE2ED]/35 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-32 left-24 w-20 h-20 bg-[#C5E3EA]/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 35, 0],
            x: [0, -20, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          className="absolute bottom-24 right-16 w-28 h-28 bg-[#007290]/25 rounded-full blur-xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="mx-auto w-24 h-24 bg-gradient-to-br from-[#53AEC6] to-[#007290] rounded-3xl flex items-center justify-center mb-6 overflow-hidden shadow-2xl"
            >
              <img 
                src={nnLogo} 
                alt="NurtureNest Logo" 
                className="w-14 h-14 object-cover rounded-xl"
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-bold text-[#007290] mb-3"
            >
              Join NurtureNest
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-[#53AEC6]"
            >
              Create your account and start making a difference
            </motion.p>
          </motion.div>

          {/* Sign Up Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-[#C5E3EA]/30"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <label htmlFor="name" className="block text-sm font-semibold text-[#007290] mb-2">
                  Full Name
                </label>
                <div className="relative group">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#53AEC6] group-hover:text-[#007290] transition-colors duration-300" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-4 border-2 border-[#C5E3EA] rounded-2xl focus:ring-2 focus:ring-[#53AEC6] focus:border-[#53AEC6] transition-all duration-300 bg-white/80 backdrop-blur-sm text-[#007290] placeholder-[#53AEC6]/60"
                    placeholder="Enter your full name"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C5E3EA]/0 via-[#ADE2ED]/0 to-[#53AEC6]/0 group-hover:from-[#C5E3EA]/5 group-hover:via-[#ADE2ED]/5 group-hover:to-[#53AEC6]/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ scale: 1.02 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold text-[#007290] mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#53AEC6] group-hover:text-[#007290] transition-colors duration-300" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-4 border-2 border-[#C5E3EA] rounded-2xl focus:ring-2 focus:ring-[#53AEC6] focus:border-[#53AEC6] transition-all duration-300 bg-white/80 backdrop-blur-sm text-[#007290] placeholder-[#53AEC6]/60"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C5E3EA]/0 via-[#ADE2ED]/0 to-[#53AEC6]/0 group-hover:from-[#C5E3EA]/5 group-hover:via-[#ADE2ED]/5 group-hover:to-[#53AEC6]/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <label htmlFor="phone" className="block text-sm font-semibold text-[#007290] mb-2">
                  Phone Number
                </label>
                <div className="relative group">
                  <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#53AEC6] group-hover:text-[#007290] transition-colors duration-300" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-4 border-2 border-[#C5E3EA] rounded-2xl focus:ring-2 focus:ring-[#53AEC6] focus:border-[#53AEC6] transition-all duration-300 bg-white/80 backdrop-blur-sm text-[#007290] placeholder-[#53AEC6]/60"
                    placeholder="Enter your phone number"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C5E3EA]/0 via-[#ADE2ED]/0 to-[#53AEC6]/0 group-hover:from-[#C5E3EA]/5 group-hover:via-[#ADE2ED]/5 group-hover:to-[#53AEC6]/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{ scale: 1.02 }}
              >
                <label htmlFor="password" className="block text-sm font-semibold text-[#007290] mb-2">
                  Password
                </label>
                <div className="relative group">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#53AEC6] group-hover:text-[#007290] transition-colors duration-300" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-4 border-2 border-[#C5E3EA] rounded-2xl focus:ring-2 focus:ring-[#53AEC6] focus:border-[#53AEC6] transition-all duration-300 bg-white/80 backdrop-blur-sm text-[#007290] placeholder-[#53AEC6]/60"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#53AEC6] hover:text-[#007290] transition-colors duration-300 p-1 rounded-lg hover:bg-[#C5E3EA]/20"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C5E3EA]/0 via-[#ADE2ED]/0 to-[#53AEC6]/0 group-hover:from-[#C5E3EA]/5 group-hover:via-[#ADE2ED]/5 group-hover:to-[#53AEC6]/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#007290] mb-2">
                  Confirm Password
                </label>
                <div className="relative group">
                  <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#53AEC6] group-hover:text-[#007290] transition-colors duration-300" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-4 border-2 border-[#C5E3EA] rounded-2xl focus:ring-2 focus:ring-[#53AEC6] focus:border-[#53AEC6] transition-all duration-300 bg-white/80 backdrop-blur-sm text-[#007290] placeholder-[#53AEC6]/60"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#53AEC6] hover:text-[#007290] transition-colors duration-300 p-1 rounded-lg hover:bg-[#C5E3EA]/20"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#C5E3EA]/0 via-[#ADE2ED]/0 to-[#53AEC6]/0 group-hover:from-[#C5E3EA]/5 group-hover:via-[#ADE2ED]/5 group-hover:to-[#53AEC6]/5 transition-all duration-300 pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="bg-red-50 border-2 border-red-200 rounded-2xl p-4"
                  >
                    <p className="text-sm text-red-600 text-center font-medium">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="bg-green-50 border-2 border-green-200 rounded-2xl p-4"
                  >
                    <p className="text-sm text-green-600 flex items-center justify-center gap-2">
                      <CheckIcon className="w-4 h-4" />
                      {success}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#53AEC6] to-[#007290] text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#53AEC6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRightIcon className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-[#53AEC6]">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-semibold text-[#007290] hover:text-[#53AEC6] transition-colors duration-300 hover:underline"
                >
                  Log in here
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="text-center"
          >
            <p className="text-sm text-[#53AEC6]">
              © 2024 NurtureNest. All rights reserved.
            </p>
            <p className="text-xs text-[#53AEC6]/80 mt-1">
              Donation Mediator Platform
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;