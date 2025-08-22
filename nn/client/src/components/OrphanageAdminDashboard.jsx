import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  GiftIcon,
  CalendarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const OrphanageAdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [orphanage, setOrphanage] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/orphanage-login');
        return;
      }

      const response = await axios.get('http://localhost:5001/api/orphanage-admin/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setAdmin(response.data.admin);
        await fetchOrphanageInfo(token);
        await fetchDashboard(token);
        await fetchBookings(token);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('adminToken');
      navigate('/orphanage-login');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrphanageInfo = async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/api/orphanage-admin/orphanage', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setOrphanage(response.data.orphanage);
      }
    } catch (error) {
      console.error('Error fetching orphanage info:', error);
    }
  };

  const fetchDashboard = async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/api/orphanage-admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setDashboard(response.data.dashboard);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    }
  };

  const fetchBookings = async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/api/bookings/orphanage/' + admin?.orphanageId, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    if (!responseMessage.trim()) {
      alert('Please enter a response message');
      return;
    }

    setResponding(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.patch(
        `http://localhost:5001/api/bookings/${bookingId}/status`,
        { status, message: responseMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // Update local state
        setBookings(bookings.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status, orphanageResponse: response.data.booking.orphanageResponse }
            : booking
        ));
        
        // Refresh dashboard
        await fetchDashboard(token);
        
        // Reset form
        setSelectedBooking(null);
        setResponseMessage('');
        
        alert(`Booking ${status} successfully!`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update booking status');
    } finally {
      setResponding(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <ClockIcon className="w-4 h-4" />;
      case 'accepted': return <CheckCircleIcon className="w-4 h-4" />;
      case 'rejected': return <XCircleIcon className="w-4 h-4" />;
      case 'completed': return <CheckCircleIcon className="w-4 h-4" />;
      case 'cancelled': return <XCircleIcon className="w-4 h-4" />;
      default: return <ExclamationTriangleIcon className="w-4 h-4" />;
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/orphanage-login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#007290] mx-auto mb-4"></div>
          <p className="text-[#007290] text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED]">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#53AEC6] to-[#007290] rounded-full flex items-center justify-center">
                <GiftIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">NurtureNest Admin</h1>
                <p className="text-sm text-gray-600">{orphanage?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {admin?.name}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8">
          <div className="flex space-x-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: ChartBarIcon },
              { id: 'bookings', label: 'Bookings', icon: GiftIcon },
              { id: 'orphanage', label: 'Orphanage Info', icon: MapPinIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#53AEC6] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && dashboard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Pending', count: dashboard.counts.pending, color: 'from-yellow-400 to-yellow-500' },
                { label: 'Accepted', count: dashboard.counts.accepted, color: 'from-green-400 to-green-500' },
                { label: 'Rejected', count: dashboard.counts.rejected, color: 'from-red-400 to-red-500' },
                { label: 'Completed', count: dashboard.counts.completed, color: 'from-blue-400 to-blue-500' }
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.count}</h3>
                  <p className="text-gray-600">{stat.label} Bookings</p>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
              <div className="space-y-3">
                {dashboard.recentBookings.map((booking) => (
                  <div key={booking._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#53AEC6] rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {booking.userId.firstName} {booking.userId.lastName}
                        </p>
                        <p className="text-sm text-gray-600 capitalize">{booking.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="ml-1">{booking.status}</span>
                      </span>
                      <button
                        onClick={() => {
                          setActiveTab('bookings');
                          setSelectedBooking(booking);
                        }}
                        className="text-[#53AEC6] hover:text-[#007290] transition-colors"
                      >
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Donation Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboard.categoryStats.map((stat) => (
                  <div key={stat._id} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 capitalize mb-2">{stat._id}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total:</span>
                        <span className="font-medium">{stat.count}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pending:</span>
                        <span className="text-yellow-600">{stat.pending}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Accepted:</span>
                        <span className="text-green-600">{stat.accepted}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Donation Bookings</h3>
              
              {bookings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <GiftIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>No donation bookings yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-[#53AEC6] rounded-full flex items-center justify-center">
                              <UserIcon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {booking.userId.firstName} {booking.userId.lastName}
                              </h4>
                              <p className="text-sm text-gray-600">{booking.userId.email}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <PhoneIcon className="w-4 h-4" />
                              {booking.userId.phoneNumber}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <CalendarIcon className="w-4 h-4" />
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="mb-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1">{booking.status}</span>
                            </span>
                            <span className="ml-3 text-sm text-gray-600 capitalize">{booking.category}</span>
                          </div>

                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-700 mb-1">Items:</p>
                            <div className="space-y-1">
                              {booking.items.map((item, index) => (
                                <p key={index} className="text-sm text-gray-600">
                                  • {item.name}: {item.quantity} {item.unit}
                                </p>
                              ))}
                            </div>
                          </div>

                          {booking.specialInstructions && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Special Instructions:</p>
                              <p className="text-sm text-gray-600">{booking.specialInstructions}</p>
                            </div>
                          )}
                        </div>

                        <div className="ml-4">
                          {booking.status === 'pending' && (
                            <div className="space-y-2">
                              <button
                                onClick={() => setSelectedBooking(booking)}
                                className="w-full px-4 py-2 bg-[#53AEC6] text-white rounded-lg hover:bg-[#007290] transition-colors"
                              >
                                Respond
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {booking.orphanageResponse && (
                        <div className="border-t border-gray-200 pt-3">
                          <p className="text-sm text-gray-600">
                            <strong>Response:</strong> {booking.orphanageResponse.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Responded by {booking.orphanageResponse.respondedBy} on {new Date(booking.orphanageResponse.respondedAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Orphanage Info Tab */}
        {activeTab === 'orphanage' && orphanage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Orphanage Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Basic Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-600">{orphanage.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-600">
                      {orphanage.address?.street}, {orphanage.address?.city}, {orphanage.address?.state} {orphanage.address?.pincode}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-600">Owner: {orphanage.ownerName}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-600">{orphanage.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-600">WhatsApp: {orphanage.whatsappNumber}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-[#53AEC6]" />
                    <span className="text-gray-600">{orphanage.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-3">Donation Preferences</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Accepted Categories:</p>
                  <div className="flex flex-wrap gap-2">
                    {orphanage.donationPreferences?.acceptedCategories?.map((category) => (
                      <span key={category} className="px-2 py-1 bg-[#53AEC6] text-white text-xs rounded-full capitalize">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Operating Hours:</p>
                  <p className="text-sm text-gray-600">
                    {orphanage.operatingHours?.open} - {orphanage.operatingHours?.close}
                  </p>
                  <p className="text-sm text-gray-600">
                    Days: {orphanage.operatingHours?.days?.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Response Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Respond to Donation Request
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Donor:</strong> {selectedBooking.userId.firstName} {selectedBooking.userId.lastName}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Category:</strong> {selectedBooking.category}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Items:</strong> {selectedBooking.items.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Response Message *
              </label>
              <textarea
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent"
                placeholder="Enter your response message..."
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleStatusUpdate(selectedBooking._id, 'accepted')}
                disabled={responding}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {responding ? 'Accepting...' : 'Accept'}
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedBooking._id, 'rejected')}
                disabled={responding}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {responding ? 'Rejecting...' : 'Reject'}
              </button>
              <button
                onClick={() => {
                  setSelectedBooking(null);
                  setResponseMessage('');
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default OrphanageAdminDashboard;
