import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  ArrowLeftIcon,
  GiftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const DonationCategoryForm = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orphanageId: '',
    items: [],
    specialInstructions: '',
    preferredDate: ''
  });
  const [orphanages, setOrphanages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Category-specific item options
  const categoryItems = {
    food: [
      { name: 'Plate Meals', unit: 'meals', description: 'Ready-to-eat meals' },
      { name: 'Bulk Items', unit: 'kg', description: 'Rice, wheat, pulses' },
      { name: 'Raw Items', unit: 'kg', description: 'Vegetables, fruits' },
      { name: 'Processed Items', unit: 'packets', description: 'Biscuits, snacks' },
      { name: 'Dairy Products', unit: 'liters', description: 'Milk, curd' },
      { name: 'Cooking Oil', unit: 'liters', description: 'Edible oil' }
    ],
    clothing: [
      { name: 'Shirts/Tops', unit: 'pieces', description: 'New or gently used' },
      { name: 'Pants/Shorts', unit: 'pieces', description: 'New or gently used' },
      { name: 'Dresses', unit: 'pieces', description: 'New or gently used' },
      { name: 'Shoes', unit: 'pairs', description: 'New or gently used' },
      { name: 'Winter Wear', unit: 'pieces', description: 'Sweaters, jackets' },
      { name: 'School Uniforms', unit: 'sets', description: 'Complete uniforms' }
    ],
    education: [
      { name: 'Textbooks', unit: 'pieces', description: 'Subject books' },
      { name: 'Notebooks', unit: 'pieces', description: 'Writing notebooks' },
      { name: 'Stationery', unit: 'sets', description: 'Pens, pencils, erasers' },
      { name: 'Art Supplies', unit: 'sets', description: 'Crayons, paint, brushes' },
      { name: 'School Bags', unit: 'pieces', description: 'Backpacks, bags' },
      { name: 'Educational Toys', unit: 'pieces', description: 'Learning games' }
    ],
    medical: [
      { name: 'First Aid Kits', unit: 'kits', description: 'Basic medical supplies' },
      { name: 'Medicines', unit: 'packets', description: 'Prescription medicines' },
      { name: 'Vitamins', unit: 'bottles', description: 'Vitamin supplements' },
      { name: 'Sanitizers', unit: 'bottles', description: 'Hand sanitizers' },
      { name: 'Bandages', unit: 'rolls', description: 'Medical bandages' },
      { name: 'Thermometers', unit: 'pieces', description: 'Digital thermometers' }
    ],
    financial: [
      { name: 'Monetary Donation', unit: 'amount', description: 'Financial contribution' }
    ],
    hygiene: [
      { name: 'Soap', unit: 'bars', description: 'Bathing soap' },
      { name: 'Shampoo', unit: 'bottles', description: 'Hair care' },
      { name: 'Toothpaste', unit: 'tubes', description: 'Dental care' },
      { name: 'Toothbrushes', unit: 'pieces', description: 'Dental care' },
      { name: 'Sanitary Pads', unit: 'packets', description: 'Feminine hygiene' },
      { name: 'Towels', unit: 'pieces', description: 'Bath towels' }
    ]
  };

  const categoryTitles = {
    food: 'Food Donations',
    clothing: 'Clothing Donations',
    education: 'Education Donations',
    medical: 'Medical Donations',
    financial: 'Financial Donations',
    hygiene: 'Hygiene Donations'
  };

  const categoryColors = {
    food: 'from-orange-400 to-red-500',
    clothing: 'from-blue-400 to-purple-500',
    education: 'from-green-400 to-blue-500',
    medical: 'from-red-400 to-pink-500',
    financial: 'from-green-400 to-emerald-500',
    hygiene: 'from-teal-400 to-cyan-500'
  };

  useEffect(() => {
    fetchOrphanages();
  }, []);

  const fetchOrphanages = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const apiBase = process.env.REACT_APP_API_BASE_URL || `http://${window.location.hostname}:5001`;
      const response = await axios.get(`${apiBase}/api/orphanage-admin/orphanages`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setOrphanages(response.data.orphanages);
      }
    } catch (error) {
      console.error('Error fetching orphanages:', error);
      setError('Failed to load orphanages. Please try again later.');
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: '', unit: '', description: '' }]
    });
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Validate form
      if (!formData.orphanageId || formData.items.length === 0) {
        setError('Please select an orphanage and add at least one item');
        setLoading(false);
        return;
      }

      // Validate items
      const validItems = formData.items.filter(item => 
        item.name && item.quantity && item.unit
      );

      if (validItems.length === 0) {
        setError('Please fill in all item details');
        setLoading(false);
        return;
      }

      // Get user details for WhatsApp message
      const apiBase = process.env.REACT_APP_API_BASE_URL || `http://${window.location.hostname}:5001`;
      const userResponse = await axios.get(`${apiBase}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!userResponse.data.success) {
        setError('Failed to get user details');
        setLoading(false);
        return;
      }

      const user = userResponse.data.user;
      const selectedOrphanage = orphanages.find(org => org._id === formData.orphanageId);
      
      if (!selectedOrphanage) {
        setError('Selected orphanage not found');
        setLoading(false);
        return;
      }

      // Create booking in database first to get booking ID
      const bookingData = {
        orphanageId: formData.orphanageId,
        category,
        items: validItems,
        specialInstructions: formData.specialInstructions,
        preferredDate: formData.preferredDate || null
      };

      const response = await axios.post(
        `${apiBase}/api/bookings/whatsapp`,
        bookingData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const booking = response.data.booking;
        
        // Generate WhatsApp message
        const itemsList = validItems.map(item => 
          `• ${item.name}: ${item.quantity} ${item.unit}`
        ).join('\n');
        
        const preferredDateText = formData.preferredDate 
          ? new Date(formData.preferredDate).toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : 'Not specified';

        const whatsappMessage = `🏠 *New Donation Request from NurtureNest*\n\n` +
          `*Donor Details:*\n` +
          `Name: ${user.firstName} ${user.lastName}\n` +
          `Phone: ${user.phoneNumber}\n` +
          `Email: ${user.email}\n\n` +
          `*Donation Details:*\n` +
          `Category: ${category.toUpperCase()}\n` +
          `Items:\n${itemsList}\n\n` +
          `*Preferred Date:* ${preferredDateText}\n\n` +
          `${formData.specialInstructions ? `*Special Instructions:*\n${formData.specialInstructions}\n\n` : ''}` +
          `*Quick Response:*\n` +
          `✅ Accept: http://${window.location.hostname}:5001/api/bookings/response?bookingId=${booking.id}&status=accepted\n` +
          `❌ Decline: http://${window.location.hostname}:5001/api/bookings/response?bookingId=${booking.id}&status=rejected\n\n` +
          `Thank you for supporting our children! 🙏\n\n` +
          `*NurtureNest Team*\n` +
          `📱 +91 7259197398`;

        // Clean phone number for WhatsApp (remove + and spaces)
        const cleanPhoneNumber = selectedOrphanage.whatsappNumber.replace(/[+\s-]/g, '');
        
        // Generate WhatsApp deep link
        const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Show success message and redirect
        setSuccess(true);
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError(error.response?.data?.error || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Sent via WhatsApp!</h2>
          <p className="text-gray-600 mb-4">
            Your donation request has been sent to the orphanage via WhatsApp. They will respond directly to you on WhatsApp, and you can track the status in your profile.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to your profile...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C5E3EA] to-[#ADE2ED]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[#007290] hover:text-[#53AEC6] transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back
          </button>
          
          <div className={`inline-flex items-center gap-3 bg-gradient-to-r ${categoryColors[category]} text-white px-6 py-3 rounded-full shadow-lg mb-4`}>
            <GiftIcon className="w-6 h-6" />
            <h1 className="text-2xl font-bold">{categoryTitles[category]}</h1>
          </div>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Make a difference in children's lives by donating {category} items. 
            Fill out the form below and we'll connect you with the orphanage.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                  <span className="text-red-700">{error}</span>
                </div>
              </div>
            )}

            {/* Orphanage Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Orphanage *
              </label>
              {orphanages.length === 0 && !error ? (
                <div className="text-center py-4 text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#53AEC6] mx-auto mb-2"></div>
                  <p>Loading orphanages...</p>
                </div>
              ) : (
                <select
                  value={formData.orphanageId}
                  onChange={(e) => setFormData({ ...formData, orphanageId: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all"
                  required
                  disabled={orphanages.length === 0}
                >
                  <option value="">Choose an orphanage...</option>
                  {orphanages.map((orphanage) => (
                    <option key={orphanage._id} value={orphanage._id}>
                      {orphanage.name} - {orphanage.address?.city}, {orphanage.address?.state}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Items Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Donation Items *
                </label>
                <button
                  type="button"
                  onClick={addItem}
                  className="px-4 py-2 bg-[#53AEC6] text-white rounded-lg hover:bg-[#007290] transition-colors"
                >
                  + Add Item
                </button>
              </div>

              {formData.items.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <GiftIcon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No items added yet. Click "Add Item" to get started.</p>
                </div>
              )}

              {formData.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Item Name *
                      </label>
                      <select
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent"
                        required
                      >
                        <option value="">Select item...</option>
                        {categoryItems[category]?.map((option) => (
                          <option key={option.name} value={option.name}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent"
                        placeholder="0"
                        min="1"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit *
                      </label>
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent"
                        placeholder="kg, pieces, etc."
                        required
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {item.name && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600">
                        <strong>Description:</strong> {categoryItems[category]?.find(opt => opt.name === item.name)?.description || 'No description available'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Special Instructions */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                value={formData.specialInstructions}
                onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all"
                placeholder="Any special instructions or notes for the orphanage..."
              />
            </div>

            {/* Preferred Date */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Donation Date (Optional)
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-4 bg-gradient-to-r from-[#53AEC6] to-[#007290] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Preparing WhatsApp...' : '📱 Send via WhatsApp'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DonationCategoryForm;
