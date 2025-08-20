import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  LockClosedIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  SparklesIcon,
  HeartIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import nnLogo from '../assets/images/NN1.5.jpg';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
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
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-20 h-20 bg-[#53AEC6]/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-20 w-32 h-32 bg-[#ADE2ED]/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-40 left-20 w-16 h-16 bg-[#C5E3EA]/25 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
          className="absolute bottom-20 right-10 w-24 h-24 bg-[#007290]/20 rounded-full blur-xl"
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
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-[#53AEC6]"
            >
              Sign in to your NurtureNest account
            </motion.p>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-[#C5E3EA]/30"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
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

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
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
                    placeholder="Enter your password"
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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-[#53AEC6]">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-[#007290] hover:text-[#53AEC6] transition-colors duration-300 hover:underline"
                >
                  Sign up here
                </Link>
              </p>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-center"
          >
            <p className="text-sm text-[#007290]">
              © 2025 NurtureNest. All rights reserved.
            </p>
            <p className="text-xs text-[#007290]/80 mt-1">
              Donation Mediator Platform
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;