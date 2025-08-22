import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowLeftIcon,
  GiftIcon
} from '@heroicons/react/24/outline';
import Header from "./Header";
import Footer from "./Footer";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
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
        if (response.data.success) {
          setUser(response.data.user);
          setFormData(response.data.user);
          await fetchBookings();
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5001/api/bookings/my",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5001/api/auth/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setUser(formData);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ADE2ED] border-t-[#53AEC6] rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] flex flex-col">
      <Header />
      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-20 px-4">
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

        {/* Profile Content */}
        <section className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12"
          >
            {/* Profile Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto w-32 h-32 bg-gradient-to-br from-[#53AEC6] to-[#007290] rounded-full flex items-center justify-center mb-6 shadow-2xl"
              >
                <UserIcon className="w-16 h-16 text-white" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
              >
                Profile
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-gray-600 text-lg"
              >
                Manage your account information and preferences
              </motion.p>
            </div>

            {/* Profile Actions */}
            <div className="flex justify-center mb-8">
              {!editMode ? (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setEditMode(true)}
                  className="bg-[#53AEC6] hover:bg-[#007290] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#53AEC6] focus:ring-offset-2 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <PencilIcon className="w-5 h-5" />
                  Edit Profile
                </motion.button>
              ) : (
                <div className="flex gap-4">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleSave}
                    className="bg-[#53AEC6] hover:bg-[#007290] text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#53AEC6] focus:ring-offset-2 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <CheckIcon className="w-5 h-5" />
                    Save Changes
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <XMarkIcon className="w-5 h-5" />
                    Cancel
                  </motion.button>
                </div>
              )}
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your first name"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-[#C5E3EA] rounded-lg">
                    <UserIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-800">{user.firstName || "Not provided"}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your last name"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-[#C5E3EA] rounded-lg">
                    <UserIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-800">{user.lastName || "Not provided"}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-[#C5E3EA] rounded-lg">
                    <EnvelopeIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-800">{user.email || "Not provided"}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                {editMode ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-[#C5E3EA] rounded-lg">
                    <PhoneIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-800">{user.phoneNumber || "Not provided"}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all duration-200"
                    placeholder="Enter your address"
                  />
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-[#C5E3EA] rounded-lg">
                    <MapPinIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-800">{user.address || "Not provided"}</span>
                  </div>
                )}
              </div>
            </div>

            {editMode && (
              <div className="mt-8 p-4 bg-[#C5E3EA] border border-[#53AEC6] rounded-lg">
                <p className="text-[#007290] text-sm">
                  💡 Make sure to save your changes before leaving this page.
                </p>
              </div>
            )}

            {/* Tabs */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setShowBookings(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    !showBookings
                      ? 'bg-white text-[#007290] shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setShowBookings(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                    showBookings
                      ? 'bg-white text-[#007290] shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  My Donations ({bookings.length})
                </button>
              </div>
            </div>

            {/* Bookings Section */}
            {showBookings && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">My Donation Bookings</h3>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <GiftIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No donation bookings yet.</p>
                    <p className="text-gray-500 text-sm">Start donating by visiting our donation categories!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-gray-900 capitalize">
                                {booking.category}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {booking.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Orphanage:</strong> {booking.orphanageId?.name || 'Unknown'}
                            </p>
                            <div className="text-sm text-gray-600">
                              <strong>Items:</strong>
                              {booking.items?.map((item, index) => (
                                <span key={index} className="ml-1">
                                  {item.name} ({item.quantity} {item.unit})
                                  {index < booking.items.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Booked on: {new Date(booking.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;