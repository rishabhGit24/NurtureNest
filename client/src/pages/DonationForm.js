import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  MapPin, 
  Calendar, 
  Package, 
  MessageSquare,
  Truck,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const DonationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    orphanage: '',
    category: location.state?.category || '',
    subcategory: location.state?.subcategory || '',
    quantity: '',
    unit: '',
    description: '',
    deliveryMethod: 'delivery',
    preferredDate: '',
    notes: ''
  });
  
  const [orphanages, setOrphanages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock orphanage data
  useEffect(() => {
    const mockOrphanages = [
      { id: 1, name: "Vatsalyapuram Trust", city: "Mumbai", state: "Maharashtra" },
      { id: 2, name: "Children's Hope Foundation", city: "Delhi", state: "NCR" },
      { id: 3, name: "Little Angels Home", city: "Bangalore", state: "Karnataka" }
    ];
    setOrphanages(mockOrphanages);
  }, []);

  const categories = {
    'Food': ['Plate Meals', 'Bulk Items', 'Raw Items', 'Processed Items'],
    'Clothes': ['Men', 'Women', 'Kids'],
    'Education': ['Stationery', 'Bags', 'Essentials'],
    'Medical': ['Cotton', 'Tapes', 'Scissors', 'Dettol'],
    'Money': ['UPI Donations'],
    'Hygiene': ['Brushing Essentials', 'Soap', 'Skin Care', 'Other Amenities']
  };

  const units = {
    'Food': ['kg', 'pieces', 'packets', 'liters'],
    'Clothes': ['sets', 'pieces', 'pairs'],
    'Education': ['pieces', 'sets', 'boxes'],
    'Medical': ['pieces', 'boxes', 'bottles'],
    'Money': ['rupees'],
    'Hygiene': ['pieces', 'bottles', 'tubes', 'packets']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.orphanage) newErrors.orphanage = 'Please select an orphanage';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.subcategory) newErrors.subcategory = 'Please select a subcategory';
    if (!formData.quantity) newErrors.quantity = 'Please enter quantity';
    if (!formData.unit) newErrors.unit = 'Please select a unit';
    if (!formData.description) newErrors.description = 'Please provide a description';
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred delivery date';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message and redirect
      navigate('/donations', { 
        state: { 
          message: 'Donation request submitted successfully!' 
        } 
      });
    } catch (error) {
      setErrors({
        general: 'Failed to submit donation. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-responsive">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Make a Donation</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container-responsive section-padding">
        <div className="max-w-4xl mx-auto">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline">Choose Category</span>
              </div>
              <div className="w-8 h-1 bg-emerald-600"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="hidden sm:inline">Fill Details</span>
              </div>
              <div className="w-8 h-1 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 text-white rounded-full flex items-center justify-center">
                  <span className="text-xs">3</span>
                </div>
                <span className="hidden sm:inline">Submit</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white">Donation Details</h2>
              <p className="text-emerald-100 mt-1">Help make a difference in children's lives</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 lg:p-8">
              
              {/* General Error */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
                </div>
              )}

              <div className="grid-responsive grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Orphanage Selection */}
                <div className="form-group lg:col-span-2">
                  <label className="form-label">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Select Orphanage
                  </label>
                  <select
                    name="orphanage"
                    value={formData.orphanage}
                    onChange={handleChange}
                    className={`input ${errors.orphanage ? 'input-error' : ''}`}
                  >
                    <option value="">Choose an orphanage...</option>
                    {orphanages.map(orphanage => (
                      <option key={orphanage.id} value={orphanage.id}>
                        {orphanage.name} - {orphanage.city}, {orphanage.state}
                      </option>
                    ))}
                  </select>
                  {errors.orphanage && <p className="form-error">{errors.orphanage}</p>}
                </div>

                {/* Category and Subcategory */}
                <div className="form-group">
                  <label className="form-label">
                    <Package className="w-4 h-4 inline mr-2" />
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`input ${errors.category ? 'input-error' : ''}`}
                  >
                    <option value="">Select category...</option>
                    {Object.keys(categories).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && <p className="form-error">{errors.category}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Package className="w-4 h-4 inline mr-2" />
                    Subcategory
                  </label>
                  <select
                    name="subcategory"
                    value={formData.subcategory}
                    onChange={handleChange}
                    className={`input ${errors.subcategory ? 'input-error' : ''}`}
                    disabled={!formData.category}
                  >
                    <option value="">Select subcategory...</option>
                    {formData.category && categories[formData.category]?.map(subcat => (
                      <option key={subcat} value={subcat}>{subcat}</option>
                    ))}
                  </select>
                  {errors.subcategory && <p className="form-error">{errors.subcategory}</p>}
                </div>

                {/* Quantity and Unit */}
                <div className="form-group">
                  <label className="form-label">
                    <Package className="w-4 h-4 inline mr-2" />
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className={`input ${errors.quantity ? 'input-error' : ''}`}
                    placeholder="Enter quantity"
                    min="1"
                  />
                  {errors.quantity && <p className="form-error">{errors.quantity}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Package className="w-4 h-4 inline mr-2" />
                    Unit
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className={`input ${errors.unit ? 'input-error' : ''}`}
                    disabled={!formData.category}
                  >
                    <option value="">Select unit...</option>
                    {formData.category && units[formData.category]?.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                  {errors.unit && <p className="form-error">{errors.unit}</p>}
                </div>

                {/* Description */}
                <div className="form-group lg:col-span-2">
                  <label className="form-label">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className={`input ${errors.description ? 'input-error' : ''}`}
                    placeholder="Provide detailed description of your donation..."
                  />
                  {errors.description && <p className="form-error">{errors.description}</p>}
                </div>

                {/* Delivery Method and Date */}
                <div className="form-group">
                  <label className="form-label">
                    <Truck className="w-4 h-4 inline mr-2" />
                    Delivery Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="delivery"
                        checked={formData.deliveryMethod === 'delivery'}
                        onChange={handleChange}
                        className="text-emerald-600"
                      />
                      <span className="text-sm">I'll deliver</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="pickup"
                        checked={formData.deliveryMethod === 'pickup'}
                        onChange={handleChange}
                        className="text-emerald-600"
                      />
                      <span className="text-sm">Pickup needed</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Preferred Delivery Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`input ${errors.preferredDate ? 'input-error' : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.preferredDate && <p className="form-error">{errors.preferredDate}</p>}
                </div>

                {/* Notes */}
                <div className="form-group lg:col-span-2">
                  <label className="form-label">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="3"
                    className="input"
                    placeholder="Any special instructions or additional information..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn-secondary btn-lg flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary btn-lg flex-1 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="loading-spinner w-5 h-5"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Heart className="w-5 h-5" />
                      <span>Submit Donation Request</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your donation request will be sent to the selected orphanage</li>
                  <li>• The orphanage will review and respond within 24-48 hours</li>
                  <li>• You'll receive notifications about the status of your request</li>
                  <li>• Once approved, you can proceed with the donation delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
