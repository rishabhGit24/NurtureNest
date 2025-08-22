import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  GiftIcon,
  MapPinIcon,
  PlusIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const DonationBookingForm = ({ category, onClose }) => {
  const navigate = useNavigate();
  const [orphanages, setOrphanages] = useState([]);
  const [donationItems, setDonationItems] = useState([]);
  const [selectedOrphanage, setSelectedOrphanage] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: '', unit: '' }]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Category display names
  const categoryNames = {
    food: 'Food & Nutrition',
    clothing: 'Clothing & Apparel',
    education: 'Education & Learning',
    medical: 'Medical & Healthcare',
    financial: 'Financial Support',
    hygiene: 'Hygiene & Personal Care'
  };

  // Category-specific item suggestions
  const categorySuggestions = {
    food: ['Rice', 'Dal/Lentils', 'Vegetables', 'Milk', 'Bread', 'Fruits', 'Grains', 'Pulses'],
    clothing: ['T-Shirts', 'Pants/Jeans', 'Shoes', 'Dresses', 'Sweaters', 'Socks', 'Underwear'],
    education: ['Notebooks', 'Pencils', 'Books', 'School Bags', 'Art Supplies', 'Calculators'],
    medical: ['First Aid Kit', 'Bandages', 'Medicines', 'Thermometers', 'Vitamins'],
    financial: ['Cash Donation', 'Bank Transfer', 'Online Payment'],
    hygiene: ['Soap', 'Toothpaste', 'Sanitizer', 'Shampoo', 'Towels', 'Toothbrushes']
  };

  // Default units for different item types
  const defaultUnits = {
    food: ['kg', 'liters', 'packets', 'pieces', 'bags'],
    clothing: ['pieces', 'pairs', 'sets'],
    education: ['pieces', 'sets', 'packs', 'boxes'],
    medical: ['kits', 'pieces', 'packs', 'bottles'],
    financial: ['amount'],
    hygiene: ['pieces', 'bottles', 'tubes', 'bars']
  };

  useEffect(() => {
    fetchOrphanages();
    fetchDonationItems();
  }, []);

  const fetchOrphanages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/orphanage-admin/orphanages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setOrphanages(response.data.orphanages);
      }
    } catch (error) {
      console.error('Error fetching orphanages:', error);
      // For now, use sample data
      setOrphanages([
        {
          _id: '1',
          name: 'VATSALYAPURAM TRUST NGO',
          address: { city: 'Bangalore', state: 'Karnataka' },
          donationPreferences: { acceptedCategories: ['food', 'clothing', 'education', 'medical', 'hygiene'] }
        },
        {
          _id: '2',
          name: 'PREMAANAJALI',
          address: { city: 'Bangalore', state: 'Karnataka' },
          donationPreferences: { acceptedCategories: ['food', 'clothing', 'education', 'medical', 'financial', 'hygiene'] }
        },
        {
          _id: '3',
          name: 'BOSCO Mane',
          address: { city: 'Bangalore', state: 'Karnataka' },
          donationPreferences: { acceptedCategories: ['food', 'clothing', 'education', 'medical', 'financial', 'hygiene'] }
        }
      ]);
    }
  };

  const fetchDonationItems = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5001/api/bookings/items?category=${category}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setDonationItems(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching donation items:', error);
      // Use sample data for now
      setDonationItems(categorySuggestions[category] || []);
    }
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: '', unit: '' }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedOrphanage) {
      setError('Please select an orphanage');
      return;
    }

    if (items.some(item => !item.name || !item.quantity || !item.unit)) {
      setError('Please fill in all item details');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5001/api/bookings', {
        orphanageId: selectedOrphanage,
        category,
        items: items.filter(item => item.name && item.quantity && item.unit),
        specialInstructions,
        preferredDate: preferredDate || undefined
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          navigate('/profile');
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setError(error.response?.data?.error || 'Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your donation booking has been created successfully. The orphanage will be notified and you'll receive updates on the status.
          </p>
          <div className="text-sm text-gray-500">
            Redirecting to profile...
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#53AEC6] to-[#007290] rounded-full flex items-center justify-center">
                <GiftIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Book Donation - {categoryNames[category]}
                </h2>
                <p className="text-gray-600">Request a donation booking with an orphanage</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Orphanage Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Orphanage *
            </label>
            <select
              value={selectedOrphanage}
              onChange={(e) => setSelectedOrphanage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">Choose an orphanage...</option>
              {orphanages
                .filter(orphanage => 
                  orphanage.donationPreferences?.acceptedCategories?.includes(category)
                )
                .map(orphanage => (
                  <option key={orphanage._id} value={orphanage._id}>
                    {orphanage.name} - {orphanage.address?.city}, {orphanage.address?.state}
                  </option>
                ))}
            </select>
          </div>

          {/* Items Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Items *
            </label>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Item name"
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent"
                      list={`items-${index}`}
                      required
                    />
                    <datalist id={`items-${index}`}>
                      {categorySuggestions[category]?.map(suggestion => (
                        <option key={suggestion} value={suggestion} />
                      ))}
                    </datalist>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent"
                      min="1"
                      required
                    />
                  </div>
                  <div className="w-24">
                    <select
                      value={item.unit}
                      onChange={(e) => updateItem(index, 'unit', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent"
                      required
                    >
                      <option value="">Unit</option>
                      {defaultUnits[category]?.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-3 flex items-center gap-2 text-[#53AEC6] hover:text-[#007290] transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add Another Item
            </button>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Instructions (Optional)
            </label>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
              placeholder="Any special notes or instructions for the orphanage..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all duration-200 resize-none"
            />
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Donation Date (Optional)
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#53AEC6] focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#53AEC6] to-[#007290] text-white rounded-lg hover:from-[#007290] hover:to-[#53AEC6] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Booking...
                </div>
              ) : (
                'Create Booking'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default DonationBookingForm;
