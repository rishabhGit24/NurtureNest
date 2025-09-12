import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  GiftIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import Header from './Header';
import Footer from './Footer';

const BookingResponsePage = ({ 
  status = 'accepted', 
  booking = null, 
  error = null, 
  donorWhatsAppUrl = null 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getStatusConfig = () => {
    switch (status) {
      case 'accepted':
        return {
          icon: CheckCircleIcon,
          title: 'Donation Accepted!',
          subtitle: 'Great news! The donation has been accepted.',
          bgGradient: 'from-green-50 to-emerald-50',
          iconColor: 'text-green-500',
          buttonColor: 'from-green-500 to-emerald-600',
          borderColor: 'border-green-200',
          emoji: '🎉'
        };
      case 'rejected':
        return {
          icon: XCircleIcon,
          title: 'Donation Declined',
          subtitle: 'The donation was not accepted at this time.',
          bgGradient: 'from-red-50 to-rose-50',
          iconColor: 'text-red-500',
          buttonColor: 'from-red-500 to-rose-600',
          borderColor: 'border-red-200',
          emoji: '😔'
        };
      case 'already_responded':
        return {
          icon: ClockIcon,
          title: 'Already Responded',
          subtitle: 'This booking has already been processed.',
          bgGradient: 'from-yellow-50 to-amber-50',
          iconColor: 'text-yellow-500',
          buttonColor: 'from-yellow-500 to-amber-600',
          borderColor: 'border-yellow-200',
          emoji: '⏰'
        };
      case 'error':
        return {
          icon: ExclamationTriangleIcon,
          title: 'Error Occurred',
          subtitle: 'Something went wrong while processing your response.',
          bgGradient: 'from-red-50 to-rose-50',
          iconColor: 'text-red-500',
          buttonColor: 'from-red-500 to-rose-600',
          borderColor: 'border-red-200',
          emoji: '❌'
        };
      default:
        return {
          icon: ClockIcon,
          title: 'Processing...',
          subtitle: 'Please wait while we process your response.',
          bgGradient: 'from-[#C5E3EA] to-[#ADE2ED]',
          iconColor: 'text-[#53AEC6]',
          buttonColor: 'from-[#53AEC6] to-[#007290]',
          borderColor: 'border-[#53AEC6]',
          emoji: '⏳'
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleNotifyDonor = () => {
    if (donorWhatsAppUrl) {
      window.open(donorWhatsAppUrl, '_blank');
    }
  };

  const handleBackToHome = () => {
    window.location.href = '/home';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgGradient}`}>
      <Header />
      
      <main className="flex-1 pt-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Response Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`bg-white rounded-3xl shadow-2xl border-2 ${config.borderColor} overflow-hidden`}
          >
            {/* Header Section */}
            <div className={`bg-gradient-to-r ${config.buttonColor} px-8 py-6`}>
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-full p-4 mr-4"
                >
                  <StatusIcon className={`w-12 h-12 ${config.iconColor}`} />
                </motion.div>
                <div className="text-white text-center">
                  <h1 className="text-3xl font-bold mb-2">
                    {config.emoji} {config.title}
                  </h1>
                  <p className="text-lg opacity-90">{config.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {error ? (
                /* Error Display */
                <div className="text-center py-8">
                  <p className="text-red-600 text-lg mb-4">{error}</p>
                  <p className="text-gray-600">
                    Please try again or contact support if the problem persists.
                  </p>
                </div>
              ) : booking ? (
                /* Booking Details */
                <>
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] rounded-xl p-4 text-center"
                    >
                      <GiftIcon className="w-8 h-8 text-[#007290] mx-auto mb-2" />
                      <h3 className="font-semibold text-[#007290]">Category</h3>
                      <p className="text-gray-700 capitalize">{booking.category}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] rounded-xl p-4 text-center"
                    >
                      <CalendarIcon className="w-8 h-8 text-[#007290] mx-auto mb-2" />
                      <h3 className="font-semibold text-[#007290]">Booked</h3>
                      <p className="text-gray-700 text-sm">{formatDate(booking.createdAt)}</p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] rounded-xl p-4 text-center"
                    >
                      <StatusIcon className={`w-8 h-8 ${config.iconColor} mx-auto mb-2`} />
                      <h3 className="font-semibold text-[#007290]">Status</h3>
                      <p className={`font-medium capitalize ${
                        status === 'accepted' ? 'text-green-600' : 
                        status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {status.replace('_', ' ')}
                      </p>
                    </motion.div>
                  </div>

                  {/* Donor Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gray-50 rounded-xl p-6 mb-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <GiftIcon className="w-6 h-6 text-[#53AEC6] mr-2" />
                      Donor Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Name</p>
                        <p className="font-medium text-gray-800">
                          {booking.donor?.name || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone</p>
                        <p className="font-medium text-gray-800 flex items-center">
                          <PhoneIcon className="w-4 h-4 text-[#53AEC6] mr-1" />
                          {booking.donor?.phone || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="font-medium text-gray-800 flex items-center">
                          <EnvelopeIcon className="w-4 h-4 text-[#53AEC6] mr-1" />
                          {booking.donor?.email || 'Not provided'}
                        </p>
                      </div>
                      {booking.donation?.preferredDate && (
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Preferred Date</p>
                          <p className="font-medium text-gray-800">
                            {formatDate(booking.donation.preferredDate)}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Donation Items */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-gray-50 rounded-xl p-6 mb-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Donation Items
                    </h3>
                    <div className="space-y-3">
                      {booking.donation?.items?.map((item, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200"
                        >
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-[#53AEC6] rounded-full mr-3"></div>
                            <span className="font-medium text-gray-800">{item.name}</span>
                          </div>
                          <span className="text-[#007290] font-semibold">
                            {item.quantity} {item.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Special Instructions */}
                  {booking.donation?.specialInstructions && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6"
                    >
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        💬 Special Instructions
                      </h3>
                      <p className="text-blue-800">{booking.donation.specialInstructions}</p>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    {donorWhatsAppUrl && (
                      <button
                        onClick={handleNotifyDonor}
                        className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <ChatBubbleLeftRightIcon className="w-6 h-6" />
                        📱 Notify Donor via WhatsApp
                      </button>
                    )}
                    
                    <button
                      onClick={handleBackToHome}
                      className={`flex items-center justify-center gap-3 bg-gradient-to-r ${config.buttonColor} hover:shadow-xl text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      <HomeIcon className="w-6 h-6" />
                      🏠 Back to Home
                    </button>
                  </motion.div>

                  {/* Next Steps */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className={`mt-8 p-6 rounded-xl border-2 ${config.borderColor} ${config.bgGradient}`}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      📋 What's Next?
                    </h3>
                    {status === 'accepted' ? (
                      <div className="space-y-2 text-gray-700">
                        <p>✅ <strong>Donation Accepted!</strong> The donor will contact you to arrange delivery.</p>
                        <p>📞 <strong>Stay Available:</strong> Be ready to coordinate pickup/delivery details.</p>
                        <p>💬 <strong>Use WhatsApp:</strong> Click the "Notify Donor" button to send them an update.</p>
                        <p>🤝 <strong>Thank You:</strong> for supporting our mission to help children in need!</p>
                      </div>
                    ) : status === 'rejected' ? (
                      <div className="space-y-2 text-gray-700">
                        <p>📝 <strong>Response Recorded:</strong> The donor has been notified of your decision.</p>
                        <p>🙏 <strong>Thank You:</strong> for considering this donation request.</p>
                        <p>💡 <strong>Future Donations:</strong> You can always accept future requests that better fit your needs.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-gray-700">
                        <p>📋 <strong>Response Processed:</strong> Your response has been recorded in our system.</p>
                        <p>💬 <strong>Communication:</strong> Use the notification features to stay in touch with donors.</p>
                      </div>
                    )}
                  </motion.div>
                </>
              ) : (
                /* Loading State */
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#53AEC6] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading booking details...</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Additional Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              🌟 Making a Difference Together
            </h3>
            <p className="text-gray-600 mb-4">
              Every donation response helps us connect generous hearts with children in need. 
              Thank you for being part of the NurtureNest community!
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>💝 Donations Facilitated</span>
              <span>🏠 Orphanages Connected</span>
              <span>🤝 Lives Touched</span>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingResponsePage;
